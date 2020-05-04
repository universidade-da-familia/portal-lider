const axios = require('axios');

const api = axios.default.create({
  baseURL: 'https://5260046.restlets.api.netsuite.com/app/site/hosting',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'NLAuth nlauth_account=5260046, nlauth_email=dev@udf.org.br, nlauth_signature=Shalom1234,nlauth_role=1077',
  },
});

class UpdateUser {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'UpdateUser-job';
  }

  // This is where the work is done.
  async handle(user) {
    console.log('UpdateUser-job started');

    const {
      id,
      netsuite_id,
      personal_state_id,
      name,
      email,
      cpf_cnpj,
      sex,
      phone,
      alt_phone,
      church,
      cmn_hierarchy_id,
      mu_hierarchy_id,
      crown_hierarchy_id,
      mp_hierarchy_id,
      ffi_hierarchy_id,
      gfi_hierarchy_id,
      pg_hab_hierarchy_id,
      pg_yes_hierarchy_id,
    } = user;

    const fullname = name.split(' ');
    const firstname = fullname[0];
    fullname.shift();
    const lastname = fullname.length >= 1 ? fullname.join(' ') : '';

    const response = await api.put('/restlet.nl?script=182&deploy=1', {
      is_business: false,
      id,
      netsuite_id,
      personal_state_id,
      name,
      firstname,
      lastname,
      email: email || '',
      cpf_cnpj: cpf_cnpj || '',
      sex: sex || '',
      phone: phone || '',
      alt_phone: alt_phone || '',
      church_netsuite_id: church ? church.netsuite_id : '',
      cmn_hierarchy_id,
      mu_hierarchy_id,
      crown_hierarchy_id,
      mp_hierarchy_id,
      ffi_hierarchy_id,
      gfi_hierarchy_id,
      pg_hab_hierarchy_id,
      pg_yes_hierarchy_id,
    });

    console.log(response.data);

    if (response.data.id) {
      console.log('Chamada ao netsuite finalizada com sucesso (UpdateUser).');
    } else {
      console.log('Chamada ao netsuite finalizada com falha (UpdateUser).');
      throw new Error({
        title: 'Falha!',
        message: 'Houve um erro ao editar a entidade no Netsuite.',
      });
    }
  }
}

module.exports = UpdateUser;
