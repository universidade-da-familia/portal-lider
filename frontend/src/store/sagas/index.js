import { toastr } from 'react-redux-toastr';

import axios from 'axios';
import { push } from 'connected-react-router';
import { addDays, endOfDay } from 'date-fns';
import md5 from 'md5';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';
import {
  Creators as AddressActions,
  Types as AddressTypes,
} from '~/store/ducks/address';
import {
  Creators as AvatarActions,
  Types as AvatarTypes,
} from '~/store/ducks/avatar';
import {
  Creators as BankActions,
  Types as BankTypes,
} from '~/store/ducks/bank';
import {
  Creators as BankAccountActions,
  Types as BankAccountTypes,
} from '~/store/ducks/bankAccount';
import { Creators as CepActions, Types as CepTypes } from '~/store/ducks/cep';
import {
  Creators as CertificateActions,
  Types as CertificateTypes,
} from '~/store/ducks/certificate';
import {
  Creators as CheckoutActions,
  Types as CheckoutTypes,
} from '~/store/ducks/checkout';
import {
  Creators as ChurchActions,
  Types as ChurchTypes,
} from '~/store/ducks/church';
import {
  Creators as CustomizerActions,
  Types as CustomizerTypes,
} from '~/store/ducks/customizer';
import {
  Creators as DefaultEventActions,
  Types as DefaultEventTypes,
} from '~/store/ducks/defaultEvent';
import {
  Creators as EntityActions,
  Types as EntityTypes,
} from '~/store/ducks/entity';
import {
  Creators as EventActions,
  Types as EventTypes,
} from '~/store/ducks/event';
import {
  Creators as ExpiredTitlesActions,
  Types as ExpiredTitlesTypes,
} from '~/store/ducks/expired_titles';
import {
  Creators as ExportExcelActions,
  Types as ExportExcelTypes,
} from '~/store/ducks/exportExcel';
import {
  Creators as InviteActions,
  Types as InviteTypes,
} from '~/store/ducks/invite';
import {
  Creators as LessonActions,
  Types as LessonTypes,
} from '~/store/ducks/lesson';
import {
  Creators as LessonReportActions,
  Types as LessonReportTypes,
} from '~/store/ducks/lessonReport';
import { Creators as LogActions, Types as LogTypes } from '~/store/ducks/log';
import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '~/store/ducks/login';
import {
  Creators as MinisteryActions,
  Types as MinisteryTypes,
} from '~/store/ducks/ministery';
import {
  Creators as OrderActions,
  Types as OrderTypes,
} from '~/store/ducks/order';
import {
  Creators as OrganizationActions,
  Types as OrganizationTypes,
} from '~/store/ducks/organization';
import {
  Creators as OrganizatorActions,
  Types as OrganizatorTypes,
} from '~/store/ducks/organizator';
import {
  Creators as ParticipantActions,
  Types as ParticipantTypes,
} from '~/store/ducks/participant';
import {
  Creators as ProfileActions,
  Types as ProfileTypes,
} from '~/store/ducks/profile';
import {
  Creators as RelationshipActions,
  Types as RelationshipTypes,
} from '~/store/ducks/relationship';
import {
  Creators as ResetPasswordActions,
  Types as ResetPasswordTypes,
} from '~/store/ducks/resetPassword';
import {
  Creators as SearchChurchActions,
  Types as SearchChurchTypes,
} from '~/store/ducks/searchChurch';
import {
  Creators as ShippingActions,
  Types as ShippingTypes,
} from '~/store/ducks/shipping';
import {
  Creators as ShippingTagActions,
  Types as ShippingTagTypes,
} from '~/store/ducks/shippingTag';
import {
  Creators as SignupActions,
  Types as SignupTypes,
} from '~/store/ducks/signup';
import {
  Creators as SiteEventActions,
  Types as SiteEventTypes,
} from '~/store/ducks/siteEvent';

const apiKey = process.env.REACT_APP_PAYU_API_KEY;
const apiLogin = process.env.REACT_APP_PAYU_API_LOGIN;
// const publicKey = process.env.REACT_APP_PAYU_PUBLIC_KEY;
const merchantId = process.env.REACT_APP_PAYU_MERCHANT_ID;
const accountId = process.env.REACT_APP_PAYU_ACCOUNT_ID;

function* signup(action) {
  try {
    const { entity_company, name, email, cpf_cnpj, password } = action.payload;

    if (entity_company === 'pf') {
      yield call(api.post, '/entity', {
        name,
        email,
        cpf: cpf_cnpj,
        password,
      });
    } else {
      yield call(api.post, '/organization', {
        corporate_name: name,
        email,
        cnpj: cpf_cnpj,
        password,
      });
    }

    // yield call(api.post, '/user', {
    //   user_type: entity_company,
    //   name,
    //   email,
    //   cpf_cnpj: cpf_cnpj,
    //   password,
    // });

    yield put(SignupActions.signupSuccess());

    if (entity_company === 'pf') {
      yield put(push('/acesso-pf'));
    } else {
      yield put(push('/acesso-pj'));
    }
    toastr.success('Sucesso!', 'Cadastro realizado com sucesso.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(SignupActions.signupFailure());
    } else {
      toastr.error('Falha!', 'Tente cadastrar novamente.');
      yield put(SignupActions.signupFailure());
    }
  }
}

function* login(action) {
  try {
    const { type, email_cpf_cnpj, password } = action.payload;

    const response = yield call(
      api.post,
      `${type === 'entity' ? '/sessions' : '/organization_sessions'}`,
      {
        email_cpf_cnpj,
        password,
      }
    );

    const { token, user } = response.data;

    if (!response.data.expired) {
      yield put(LoginActions.loginSuccess(response.data));

      localStorage.setItem('@dashboard/token', token.token);
      localStorage.setItem('@dashboard/user', user.id);
      localStorage.setItem('@dashboard/user_type', type);

      yield put(push('/eventos/grupos'));

      if (type === 'entity') {
        toastr.success(
          'Sucesso!',
          `Seja bem-vindo ${user.name.split(' ')[0]}.`
        );
      } else {
        toastr.success(
          'Sucesso!',
          `Seja bem-vindo ${user.corporate_name.split(' ')[0]}.`
        );
      }
    } else {
      yield put(LoginActions.loginFailure(email_cpf_cnpj));

      yield put(push('/senha-expirada'));
      toastr.warning(
        response.data.expired.title,
        response.data.expired.message
      );
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(LoginActions.loginFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(LoginActions.loginFailure());
    }
  }
}

function* resetPassword(action) {
  try {
    const { type, email_cpf_cnpj } = action.payload;

    let response;

    if (process.env.NODE_ENV === 'development' && type === 'entity') {
      response = yield call(api.post, '/forgot_password', {
        email_cpf_cnpj,
        redirect_url: 'http://localhost:3000/resetar-senha-pf',
      });
    } else if (
      process.env.NODE_ENV === 'development' &&
      type === 'organization'
    ) {
      response = yield call(api.post, '/forgot_password_pj', {
        email_cpf_cnpj,
        redirect_url: 'http://localhost:3000/resetar-senha-pj',
      });
    } else if (process.env.NODE_ENV === 'production' && type === 'entity') {
      response = yield call(api.post, '/forgot_password', {
        email_cpf_cnpj,
        redirect_url: 'https://lider.udf.org.br/resetar-senha-pf',
      });
    } else if (
      process.env.NODE_ENV === 'production' &&
      type === 'organization'
    ) {
      response = yield call(api.post, '/forgot_password_pj', {
        email_cpf_cnpj,
        redirect_url: 'https://lider.udf.org.br/resetar-senha-pj',
      });
    }

    const { email } = response.data;

    yield put(ResetPasswordActions.resetPasswordSuccess());

    yield put(push('/'));
    toastr.success('Boa!', `Acesse o email ${email}`);
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ResetPasswordActions.resetPasswordFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ResetPasswordActions.resetPasswordFailure());
    }
  }
}

function* confirmResetPassword(action) {
  try {
    const { type, token, password } = action.payload;

    if (type === 'entity') {
      yield call(api.put, '/forgot_password', {
        token,
        password,
      });
    } else {
      yield call(api.put, '/forgot_password_pj', {
        token,
        password,
      });
    }

    yield put(ResetPasswordActions.confirmResetPasswordSuccess());

    yield put(push('/'));
    toastr.success('Parabéns!', 'A senha foi alterada com sucesso');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ResetPasswordActions.confirmResetPasswordFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ResetPasswordActions.confirmResetPasswordFailure());
    }
  }
}

function* changePassword(action) {
  try {
    const { data } = action.payload;

    const user_id = localStorage.getItem('@dashboard/user');

    if (data.user_type === 'entity') {
      const { entity_id: id } = data;
      delete data.entity_id;

      if (id) {
        yield call(api.put, `/change_password/${id}/${data.user_type}`, data);
      } else {
        yield call(
          api.put,
          `/change_password/${user_id}/${data.user_type}`,
          data
        );
      }
    } else {
      const { organization_id: id } = data;
      delete data.organization_id;

      if (id) {
        yield call(api.put, `/change_password/${id}/${data.user_type}`, data);
      } else {
        yield call(
          api.put,
          `/change_password/${user_id}/${data.user_type}`,
          data
        );
      }
    }

    yield put(ProfileActions.passwordProfileSuccess());
    toastr.confirm('Senha atualizada com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente novamente mais tarde.');
      yield put(ProfileActions.passwordProfileFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ProfileActions.passwordProfileFailure());
    }
  }
}

