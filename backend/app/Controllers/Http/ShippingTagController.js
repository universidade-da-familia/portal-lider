/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event');

/**
 * Resourceful controller for interacting with shippingtags
 */
class ShippingTagController {
  /**
   * Show a list of all shippingtags.
   * GET shippingtags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const data = request.all();

    const events = Object.values(data).map(event => {
      return event.event_id;
    });

    const unique_events = [...new Set(events)];

    const eventsQuery = await Event.query()
      .with('organizators.addresses')
      .whereIn('id', unique_events)
      .orderBy('start_date', 'desc')
      .fetch();

    const allEntities = eventsQuery.toJSON().map(event => {
      return event.organizators[0];
    });

    const unique_entities = allEntities.filter(
      (obj, index, self) => index === self.findIndex(el => el.id === obj.id),
    );

    return unique_entities;
  }
}

module.exports = ShippingTagController;
