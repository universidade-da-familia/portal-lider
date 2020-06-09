/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 *@NModuleScope SameAccount
 */
define(["N/record"], function(record) {
  /**
   * POST.
   *
   * @param context
   */
  function update(context) {
    try {
      const salesOrder = record.load({
        type: record.Type.SALES_ORDER,
        id: context.order_id,
        isDynamic: true,
      });

      const orderStatus = salesOrder.getValue({
        fieldId: "orderstatus",
      })

      if (orderStatus === "A") {
        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.orderstatus) {
          salesOrder.setValue({
            fieldId: "orderstatus",
            value: context.orderstatus
          })
        }

        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.origstatus) {
          salesOrder.setValue({
            fieldId: "origstatus",
            value: context.origstatus
          })
        }

        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.statusRef) {
          salesOrder.setValue({
            fieldId: "statusRef",
            value: context.statusRef
          })
        }

        if (context.payu_order_status) {
          salesOrder.setValue({
            fieldId: "custbody_rsc_status_payu",
            value: context.payu_order_status
          })
        }
      }

      const salesOrderId = salesOrder.save({
        ignoreMandatoryFields: false,
        enableSourcing: false
      });

      return {
        id: salesOrderId
      };
    } catch (err) {
      return err
    }
  }

  return {
    put: update
  };
});