function* logout() {
  try {
    localStorage.removeItem('@dashboard/token');
    localStorage.removeItem('@dashboard/user');
    localStorage.removeItem('@dashboard/user_type');
    localStorage.removeItem('@dashboard/admin_filter');
    localStorage.removeItem('@dashboard/admin_event_page');
    localStorage.removeItem('@dashboard/admin_filter_entities');
    localStorage.removeItem('@dashboard/admin_entities_page');

    yield put(push('/'));
    toastr.success('Desconectado!', 'Estamos ansiosos para você voltar.');

    yield put(LoginActions.logoutSuccess());
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(LoginActions.logoutFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(LoginActions.logoutFailure());
    }
  }
}

function* profile() {
  try {
    const user_type = localStorage.getItem('@dashboard/user_type');

    const response = yield call(api.get, `/sessions/${user_type}`);

    yield put(ProfileActions.profileSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ProfileActions.profileFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os seus dados.');
      yield put(ProfileActions.profileFailure());
    }
  }
}

function* expiredTitles(action) {
  try {
    const { cpf } = action.payload;

    const response = yield call(api.get, `/expired_titles/${cpf}`);

    yield put(
      ExpiredTitlesActions.expiredTitlesSuccess(response.data.expired_titles)
    );
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ExpiredTitlesActions.expiredTitlesFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os seus dados.');
      yield put(ExpiredTitlesActions.expiredTitlesFailure());
    }
  }
}

function* address(action) {
  try {
    const {
      netsuite_id,
      user_type,
      addressesPost,
      addressesPut,
    } = action.payload;

    yield call(api.post, '/address', {
      netsuite_id,
      user_type,
      addressesPost,
      addressesPut,
    });

    yield put(AddressActions.addressSuccess());
    toastr.success('Sucesso!', 'Seus endereços foram atualizados.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(AddressActions.addressFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao atualizar seus endereços.');
      yield put(AddressActions.addressFailure());
    }
  }
}

function* deleteAddress(action) {
  try {
    const { id, index, netsuite_id } = action.payload;

    yield call(api.delete, `/address/${id}/${index}/${netsuite_id}`);

    yield put(AddressActions.addressSuccess());
    toastr.success('Sucesso!', 'O endereço foi removido.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(AddressActions.addressFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover o endereço.');
      yield put(AddressActions.addressFailure());
    }
  }
}

function* bank() {
  try {
    const response = yield call(api.get, '/banks');

    yield put(BankActions.bankSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(BankActions.bankFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao visualizar os bancos.');
      yield put(BankActions.bankFailure());
    }
  }
}

function* bankAccount(action) {
  try {
    const {
      netsuite_id,
      user_type,
      bankAccountsPost,
      bankAccountsPut,
    } = action.payload;

    yield call(api.post, '/bank_account', {
      netsuite_id,
      user_type,
      bankAccountsPost,
      bankAccountsPut,
    });

    yield put(BankAccountActions.bankAccountSuccess());
    toastr.success('Sucesso!', 'Seus endereços foram atualizados.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(BankAccountActions.bankAccountFailure());
    } else {
      toastr.error(
        'Falha!',
        'Houve um erro ao atualizar suas contas bancárias.'
      );
      yield put(BankAccountActions.bankAccountFailure());
    }
  }
}

function* deleteBankAccount(action) {
  try {
    const { id } = action.payload;

    yield call(api.delete, `/bank_account/${id}`);

    yield put(BankAccountActions.deleteBankAccountSuccess());
    toastr.success('Sucesso!', 'A conta bancária foi removida.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(BankAccountActions.deleteBankAccountFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover a conta bancária.');
      yield put(BankAccountActions.deleteBankAccountFailure());
    }
  }
}

function* editProfile(action) {
  try {
    const { data } = action.payload;
    const { entity_id: id } = data;
    delete data.entity_id;

    const user_type = localStorage.getItem('@dashboard/user_type');
    const user_id = localStorage.getItem('@dashboard/user');

    if (id) {
      yield call(api.put, `/entity/${id}`, data);
    } else {
      yield call(
        api.put,
        `${
          user_type === 'entity'
            ? `/entity/${user_id}`
            : `/organization/${user_id}`
        }`,
        data
      );
    }

    // if (id) {
    //   yield call(api.put, `/user/${id}`, data);
    // } else {
    //   yield call(api.put, `/user/${user_id}`, data);
    // }

    yield put(ProfileActions.editProfileSuccess());
    toastr.confirm('Perfil atualizado com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ProfileActions.editProfileFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(ProfileActions.editProfileFailure());
    }
  }
}

function* churchs(action) {
  try {
    const { uf, city, name } = action.payload.data;

    const response = yield call(api.post, '/organization_params', {
      uf,
      city,
      name,
    });

    yield put(ChurchActions.churchSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente novamente mais tarde.');
      yield put(ChurchActions.churchFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ChurchActions.churchFailure());
    }
  }
}

function* event(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/event/${id}`);

    yield put(EventActions.eventSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EventActions.eventFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os dados do evento.');
      yield put(EventActions.eventFailure());
    }
  }
}

function* allEvents() {
  try {
    const user_id = localStorage.getItem('@dashboard/user');
    const user_type = localStorage.getItem('@dashboard/user_type');

    const response = yield call(
      api.get,
      `/${user_type === 'entity' ? 'entity' : 'organization'}/${user_id}`
    );

    yield put(EventActions.allEventSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EventActions.allEventFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os eventos.');
      yield put(EventActions.allEventFailure());
    }
  }
}

// function* defaultEventSchedule(action) {
//   try {
//     const { id } = action.payload;

//     const response = yield call(api.get, `/default_event_schedules/${id}`);

//     yield put(EventActions.allEventSuccess(response.data));
//   } catch (err) {
//     if (err.message === 'Network Error') {
//       toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
//       yield put(EventActions.allEventFailure());
//     } else {
//       toastr.error('Falha!', 'Houve um erro ao carregar os eventos.');
//       yield put(EventActions.allEventFailure());
//     }
//   }
// }

function* consultEntity(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/entity/${id}`);
    // const response = yield call(api.get, `/user/${id}`);

    yield put(EntityActions.entitySuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EntityActions.entityFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os seus dados.');
      yield put(EntityActions.entityFailure());
    }
  }
}

function* consultEntityCpf(action) {
  try {
    const { cpf, profile_id } = action.payload;

    const response = yield call(api.get, `/entity/cpf/${cpf}/${profile_id}`);
    // const response = yield call(api.get, `/user/cpf/${cpf}/${profile_id}`);

    yield put(EntityActions.entityCpfSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EntityActions.entityCpfFailure(false));
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      if (err.response.data.type === 'not_found') {
        yield put(EntityActions.entityCpfFailure(true));
      } else {
        yield put(EntityActions.entityCpfFailure(false));
      }
    }
  }
}

function* allConsultEntities(action) {
  try {
    let response;
    const { page, filterData } = action.payload;

    if (filterData.entity_type === 'pf') {
      response = yield call(api.post, '/entity_paginate', {
        page,
        filterData,
      });
    } else {
      response = yield call(api.post, '/organization_paginate', {
        page,
        filterData,
      });
    }

    yield put(EntityActions.allConsultEntitiesSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(EntityActions.allConsultEntitiesFailure());
  }
}

function* allConsultEvent(action) {
  try {
    const { page, filterData } = action.payload;

    const response = yield call(api.post, '/event_paginate', {
      page,
      filterData,
    });

    yield put(EventActions.allConsultEventSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(EventActions.allConsultEventFailure());
  }
}

function* exportExcel(action) {
  try {
    const { lastPage, filterData } = action.payload;

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Accept',
    };

    const response = yield call(
      api.post,
      '/event_export_excel',
      {
        withCredentials: true,
        timeout: 1000 * 1000,
        lastPage,
        filterData,
      },
      {
        headers,
      }
    );

    yield put(ExportExcelActions.exportExcelSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ExportExcelActions.exportExcelFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ExportExcelActions.exportExcelFailure());
    }
  }
}

function* entityExportExcel(action) {
  try {
    const { lastPage, filterData } = action.payload;

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Accept',
    };

    const response = yield call(
      api.post,
      '/entity_export_excel',
      {
        withCredentials: true,
        timeout: 1000 * 1000,
        lastPage,
        filterData,
      },
      {
        headers,
      }
    );

    yield put(ExportExcelActions.exportExcelEntitySuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ExportExcelActions.exportExcelEntityFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ExportExcelActions.exportExcelEntityFailure());
    }
  }
}

function* organizationExportExcel(action) {
  try {
    const { lastPage, filterData } = action.payload;

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Accept',
    };

    const response = yield call(
      api.post,
      '/organization_export_excel',
      {
        withCredentials: true,
        timeout: 1000 * 1000,
        lastPage,
        filterData,
      },
      {
        headers,
      }
    );

    yield put(ExportExcelActions.exportExcelOrganizationSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ExportExcelActions.exportExcelOrganizationFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(ExportExcelActions.exportExcelOrganizationFailure());
    }
  }
}

