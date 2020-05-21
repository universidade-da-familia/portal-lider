const Entity = use('App/Models/Entity');

const axios = require('axios');

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077',
  },
});

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with leader
 */
class LeaderController {
  /**
   * Display a single leader.
   * GET leader/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const leader = await Entity.findByOrFail('cpf_cnpj', params.cpf);

    await leader.load('file');

    const customizer = await api.get(
      `/restlet.nl?script=121&deploy=1&cpf=${params.cpf}`,
    );

    if (customizer.data.error) {
      return customizer.data;
    }

    return leader;
  }
}

module.exports = LeaderController;
