const OrderTransaction = use('App/Models/OrderTransaction');
const Order = use('App/Models/Order');

const Kue = use('Kue');
const Job = use('App/Jobs/ApproveOrder');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ordertransactions
 */
class OrderTransactionController {
  /**
   * Update ordertransaction details.
   * PUT or PATCH ordertransactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response }) {
    try {
      const data = request.all();

      const transaction = await OrderTransaction.findByOrFail(
        'transaction_id',
        data.transaction_id,
      );
      const order = await Order.findOrFail(transaction.order_id);

      await order.load('status');

      transaction.status = data.response_message_pol || transaction.status;
      transaction.authorization_code =
        data.authorization_code || transaction.authorization_code;

      if (data.franchise) {
        transaction.brand = data.franchise || transaction.brand;
      }

      if (data.response_message_pol === 'APPROVED') {
        transaction.authorized_amount =
          data.value || transaction.authorized_amount;

        if (data.franchise && order.netsuite_id && order.status_id === 1) {
          const orderNetsuite = {
            order_id: order.netsuite_id,
            orderstatus: 'B',
            origstatus: 'B',
            statusRef: 'pendingFulfillment',
            payu_order_status: data.response_message_pol,
          };

          Kue.dispatch(
            Job.key,
            { orderNetsuite },
            {
              attempts: 5,
              priority: 'normal',
            },
          );
        }

        order.status_id = 2 || order.status_id;

        await order.save();
      }

      transaction.installments =
        data.installments_number || transaction.installments;

      await transaction.save();

      console.log(
        `A transação order_id ${transaction.api_order_id} foi atualizada com sucesso para ${data.response_message_pol}`,
      );
      return response.status(200).send({
        title: 'Sucesso!',
        message: `A transação order_id ${transaction.api_order_id} foi atualizada com sucesso para ${data.response_message_pol}`,
      });
    } catch (err) {
      console.log('Houve um erro ao atualizar uma transação');
      console.log(err);
      return response.status(err.status).send({
        title: 'Falha!',
        message: 'Houve um erro ao atualizar os dados da transação',
      });
    }
  }
}

module.exports = OrderTransactionController;