function* allEventForAdminPrint(action) {
  try {
    const { page, filterPrintData } = action.payload;

    const response = yield call(api.post, '/event_for_print_certificate', {
      page,
      filterPrintData,
    });

    yield put(
      EventActions.allConsultEventForPrintCertificateSuccess(response.data)
    );
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(EventActions.allConsultEventForPrintCertificateFailure());
  }
}

function* addInvite(action) {
  try {
    const { event_id, event_type, name, email, is_buyer } = action.payload;

    yield call(api.post, '/invite', {
      event_id,
      event_type,
      name,
      email,
      is_buyer,
    });

    yield put(InviteActions.inviteSuccess());

    toastr.confirm('Convite enviado com sucesso', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(InviteActions.inviteFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao enviar o convite.');
      yield put(InviteActions.inviteFailure());
    }
  }
}

function* confirmInvite(action) {
  try {
    const { data } = action.payload;
    const { invite_id, entity_id, event_id, assistant } = data;

    const response = yield call(api.post, '/event_participant', {
      entity_id,
      event_id,
      assistant,
      order_id: null,
    });

    if (response.data.error) {
      yield put(ParticipantActions.addParticipantFailure());
      yield put(InviteActions.confirmInviteFailure());
      toastr.error(response.data.error.title, response.data.error.message);
    } else {
      yield put(ParticipantActions.addParticipantSuccess());

      yield call(api.delete, `/invite/${invite_id}`);
      yield put(InviteActions.deleteInviteSuccess());

      yield put(InviteActions.confirmInviteSuccess());

      yield put(EventActions.eventSuccess(null));

      yield put(
        push(`/evento/${event_id}/convite/${entity_id}/confirmacao/sucesso`)
      );
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(InviteActions.confirmInviteFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao confirmar o convite.');
      yield put(InviteActions.confirmInviteFailure());
    }
  }
}

function* deleteInvite(action) {
  try {
    const { invite_id } = action.payload;

    yield call(api.delete, `/invite/${invite_id}`);

    yield put(InviteActions.deleteInviteSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(InviteActions.deleteInviteFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover o convite.');
      yield put(InviteActions.deleteInviteFailure());
    }
  }
}

function* confirmParticipantInviteOrder(action) {
  // checkpoint
  try {
    const { data } = action.payload;
    const { user, event_id, assistant, card, shipping_address } = data;

    const endOfCurrentDay = endOfDay(new Date());

    const response = yield call(api.post, '/event_participant', {
      entity_id: user.id,
      event_id,
      assistant,
      order_id: null,
    });

    if (response.data.error) {
      yield put(ParticipantActions.addParticipantFailure());
      yield put(InviteActions.confirmInviteFailure());
      toastr.error(response.data.error.title, response.data.error.message);
    } else {
      yield put(ParticipantActions.addParticipantSuccess());

      const formattedPhone = data.shipping_address.phone
        .replace('(', '')
        .replace(')', '')
        .replace('-', '');

      const user_type = data.invite
        ? 'entity'
        : localStorage.getItem('@dashboard/user_type');

      const response_user = yield call(
        api.put,
        `${
          user_type === 'entity'
            ? `/entity/${user.id}`
            : `/organization/${user.id}`
        }`,
        { phone: formattedPhone }
      );

      const referenceCode = `udf_user_${user.id}_code_${(
        Math.random() * 100
      ).toString(32)}`;

      const signature = `${apiKey}~${merchantId}~${referenceCode}~${data.order_details.amount}~BRL`;
      const signatureHash = md5(signature);

      if (response_user.data.id) {
        delete data.shipping_address.phone;

        if (card === null) {
          data.payu = {
            language: 'pt',
            command: 'SUBMIT_TRANSACTION',
            merchant: {
              apiKey,
              apiLogin,
            },
            transaction: {
              order: {
                accountId,
                referenceCode,
                description: 'Solicitação de material - boleto',
                language: 'pt',
                signature: signatureHash,
                notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
                additionalValues: {
                  TX_VALUE: {
                    value: data.order_details.amount,
                    currency: 'BRL',
                  },
                },
                buyer: {
                  fullName: user.name,
                  emailAddress: user.email,
                  dniNumber: user.cpf,
                  cnpj: user.cpf,
                  shippingAddress: {
                    street1: shipping_address.street,
                    street2: shipping_address.street_number,
                    city: shipping_address.city,
                    state: shipping_address.uf,
                    country: 'BR',
                    postalCode: shipping_address.cep,
                  },
                },
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: user.phone,
                },
              },
              payer: {
                merchantPayerId: user.id.toString(),
                fullName: user.name,
                emailAddress: user.email,
                contactPhone: user.phone,
                dniNumber: user.cpf,
                cnpj: user.cpf,
                billingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: user.phone,
                },
              },
              type: 'AUTHORIZATION_AND_CAPTURE',
              paymentMethod: 'BOLETO_BANCARIO',
              paymentCountry: 'BR',
              expirationDate: addDays(endOfCurrentDay, 3),
              ipAddress: '127.0.0.1',
            },
            test: false,
          };
        } else {
          const formattedCardNumber = card.number.replace(/ /g, '');
          const [month, year] = card.expiry.split('/');
          const formattedCardExpiry = `20${year}/${month}`;

          data.payu = {
            language: 'pt',
            command: 'SUBMIT_TRANSACTION',
            merchant: {
              apiKey,
              apiLogin,
            },
            transaction: {
              order: {
                accountId,
                referenceCode,
                description: 'Solicitação de material - cartão',
                language: 'pt',
                signature: signatureHash,
                notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
                additionalValues: {
                  TX_VALUE: {
                    value: data.order_details.amount,
                    currency: 'BRL',
                  },
                },
                buyer: {
                  merchantBuyerId: user.id.toString(),
                  fullName: user.name,
                  emailAddress: user.email,
                  contactPhone: user.phone,
                  dniNumber: user.cpf,
                  cnpj: user.cpf,
                  shippingAddress: {
                    street1: shipping_address.street,
                    street2: shipping_address.street_number,
                    city: shipping_address.city,
                    state: shipping_address.uf,
                    country: 'BR',
                    postalCode: shipping_address.cep,
                    phone: user.phone,
                  },
                },
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: user.phone,
                },
              },
              payer: {
                merchantPayerId: user.id.toString(),
                fullName: user.name,
                emailAddress: user.email,
                contactPhone: user.phone,
                dniNumber: user.cpf,
                cnpj: user.cpf,
                billingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: user.phone,
                },
              },
              creditCard: {
                number: formattedCardNumber,
                securityCode: card.cvc,
                expirationDate: formattedCardExpiry,
                name: card.name_card,
              },
              extraParameters: {
                INSTALLMENTS_NUMBER: data.order_details.installments,
              },
              type: 'AUTHORIZATION_AND_CAPTURE',
              paymentMethod: card.issuer,
              paymentCountry: 'BR',
              ipAddress: '127.0.0.1',
            },
            test: false,
          };
        }
      }

      const toSendOrder = {
        user,
        card,
        products: data.products,
        shipping_address,
        shipping_option: data.shipping_option,
        order_details: data.order_details,
        payu: data.payu,
        invite: true,
      };

      const response_order = yield call(api.post, '/order', toSendOrder);
      yield put(OrderActions.addOrderSuccess());

      if (response_order.data.id) {
        if (response_order.data.transaction.boleto_url) {
          window.open(response_order.data.transaction.boleto_url);
        }

        toastr.success('Sucesso!', 'Solicitação criada com sucesso.');

        yield call(api.delete, `/invite/${data.invite_id}`);
        yield put(InviteActions.deleteInviteSuccess());

        yield call(api.put, `/event_participant/${response.data.id}`, {
          order_id: response_order.data.id,
        });

        yield put(EventActions.eventSuccess(null));

        yield put(
          push(
            `/evento/${data.event_id}/convite/${user.id}/confirmacao/sucesso`
          )
        );
      } else {
        yield call(
          api.delete,
          `/event_participant/${user.id}/${response.data.id}`
        );

        yield put(OrderActions.addOrderFailure());
      }
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(InviteActions.confirmInviteFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao confirmar o convite.');
      yield put(InviteActions.confirmInviteFailure());
    }
  }
}

function* createByInviteParticipant(action) {
  try {
    const {
      invite_id,
      name,
      cpf,
      email,
      sex,
      password,
      event_id,
    } = action.payload;

    const response = yield call(api.post, '/entity', {
      name,
      cpf,
      email,
      sex,
      password,
    });

    const entity_id = response.data.id;
    yield put(ParticipantActions.createParticipantSuccess(response.data));

    yield call(api.post, '/event_participant', {
      entity_id,
      event_id,
      assistant: false,
      order_id: null,
    });

    yield put(ParticipantActions.addParticipantSuccess());

    yield call(api.delete, `/invite/${invite_id}`);
    yield put(InviteActions.deleteInviteSuccess());

    yield put(EventActions.eventSuccess(null));

    yield put(
      push(`/evento/${event_id}/convite/${entity_id}/confirmacao/sucesso`)
    );
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.createParticipantFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(ParticipantActions.createParticipantFailure());
    }
  }
}

function* createByInviteOrderParticipant(action) {
  try {
    // checkpoint
    const { data } = action.payload;
    const { user, shipping_address, card } = data;

    const endOfCurrentDay = endOfDay(new Date());

    const response = yield call(api.post, '/entity', {
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      sex: user.sex,
      phone: user.phone,
      password: user.password,
      invite: true,
    });

    const created_user = response.data;

    yield put(ParticipantActions.createParticipantSuccess(response.data));

    const referenceCode = `udf_user_${created_user.id}_code_${(
      Math.random() * 100
    ).toString(32)}`;

    const signature = `${apiKey}~${merchantId}~${referenceCode}~${data.order_details.amount}~BRL`;
    const signatureHash = md5(signature);

    // criacao pedido
    if (response.data.id) {
      if (card === null) {
        data.payu = {
          language: 'pt',
          command: 'SUBMIT_TRANSACTION',
          merchant: {
            apiKey,
            apiLogin,
          },
          transaction: {
            order: {
              accountId,
              referenceCode,
              description: 'Solicitação de material - boleto',
              language: 'pt',
              signature: signatureHash,
              notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
              additionalValues: {
                TX_VALUE: {
                  value: data.order_details.amount,
                  currency: 'BRL',
                },
              },
              buyer: {
                fullName: created_user.name,
                emailAddress: created_user.email,
                dniNumber: created_user.cpf,
                cnpj: created_user.cpf,
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                },
              },
              shippingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: created_user.phone,
              },
            },
            payer: {
              merchantPayerId: created_user.id.toString(),
              fullName: created_user.name,
              emailAddress: created_user.email,
              contactPhone: created_user.phone,
              dniNumber: created_user.cpf,
              cnpj: created_user.cpf,
              billingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: created_user.phone,
              },
            },
            type: 'AUTHORIZATION_AND_CAPTURE',
            paymentMethod: 'BOLETO_BANCARIO',
            paymentCountry: 'BR',
            expirationDate: addDays(endOfCurrentDay, 3),
            ipAddress: '127.0.0.1',
          },
          test: false,
        };
      } else {
        const formattedCardNumber = card.number.replace(/ /g, '');
        const [month, year] = card.expiry.split('/');
        const formattedCardExpiry = `20${year}/${month}`;

        data.payu = {
          language: 'pt',
          command: 'SUBMIT_TRANSACTION',
          merchant: {
            apiKey,
            apiLogin,
          },
          transaction: {
            order: {
              accountId,
              referenceCode,
              description: 'Solicitação de material - cartão',
              language: 'pt',
              signature: signatureHash,
              notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
              additionalValues: {
                TX_VALUE: {
                  value: data.order_details.amount,
                  currency: 'BRL',
                },
              },
              buyer: {
                merchantBuyerId: created_user.id.toString(),
                fullName: created_user.name,
                emailAddress: created_user.email,
                contactPhone: created_user.phone,
                dniNumber: created_user.cpf,
                cnpj: created_user.cpf,
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: created_user.phone,
                },
              },
              shippingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: created_user.phone,
              },
            },
            payer: {
              merchantPayerId: created_user.id.toString(),
              fullName: created_user.name,
              emailAddress: created_user.email,
              contactPhone: created_user.phone,
              dniNumber: created_user.cpf,
              cnpj: created_user.cpf,
              billingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: created_user.phone,
              },
            },
            creditCard: {
              number: formattedCardNumber,
              securityCode: card.cvc,
              expirationDate: formattedCardExpiry,
              name: card.name_card,
            },
            extraParameters: {
              INSTALLMENTS_NUMBER: data.order_details.installments,
            },
            type: 'AUTHORIZATION_AND_CAPTURE',
            paymentMethod: card.issuer,
            paymentCountry: 'BR',
            ipAddress: '127.0.0.1',
          },
          test: false,
        };
      }

      const toSendOrder = {
        user: created_user,
        card,
        products: data.products,
        shipping_address,
        shipping_option: data.shipping_option,
        order_details: data.order_details,
        payu: data.payu,
        invite: true,
      };

      const response_order = yield call(api.post, '/order', toSendOrder);
      yield put(OrderActions.addOrderSuccess());

      if (response_order.data.id) {
        yield call(api.post, '/event_participant', {
          entity_id: created_user.id,
          event_id: data.event_id,
          assistant: false,
          order_id: response_order.data.id,
        });

        yield put(ParticipantActions.addParticipantSuccess());

        yield call(api.delete, `/invite/${data.invite_id}`);
        yield put(InviteActions.deleteInviteSuccess());

        yield put(EventActions.eventSuccess(null));

        yield put(
          push(
            `/evento/${data.event_id}/convite/${created_user.id}/confirmacao/sucesso`
          )
        );
      }

      if (response_order.data.transaction.boleto_url) {
        window.open(response_order.data.transaction.boleto_url);
      }

      toastr.success('Sucesso!', 'Solicitação criada com sucesso.');
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.createParticipantFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(ParticipantActions.createParticipantFailure());
    }
  }
}

function* addEvent(action) {
  try {
    const { data } = action.payload;
    const { organizator_id } = data;

    delete data.organizator_id;

    if (data.paymentPlans) {
      const { paymentPlans } = data;
      delete data.paymentPlans;

      const response = yield call(api.post, '/event', data);
      yield put(EventActions.addEventSuccess());

      yield call(api.post, '/event_organizator', {
        event_id: response.data.id,
        entity_id: organizator_id,
      });
      yield put(OrganizatorActions.addOrganizatorSuccess());

      paymentPlans.forEach(paymentPlan => {
        paymentPlan.event_id = response.data.id;
      });

      yield call(api.post, '/payment_plan', {
        payment_plans: paymentPlans,
      });

      yield put(push('/eventos/treinamentos'));
      toastr.success('Sucesso!', 'O treinamento foi criado.');
    } else {
      const response = yield call(api.post, '/event', data);
      yield put(EventActions.addEventSuccess());

      yield call(api.post, '/event_organizator', {
        event_id: response.data.id,
        entity_id: organizator_id,
      });
      yield put(OrganizatorActions.addOrganizatorSuccess());
      yield put(push('/eventos/grupos'));
      toastr.success('Sucesso!', 'O grupo foi criado.');
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EventActions.addEventFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao criar o evento.');
      yield put(EventActions.addEventFailure());
    }
  }
}

function* editEvent(action) {
  try {
    const { id, eventData } = action.payload;

    yield call(api.put, `/event/${id}`, eventData);

    yield put(EventActions.eventEditSuccess());

    toastr.confirm('Evento atualizado com sucesso', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    toastr.error('Falha!', 'Erro ao atualizar o evento.');
    yield put(EventActions.eventEditFailure());
  }
}

function* deleteEvent(action) {
  try {
    const { event_id } = action.payload;

    yield call(api.delete, `/event/${event_id}`);

    yield put(EventActions.deleteEventSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(EventActions.deleteEventFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover o evento.');
      yield put(EventActions.deleteEventFailure());
    }
  }
}

function* addOrganizator(action) {
  try {
    const { event_id, entity_id } = action.payload;

    yield call(api.post, '/event_organizator', { event_id, entity_id });

    yield put(OrganizatorActions.addOrganizatorSuccess());

    toastr.confirm('Líder adicionado com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrganizatorActions.addOrganizatorFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(OrganizatorActions.addOrganizatorFailure());
    }
  }
}

function* deleteOrganizator(action) {
  try {
    const { event_id, entity_id } = action.payload;

    yield call(api.delete, `/event_organizator/${entity_id}/event/${event_id}`);

    yield put(OrganizatorActions.deleteOrganizatorSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrganizatorActions.deleteOrganizatorFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover o organizador.');
      yield put(OrganizatorActions.deleteOrganizatorFailure());
    }
  }
}

function* changeOrganizator(action) {
  try {
    const { organizator_id, event_id, entity_id, is_same } = action.payload;

    yield call(api.post, '/event_organizator', { event_id, entity_id });
    yield put(OrganizatorActions.addOrganizatorSuccess());

    yield call(
      api.delete,
      `/event_organizator/${organizator_id}/event/${event_id}`
    );
    yield put(OrganizatorActions.deleteOrganizatorSuccess());

    yield put(OrganizatorActions.changeOrganizatorSuccess());

    toastr.confirm('Líder alterado com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });

    if (is_same) {
      yield put(push('/eventos/grupos'));
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrganizatorActions.changeOrganizatorFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(OrganizatorActions.changeOrganizatorFailure());
    }
  }
}

function* searchOrganizator(action) {
  try {
    const { organizator_type, cpf_email, default_event_id } = action.payload;

    const response = yield call(
      api.get,
      `/event_organizator/${organizator_type}/${cpf_email}/${default_event_id}`
    );

    yield put(OrganizatorActions.searchOrganizatorSuccess(response.data));

    if (response.data.error) {
      yield put(OrganizatorActions.searchOrganizatorFailure(response.data));
      toastr.warning(response.data.error.title, response.data.error.message);
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrganizatorActions.searchOrganizatorFailure());
    } else {
      toastr.error(
        err.response.data.error.title,
        err.response.data.error.message
      );
      yield put(OrganizatorActions.searchOrganizatorFailure(err.response.data));
    }
  }
}

function* createParticipant(action) {
  try {
    const {
      name,
      cpf,
      email,
      sex,
      password,
      event_id,
      assistant = false,
    } = action.payload;

    const response = yield call(api.post, '/entity', {
      name,
      cpf,
      email,
      sex,
      password,
    });

    // const response = yield call(api.post, '/user', {
    //   name,
    //   cpf_cnpj,
    //   email,
    //   sex,
    //   password,
    // });

    if (response.data.id) {
      const entity_id = response.data.id;
      yield put(ParticipantActions.createParticipantSuccess());

      yield call(api.post, '/event_participant', {
        entity_id,
        event_id,
        assistant,
        order_id: null,
      });

      yield put(ParticipantActions.addParticipantSuccess());

      toastr.confirm(
        `${
          assistant ? 'Líder em treinamento' : 'Participante'
        } cadastrado e adicionado no curso com sucesso.`,
        {
          onOk: () => window.location.reload(),
          disableCancel: true,
        }
      );
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.createParticipantFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(ParticipantActions.createParticipantFailure());
    }
  }
}

function* setQuitterParticipant(action) {
  try {
    const { participant_id, is_quitter, assistant } = action.payload;

    yield call(api.put, `/event_participant/${participant_id}`, {
      is_quitter,
      assistant,
    });

    yield put(ParticipantActions.setQuitterParticipantSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.setQuitterParticipantFailure());
    } else {
      toastr.error(
        'Falha!',
        'Houve um erro ao tornar o participante desistente.'
      );
      yield put(ParticipantActions.setQuitterParticipantFailure());
    }
  }
}

function* editEventParticipant(action) {
  try {
    const {
      organizators_id,
      participants_id,
      event_id,
      reload = true,
    } = action.payload;

    yield call(api.put, `/participant_print_date`, {
      participants_id,
      event_id,
    });

    yield call(api.put, `/organizator_print_date`, {
      organizators_id,
      event_id,
    });

    yield put(ParticipantActions.editPrintDateSuccess());

    if (reload) {
      window.location.reload();
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.editPrintDateFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao alterar a data');
      yield put(ParticipantActions.editPrintDateFailure());
    }
  }
}

function* addParticipant(action) {
  try {
    const { entity_id, event_id, assistant } = action.payload;

    const response = yield call(api.post, '/event_participant', {
      entity_id,
      event_id,
      assistant,
      order_id: null,
    });

    if (response.data.error) {
      yield put(ParticipantActions.addParticipantFailure());
      toastr.warning(response.data.error.title, response.data.error.message);
    } else {
      yield put(ParticipantActions.addParticipantSuccess());

      if (assistant === true) {
        toastr.confirm('Líder em treinamento adicionado com sucesso.', {
          onOk: () => window.location.reload(),
          disableCancel: true,
        });
      } else {
        toastr.confirm('Participante adicionado com sucesso.', {
          onOk: () => window.location.reload(),
          disableCancel: true,
        });
      }
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.addParticipantFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao adicionar o participante.');
      yield put(ParticipantActions.addParticipantFailure());
    }
  }
}

function* editParticipant(action) {
  try {
    const { data } = action.payload;

    const { id } = data;
    delete data.id;

    yield call(api.put, `entity/${id}`, data);

    yield put(ParticipantActions.editParticipantSuccess());
    toastr.confirm('Participante alterado com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.editParticipantFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao editar o participante.');
      yield put(ParticipantActions.editParticipantFailure());
    }
  }
}

function* deleteParticipant(action) {
  try {
    const { entity_id, participant_id } = action.payload;

    yield call(api.delete, `/event_participant/${entity_id}/${participant_id}`);

    yield put(ParticipantActions.deleteParticipantSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.deleteParticipantFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover o participante.');
      yield put(ParticipantActions.deleteParticipantFailure());
    }
  }
}

function* searchParticipant(action) {
  try {
    const { cpf_email, default_event_id } = action.payload;

    const response = yield call(
      api.get,
      `/event_participant/${cpf_email}/${default_event_id}`
    );

    yield put(ParticipantActions.searchParticipantSuccess(response.data));

    if (response.data.error) {
      yield put(ParticipantActions.searchParticipantFailure(response.data));
      toastr.warning(response.data.error.title, response.data.error.message);
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.searchParticipantFailure());
    } else {
      toastr.error(
        err.response.data.error.title,
        err.response.data.error.message
      );
      yield put(ParticipantActions.searchParticipantFailure(err.response.data));
    }
  }
}

function* searchParticipantByEmail(action) {
  try {
    const { email, current_email } = action.payload;

    const response = yield call(
      api.get,
      `/entity/email/${email}/${current_email}`
    );

    if (!response.data) {
      toastr.warning('Aviso!', 'Esse email já existe');
    }

    yield put(
      ParticipantActions.searchParticipantByEmailSuccess(response.data)
    );
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.searchParticipantByEmailFailure(false));
    } else {
      yield put(ParticipantActions.searchParticipantByEmailFailure(false));
    }
  }
}

function* changeParticipantToLeader(action) {
  try {
    const { participant_id, entity_id, event_id } = action.payload;

    yield call(api.delete, `/event_participant/${entity_id}/${participant_id}`);

    yield put(ParticipantActions.deleteParticipantSuccess());

    yield call(api.post, '/event_organizator', { event_id, entity_id });

    yield put(OrganizatorActions.addOrganizatorSuccess());

    window.location.reload();
    // toastr.confirm('Líder adicionado com sucesso.', {
    //   onOk: () => window.location.reload(),
    //   disableCancel: true,
    // });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.changeParticipantLeaderFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao alterar o participante.');
      yield put(ParticipantActions.changeParticipantLeaderFailure());
    }
  }
}

function* searchChurch(action) {
  try {
    const { church_uf, church_city, church_name } = action.payload;

    const response = yield call(
      api.get,
      `/churchs/${church_uf}/${church_city}/${church_name}`
    );

    if (response.data.error) {
      toastr.error(response.data.error.title, response.data.error.message);
    }

    yield put(SearchChurchActions.searchChurchSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(SearchChurchActions.searchChurchFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao buscar uma organização.');
      yield put(SearchChurchActions.searchChurchFailure());
    }
  }
}

function* shippingOptions(action) {
  try {
    const { cep, products } = action.payload;

    const headers = {
      'Content-Type': 'application/json',
      'api-key':
        '1273704cf48278e8e198c13059267033a16a636c878dc8f6b21f069d9e3aa97d',
    };

    const response = yield call(
      axios.post,
      'https://api.intelipost.com.br/api/v1/quote_by_product',
      {
        origin_zip_code: '17580000',
        destination_zip_code: cep,
        products,
      },
      {
        headers,
      }
    );

    if (response.data.status === 'ERROR') {
      yield put(ShippingActions.shippingOptionsFailure());
      toastr.warning('Aviso!', 'Erro na cotação');
    } else {
      yield put(
        ShippingActions.shippingOptionsSuccess(
          response.data.content.delivery_options
        )
      );
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ShippingActions.shippingOptionsFailure());
    } else {
      // eslint-disable-next-line array-callback-return
      err.response.data.messages.map(message => {
        toastr.error('Falha na cotação!', message.text);
      });
      yield put(ShippingActions.shippingOptionsFailure());
    }
  }
}

function* cep(action) {
  try {
    const { cep, index } = action.payload;

    const response = yield call(
      axios.get,
      `https://viacep.com.br/ws/${cep}/json/`
    );

    response.data.index = index;

    if (response.data.erro) {
      yield put(CepActions.cepFailure());
      toastr.warning('Aviso!', 'CEP não encontrado.');
    } else {
      yield put(CepActions.cepSuccess(response.data));
      toastr.success('Sucesso!', 'CEP encontrado.');
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(CepActions.cepFailure());
    } else {
      toastr.error('Falha!', 'CEP inválido.');
      yield put(CepActions.cepFailure());
    }
  }
}

// function* certificate(action) {
//   try {
//     const { data } = action.payload;

//     yield put(CertificateActions.certificateSuccess(data));

//     yield put(push(`/eventos/grupo/${data.event_id}/certificados`));
//   } catch (err) {
//     if (err.message === 'Network Error') {
//       toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
//       yield put(CertificateActions.certificateFailure());
//     } else {
//       toastr.error('Falha!', 'Tente novamente');
//       yield put(CertificateActions.certificateFailure());
//     }
//   }
// }

function* checkoutLogin(action) {
  try {
    const { email_cpf_cnpj, password, event_id, invite_id } = action.payload;

    const response = yield call(api.post, '/sessions', {
      email_cpf_cnpj,
      password,
    });

    const { user } = response.data;

    if (!response.data.error) {
      yield put(CheckoutActions.checkoutLoginSuccess(response.data));

      localStorage.setItem('@dashboard/checkout_token', response.data.token);
      localStorage.setItem('@dashboard/checkout_user', response.data.user.id);

      if (
        !!user.cep &&
        !!user.uf &&
        !!user.city &&
        !!user.street &&
        !!user.street_number &&
        !!user.neighborhood
      ) {
        if (invite_id) {
          yield put(
            push(`/evento/${event_id}/checkout/pagamento/convite/${invite_id}`)
          );
        } else {
          yield put(push(`/evento/${event_id}/checkout/pagamento`));
        }
      } else if (invite_id) {
        yield put(
          push(`/evento/${event_id}/checkout/endereco/convite/${invite_id}`)
        );
      } else {
        yield put(push(`/evento/${event_id}/checkout/endereco`));
      }
    } else {
      yield put(CheckoutActions.checkoutLoginFailure());

      yield put(push('/senha-expirada'));
      toastr.warning(response.data.error.title, response.data.error.message);
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(CheckoutActions.checkoutLoginFailure());
    } else {
      toastr.error(
        err.response.data.error.title,
        err.response.data.error.message
      );
      yield put(CheckoutActions.checkoutLoginFailure());
    }
  }
}

function* checkoutSignup(action) {
  try {
    const { firstname, lastname, email, cpf_cnpj, password } = action.payload;

    yield call(api.post, '/users', {
      firstname,
      lastname,
      email,
      cpf_cnpj,
      password,
    });

    yield put(CheckoutActions.checkoutSignupSuccess());

    yield put(push('/'));
    toastr.success('Sucesso!', 'Cadastro realizado com sucesso.');
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(CheckoutActions.checkoutSignupFailure());
    } else {
      toastr.error('Falha!', 'Tente cadastrar novamente.');
      yield put(CheckoutActions.checkoutSignupFailure());
    }
  }
}

// function* checkoutPayment(action) {}

function* lessonReport(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/lesson_report/${id}`);

    yield put(LessonReportActions.lessonReportSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(LessonReportActions.lessonReportFailure());
    } else {
      toastr.error('Falha!', 'Tente novamente');
      yield put(LessonReportActions.lessonReportFailure());
    }
  }
}

function* lessonReportEdit(action) {
  try {
    const { eventId, data } = action.payload;

    const response = yield call(
      api.put,
      `/lesson_report/${data.lesson_report_id}`,
      data
    );

    yield put(LessonReportActions.editLessonReportSuccess(response.data));

    toastr.confirm('Relatório confirmado.', {
      onOk: yield put(push(`/eventos/grupo/${eventId}/editar`)),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(LessonReportActions.editLessonReportFailure());
    } else {
      toastr.error('Falha!', 'Tente novamente');
      yield put(LessonReportActions.editLessonReportFailure());
    }
  }
}

function* siteEvent(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/site_event/${id}`);

    yield put(SiteEventActions.siteEventSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(SiteEventActions.siteEventFailure());
    } else {
      toastr.error('Falha!', 'Tente novamente');
      yield put(SiteEventActions.siteEventFailure());
    }
  }
}

function* organizatorEvent(action) {
  try {
    let response;
    const { data } = action.payload;
    const user_type = localStorage.getItem('@dashboard/user_type');

    if (user_type === 'entity') {
      response = yield call(api.post, '/organizator_events', data);
    } else {
      response = yield call(api.get, '/default_events');
    }

    yield put(DefaultEventActions.organizatorEventSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(DefaultEventActions.organizatorEventFailure());
    } else {
      toastr.error('Falha!', 'Tente novamente');
      yield put(DefaultEventActions.organizatorEventFailure());
    }
  }
}

function* allDefaultEvent() {
  try {
    const response = yield call(api.get, '/default_event');

    yield put(DefaultEventActions.allDefaultEventSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(DefaultEventActions.allDefaultEventFailure());
  }
}

function* order(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/order/${id}`);

    yield put(OrderActions.orderSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrderActions.orderFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao carregar os dados do pedido.');
      yield put(OrderActions.orderFailure());
    }
  }
}

// function* allOrders(action) {}

function* addOrder(action) {
  // checkpoint
  try {
    const { data } = action.payload;
    const { user, shipping_address, card } = data;
    const endOfCurrentDay = endOfDay(new Date());
    const referenceCode = `udf_user_${user.id}_code_${(
      Math.random() * 100
    ).toString(32)}`;

    const signature = `${apiKey}~${merchantId}~${referenceCode}~${data.order_details.amount}~BRL`;
    const signatureHash = md5(signature);

    const user_type = localStorage.getItem('@dashboard/user_type');
    const user_id = localStorage.getItem('@dashboard/user');

    const formattedPhone = data.shipping_address.phone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');

    const response_user = yield call(
      api.put,
      `${
        user_type === 'entity'
          ? `/entity/${user_id}`
          : `/organization/${user_id}`
      }`,
      { phone: formattedPhone }
    );

    if (response_user.data.id) {
      delete data.shipping_address.phone;

      if (card === null) {
        data.payu = {
          language: 'pt',
          command: 'SUBMIT_TRANSACTION',
          merchant: {
            apiKey,
            apiLogin,
          },
          transaction: {
            order: {
              accountId,
              referenceCode,
              description: 'Solicitação de material - boleto',
              language: 'pt',
              signature: signatureHash,
              notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
              additionalValues: {
                TX_VALUE: {
                  value: data.order_details.amount,
                  currency: 'BRL',
                },
              },
              buyer: {
                fullName: user.name,
                emailAddress: user.email,
                dniNumber: user.cpf,
                cnpj: user.cpf,
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                },
              },
              shippingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: formattedPhone,
              },
            },
            payer: {
              merchantPayerId: user.id.toString(),
              fullName: user.name,
              emailAddress: user.email,
              contactPhone: user.phone,
              dniNumber: user.cpf,
              cnpj: user.cpf,
              billingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: formattedPhone,
              },
            },
            type: 'AUTHORIZATION_AND_CAPTURE',
            paymentMethod: 'BOLETO_BANCARIO',
            paymentCountry: 'BR',
            expirationDate: addDays(endOfCurrentDay, 30),
            ipAddress: '127.0.0.1',
          },
          test: false,
        };
      } else {
        const formattedCardNumber = card.number.replace(/ /g, '');
        const [month, year] = card.expiry.split('/');
        const formattedCardExpiry = `20${year}/${month}`;

        data.payu = {
          language: 'pt',
          command: 'SUBMIT_TRANSACTION',
          merchant: {
            apiKey,
            apiLogin,
          },
          transaction: {
            order: {
              accountId,
              referenceCode,
              description: 'Solicitação de material - cartão',
              language: 'pt',
              signature: signatureHash,
              notifyUrl: 'http://apieventos.udf.org.br/payment_confirmation',
              additionalValues: {
                TX_VALUE: {
                  value: data.order_details.amount,
                  currency: 'BRL',
                },
              },
              buyer: {
                merchantBuyerId: user.id.toString(),
                fullName: user.name,
                emailAddress: user.email,
                contactPhone: user.phone,
                dniNumber: user.cpf,
                cnpj: user.cpf,
                shippingAddress: {
                  street1: shipping_address.street,
                  street2: shipping_address.street_number,
                  city: shipping_address.city,
                  state: shipping_address.uf,
                  country: 'BR',
                  postalCode: shipping_address.cep,
                  phone: formattedPhone,
                },
              },
              shippingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: formattedPhone,
              },
            },
            payer: {
              merchantPayerId: user.id.toString(),
              fullName: user.name,
              emailAddress: user.email,
              contactPhone: user.phone,
              dniNumber: user.cpf,
              cnpj: user.cpf,
              billingAddress: {
                street1: shipping_address.street,
                street2: shipping_address.street_number,
                city: shipping_address.city,
                state: shipping_address.uf,
                country: 'BR',
                postalCode: shipping_address.cep,
                phone: formattedPhone,
              },
            },
            creditCard: {
              number: formattedCardNumber,
              securityCode: card.cvc,
              expirationDate: formattedCardExpiry,
              name: card.name,
            },
            extraParameters: {
              INSTALLMENTS_NUMBER: data.order_details.installments,
            },
            type: 'AUTHORIZATION_AND_CAPTURE',
            paymentMethod: card.issuer,
            paymentCountry: 'BR',
            ipAddress: '127.0.0.1',
          },
          test: false,
        };
      }

      const response = yield call(api.post, '/order', data);

      yield put(OrderActions.addOrderSuccess());

      yield put(push(`/pedido/${response.data.id}/visualizar`));

      if (response.data.transaction.boleto_url) {
        window.open(response.data.transaction.boleto_url);
      }

      toastr.success('Sucesso!', 'Solicitação criada com sucesso.');
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(OrderActions.addOrderFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(OrderActions.addOrderFailure());
    }
  }
}

// function* deleteOrder(action) {}

function* allMinistery() {
  try {
    const response = yield call(api.get, '/ministery');

    yield put(MinisteryActions.allMinisterySuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(MinisteryActions.allMinisteryFailure());
  }
}

function* ministery(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/ministery/${id}`);

    yield put(MinisteryActions.ministerySuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(MinisteryActions.ministeryFailure());
  }
}

function* editMinistery(action) {
  try {
    const { id, editData } = action.payload;

    const { name } = editData;
    const { email } = editData;
    const { phone } = editData;

    yield call(api.put, `/ministery/${id}`, {
      name,
      email,
      phone,
    });

    yield put(MinisteryActions.editMinisterySuccess());
    toastr.confirm('Ministério alterado com sucesso.', {
      onOk: yield put(push('/admin/configuracao/ministerios')),
      disableCancel: true,
    });
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(MinisteryActions.editMinisteryFailure());
  }
}

function* allCertificate() {
  try {
    const response = yield call(api.get, '/layout_certificates');

    yield put(CertificateActions.allCertificateSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(CertificateActions.allCertificateFailure());
  }
}

// function* certificate() {}

// function* editCertificate() {}

function* allLesson() {
  try {
    const response = yield call(api.get, '/lesson');

    yield put(LessonActions.allLessonSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(LessonActions.allLessonFailure());
  }
}

function* lesson(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/lesson/${id}`);

    yield put(LessonActions.lessonSuccess(response.data));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(LessonActions.lessonFailure());
  }
}

function* editLesson(action) {
  try {
    const { id, editData } = action.payload;

    const { title } = editData;
    const { description } = editData;
    const { video_id } = editData;
    const { img_url } = editData;

    yield call(api.put, `/lesson/${id}`, {
      title,
      description,
      video_id,
      img_url,
    });

    yield put(LessonActions.editLessonSuccess());
    toastr.confirm('Lição alterada com sucesso.', {
      onOk: yield put(push('/admin/configuracao/licoes')),
      disableCancel: true,
    });
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(LessonActions.editLessonFailure());
  }
}

function* addLesson(action) {
  try {
    const { data } = action.payload;

    yield call(api.post, '/lesson', {
      default_event_id: data.default_event_id,
      title: data.title,
      description: data.description,
      video_id: data.video_id,
      img_url: data.img_url,
    });

    yield put(LessonActions.addLessonSuccess());
    toastr.confirm('Lição alterada com sucesso.', {
      onOk: yield put(push('/admin/configuracao/licoes')),
      disableCancel: true,
    });
  } catch (err) {
    toastr.error('Erro!', 'Ocorreu um erro');
    yield put(LessonActions.addLessonFailure());
  }
}

function* deleteLesson(action) {
  try {
    const { lesson_id } = action.payload;

    yield call(api.delete, `/lesson/${lesson_id}`);

    yield put(LessonActions.deleteLessonSuccess());
    window.location.reload();
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(LessonActions.deleteLessonFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao remover a lição.');
      yield put(LessonActions.deleteLessonFailure());
    }
  }
}

function* editParticipantHierarchy(action) {
  try {
    const {
      data,
      eventId,
      participantsId,
      assistantsId,
      hierarchyName,
      participantWillBecome,
      assistantWillBecome,
    } = action.payload;

    const response = yield call(
      api.put,
      `/lesson_report/${data.lesson_report_id}`,
      data
    );

    yield put(LessonReportActions.editLessonReportSuccess(response.data));

    if (hierarchyName === 'mu_hierarchy_id') {
      yield call(api.put, `entity_hierarchy/${eventId}`, {
        participantsId: [],
        assistantsId,
        hierarchyName: 'cmn_hierarchy_id',
        participantWillBecome,
        assistantWillBecome,
      });
    }

    yield call(api.put, `entity_hierarchy/${eventId}`, {
      participantsId,
      assistantsId,
      hierarchyName,
      participantWillBecome,
      assistantWillBecome,
    });

    yield put(ParticipantActions.editParticipantHierarchySuccess());

    toastr.confirm('Relatório confirmado.', {
      onOk: yield put(push(`/eventos/grupo/${eventId}/editar`)),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(ParticipantActions.editParticipantHierarchyFailure());
    } else {
      toastr.error('Falha!', 'Houve um erro ao editar o participante.');
      yield put(ParticipantActions.editParticipantHierarchyFailure());
    }
  }
}

function* shippingTag(action) {
  try {
    const { data } = action.payload;

    const response = yield call(api.post, '/shipping_tag', data);

    yield put(ShippingTagActions.shippingTagSuccess(response.data));
  } catch (err) {
    yield put(ShippingTagActions.shippingTagFailure());
  }
}

function* relationship(action) {
  try {
    const { entity_id } = action.payload;

    const response = yield call(api.get, `/relationship/entity/${entity_id}`);

    yield put(RelationshipActions.relationshipSuccess(response.data));
  } catch (err) {
    yield put(RelationshipActions.relationshipFailure());
  }
}

function* addRelationship(action) {
  try {
    const {
      entity_id,
      relationship_id,
      relationship_type,
      relationship_sex,
    } = action.payload;

    yield call(api.post, '/relationship', {
      entity_id,
      relationship_id,
      relationship_type,
      relationship_sex,
    });

    toastr.confirm('Familiar adicionado com sucesso!', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });

    yield put(RelationshipActions.addRelationshipSuccess());
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(RelationshipActions.addRelationshipFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(RelationshipActions.addRelationshipFailure());
    }
  }
}

function* editRelationship(action) {
  try {
    const { id, editData } = action.payload;

    yield call(api.put, `/relationship/${id}`, { relationship_type: editData });

    yield put(RelationshipActions.editRelationshipSuccess());

    toastr.confirm('Familiar atualizado com sucesso!', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(RelationshipActions.editRelationshipFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(RelationshipActions.editRelationshipFailure());
    }
  }
}

function* deleteRelationship(action) {
  try {
    const { relationship_id } = action.payload;

    yield call(api.delete, `/relationship/${relationship_id}`);

    yield put(RelationshipActions.deleteRelationshipSuccess());

    toastr.confirm('Familiar removido com sucesso!', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(RelationshipActions.deleteRelationshipFailure());
    } else {
      toastr.error(err.response.data.title, err.response.data.message);
      yield put(RelationshipActions.deleteRelationshipFailure());
    }
  }
}

function* createRelationship(action) {
  try {
    const {
      entity_id,
      name,
      cpf,
      email,
      sex,
      password,
      relationship_type,
    } = action.payload;

    const response = yield call(api.post, '/entity', {
      name,
      cpf,
      email,
      sex,
      password,
    });

    // const response = yield call(api.post, '/user', {
    //   name,
    //   cpf_cnpj,
    //   email,
    //   sex,
    //   password,
    // });

    if (response.data.id) {
      const relationship_id = response.data.id;
      yield put(RelationshipActions.createRelationshipSuccess());

      yield call(api.post, '/relationship', {
        entity_id,
        relationship_id,
        relationship_type,
      });

      yield put(RelationshipActions.addRelationshipSuccess());

      toastr.confirm('Familiar adicionado e cadastrado com sucesso.', {
        onOk: () => window.location.reload(),
        disableCancel: true,
      });
    }
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente acessar novamente mais tarde.');
      yield put(RelationshipActions.createRelationshipFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(RelationshipActions.createRelationshipFailure());
    }
  }
}

// CUSTOMIZAÇÕES DO TEMA
function* customizerBgImage(action) {
  try {
    const { img } = action.payload;

    yield put(CustomizerActions.sidebarImageSuccess(img));
  } catch (err) {
    yield put(CustomizerActions.customizerFailure());
  }
}

function* organization(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/organization/${id}`);

    yield put(OrganizationActions.organizationSuccess(response.data));
  } catch (err) {
    toastr.error(
      err.response.data.error.title,
      err.response.data.error.message
    );
    yield put(OrganizationActions.organizationFailure());
  }
}

function* editOrganization(action) {
  try {
    const { data } = action.payload;
    const { organization_id: id } = data;
    delete data.organization_id;

    const user_type = localStorage.getItem('@dashboard/user_type');
    const user_id = localStorage.getItem('@dashboard/user');

    if (id) {
      yield call(api.put, `/organization/${id}`, data);
    } else {
      yield call(
        api.put,
        `${
          user_type === 'entity'
            ? `/entity/${user_id}`
            : `/organization/${user_id}`
        }`,
        data
      );
    }

    // if (id) {
    //   yield call(api.put, `/user/pj/${id}`, data);
    // } else {
    //   yield call(
    //     api.put,
    //     `${
    //       user_type === 'entity' ? `/user/pf/${user_id}` : `/user/pj/${user_id}`
    //     }`,
    //     data
    //   );
    // }

    yield put(OrganizationActions.editOrganizationSuccess());
    toastr.confirm('Perfil atualizado com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    if (err.message === 'Network Error') {
      toastr.error('Falha!', 'Tente novamente mais tarde.');
      yield put(OrganizationActions.editOrganizationFailure());
    } else {
      const { data } = err.response;

      if (data && data.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.map(error => {
          toastr.error('Falha!', error.message);
        });
      }

      yield put(OrganizationActions.editOrganizationFailure());
    }
  }
}

function* avatar(action) {
  try {
    const { file, name, entity_id: id, user_type } = action.payload;

    const user_id = localStorage.getItem('@dashboard/user');

    const data = new FormData();

    data.append('file', file, name);

    if (id) {
      yield call(api.post, `/files/${id}/${user_type}`, data);
    } else {
      yield call(api.post, `/files/${user_id}/${user_type}`, data);
    }

    yield put(AvatarActions.avatarSuccess());

    toastr.confirm('Foto atualizada com sucesso.', {
      onOk: () => window.location.reload(),
      disableCancel: true,
    });
  } catch (err) {
    toastr.error(
      err.response.data.error.title,
      err.response.data.error.message
    );
    yield put(AvatarActions.avatarFailure());
  }
}

function* customizerBgImageUrl(action) {
  try {
    const { imgurl } = action.payload;

    yield put(CustomizerActions.sidebarImageUrlSuccess(imgurl));
  } catch (err) {
    yield put(CustomizerActions.customizerFailure());
  }
}

function* customizerBgColor(action) {
  try {
    const { color } = action.payload;

    yield put(CustomizerActions.sidebarBgColorSuccess(color));
  } catch (err) {
    toastr.error('Falha!', 'Tente novamente');
    yield put(CustomizerActions.customizerFailure());
  }
}

function* customizerSidebarCollapsed(action) {
  try {
    const { collapsed } = action.payload;

    yield put(CustomizerActions.sidebarCollapsedSuccess(collapsed));
  } catch (err) {
    yield put(CustomizerActions.customizerFailure());
  }
}

function* customizerSidebarSize(action) {
  try {
    const { size } = action.payload;

    yield put(CustomizerActions.sidebarSizeSuccess(size));
  } catch (err) {
    yield put(CustomizerActions.customizerFailure());
  }
}

function* customizerLayout(action) {
  try {
    const { layout } = action.payload;

    yield put(CustomizerActions.changeLayoutSuccess(layout));
  } catch (err) {
    yield put(CustomizerActions.customizerFailure());
  }
}

function* logs(action) {
  try {
    const { models, requesting_id } = action.payload;

    const response = yield call(api.post, '/logs', {
      models,
      requesting_id,
    });

    yield put(LogActions.logsSuccess(response.data));
  } catch (err) {
    toastr.error(
      err.response.data.error.title,
      err.response.data.error.message
    );
    yield put(LogActions.logsFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(SignupTypes.REQUEST, signup),
    takeLatest(LoginTypes.REQUEST, login),
    takeLatest(ResetPasswordTypes.REQUEST, resetPassword),
    takeLatest(ResetPasswordTypes.CONFIRM_REQUEST, confirmResetPassword),
    takeLatest(ProfileTypes.PASSWORD_REQUEST, changePassword),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout),
    takeLatest(ProfileTypes.REQUEST, profile),
    takeLatest(ExpiredTitlesTypes.REQUEST, expiredTitles),
    takeLatest(AddressTypes.REQUEST, address),
    takeLatest(AddressTypes.DELETE_REQUEST, deleteAddress),
    takeLatest(BankTypes.REQUEST, bank),
    takeLatest(BankAccountTypes.REQUEST, bankAccount),
    takeLatest(BankAccountTypes.DELETE_REQUEST, deleteBankAccount),
    takeLatest(ProfileTypes.EDIT_REQUEST, editProfile),

    takeLatest(EntityTypes.REQUEST, consultEntity),
    takeLatest(EntityTypes.CPF_REQUEST, consultEntityCpf),
    takeLatest(EntityTypes.ALL_CONSULT_REQUEST, allConsultEntities),

    takeLatest(ExportExcelTypes.EVENT_REQUEST, exportExcel),
    takeLatest(ExportExcelTypes.ENTITY_REQUEST, entityExportExcel),
    takeLatest(ExportExcelTypes.ORGANIZATION_REQUEST, organizationExportExcel),

    takeLatest(ChurchTypes.REQUEST, churchs),

    takeLatest(EventTypes.REQUEST, event),
    takeLatest(EventTypes.ALL_REQUEST, allEvents),
    takeLatest(EventTypes.ADD_REQUEST, addEvent),
    takeLatest(EventTypes.EDIT_REQUEST, editEvent),
    takeLatest(EventTypes.DELETE_REQUEST, deleteEvent),
    takeLatest(EventTypes.ALL_CONSULT_REQUEST, allConsultEvent),
    takeLatest(EventTypes.ALL_CONSULT_PRINT_REQUEST, allEventForAdminPrint),

    takeLatest(InviteTypes.ADD_REQUEST, addInvite),
    takeLatest(InviteTypes.CONFIRM_REQUEST, confirmInvite),
    takeLatest(InviteTypes.DELETE_REQUEST, deleteInvite),
    takeLatest(InviteTypes.CREATE_BY_INVITE_REQUEST, createByInviteParticipant),
    takeLatest(
      InviteTypes.CONFIRM_INVITE_ORDER_REQUEST,
      confirmParticipantInviteOrder
    ),
    takeLatest(
      InviteTypes.CREATE_BY_INVITE_ORDER_REQUEST,
      createByInviteOrderParticipant
    ),

    takeLatest(OrganizatorTypes.ADD_REQUEST, addOrganizator),
    takeLatest(OrganizatorTypes.DELETE_REQUEST, deleteOrganizator),
    takeLatest(OrganizatorTypes.CHANGE_REQUEST, changeOrganizator),
    takeLatest(OrganizatorTypes.SEARCH_REQUEST, searchOrganizator),

    takeLatest(ParticipantTypes.ADD_REQUEST, addParticipant),
    takeLatest(ParticipantTypes.DELETE_REQUEST, deleteParticipant),
    takeLatest(ParticipantTypes.SEARCH_REQUEST, searchParticipant),
    takeLatest(
      ParticipantTypes.SEARCH_BY_EMAIL_REQUEST,
      searchParticipantByEmail
    ),
    takeLatest(ParticipantTypes.CREATE_REQUEST, createParticipant),
    takeLatest(ParticipantTypes.EDIT_REQUEST, editParticipant),
    takeLatest(ParticipantTypes.SET_QUITTER_REQUEST, setQuitterParticipant),
    takeLatest(
      ParticipantTypes.EDIT_HIERARCHY_REQUEST,
      editParticipantHierarchy
    ),
    takeLatest(
      ParticipantTypes.CHANGE_PARTICIPANT_LEADER_REQUEST,
      changeParticipantToLeader
    ),
    takeLatest(ParticipantTypes.EDIT_PRINT_DATE_REQUEST, editEventParticipant),

    takeLatest(OrderTypes.REQUEST, order),
    // takeLatest(OrderTypes.ALL_REQUEST, allOrders),
    takeLatest(OrderTypes.ADD_REQUEST, addOrder),
    // takeLatest(OrderTypes.DELETE_REQUEST, deleteOrder),

    takeLatest(MinisteryTypes.ALL_REQUEST, allMinistery),
    takeLatest(MinisteryTypes.REQUEST, ministery),
    takeLatest(MinisteryTypes.EDIT_REQUEST, editMinistery),

    takeLatest(CertificateTypes.ALL_REQUEST, allCertificate),
    // takeLatest(CertificateTypes.REQUEST, certificate),
    // takeLatest(CertificateTypes.EDIT_REQUEST, editCertificate),

    takeLatest(LessonReportTypes.REQUEST, lessonReport),
    takeLatest(LessonReportTypes.EDIT_REQUEST, lessonReportEdit),

    takeLatest(LessonTypes.ALL_REQUEST, allLesson),
    takeLatest(LessonTypes.REQUEST, lesson),
    takeLatest(LessonTypes.EDIT_REQUEST, editLesson),
    takeLatest(LessonTypes.ADD_REQUEST, addLesson),
    takeLatest(LessonTypes.DELETE_REQUEST, deleteLesson),

    takeLatest(DefaultEventTypes.ORGANIZATOR_EVENT_REQUEST, organizatorEvent),
    takeLatest(DefaultEventTypes.ALL_REQUEST, allDefaultEvent),

    takeLatest(ShippingTypes.SHIPPING_REQUEST, shippingOptions),

    takeLatest(CepTypes.REQUEST, cep),

    takeLatest(OrganizationTypes.REQUEST, organization),
    takeLatest(OrganizationTypes.EDIT_REQUEST, editOrganization),

    takeLatest(ShippingTagTypes.REQUEST, shippingTag),

    takeLatest(RelationshipTypes.REQUEST, relationship),
    takeLatest(RelationshipTypes.EDIT_REQUEST, editRelationship),
    takeLatest(RelationshipTypes.DELETE_REQUEST, deleteRelationship),
    takeLatest(RelationshipTypes.ADD_REQUEST, addRelationship),
    takeLatest(RelationshipTypes.CREATE_REQUEST, createRelationship),

    // takeLatest(GroupEditTypes.REQUEST, groupEdit),

    takeLatest(CustomizerTypes.BG_IMAGE_REQUEST, customizerBgImage),
    takeLatest(CustomizerTypes.BG_IMAGE_URL_REQUEST, customizerBgImageUrl),
    takeLatest(CustomizerTypes.BG_COLOR_REQUEST, customizerBgColor),
    takeLatest(
      CustomizerTypes.SIDEBAR_COLLAPSED_REQUEST,
      customizerSidebarCollapsed
    ),
    takeLatest(CustomizerTypes.SIDEBAR_SIZE_REQUEST, customizerSidebarSize),
    takeLatest(CustomizerTypes.LAYOUT_REQUEST, customizerLayout),
    takeLatest(SearchChurchTypes.REQUEST, searchChurch),
    takeLatest(CheckoutTypes.CHECKOUT_LOGIN_REQUEST, checkoutLogin),
    takeLatest(CheckoutTypes.CHECKOUT_SIGNUP_REQUEST, checkoutSignup),
    // takeLatest(CheckoutTypes.CHECKOUT_REQUEST, checkoutPayment),
    takeLatest(SiteEventTypes.REQUEST, siteEvent),
    takeLatest(AvatarTypes.REQUEST, avatar),

    takeLatest(LogTypes.REQUEST, logs),
  ]);
}
