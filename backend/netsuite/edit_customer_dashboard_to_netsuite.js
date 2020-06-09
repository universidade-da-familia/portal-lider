/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["N/record"], function(record) {
  /**
   * PUT.
   *
   * @param context
   */
  function update(context) {
    try {
      const customer = record.load({
        type: record.Type.CUSTOMER,
        id: context.netsuite_id,
        isDynamic: true
      });

      if (context.is_business) {
        customer.setValue({
          fieldId: "companyname",
          value: context.company_name || ""
        });
        customer.setValue({
          fieldId: "custentity_rsc_nomefantasia",
          value: context.fantasy_name || ""
        });
        customer.setValue({ fieldId: "isperson", value: "F" });
      } else {
        customer.setValue({ fieldId: "firstname", value: context.firstname });
        customer.setValue({ fieldId: "lastname", value: context.lastname });
        customer.setValue({ fieldId: "custentity_enl_ienum", value: "ISENTO" });

        customer.setValue({
          fieldId: "custentity_enl_ent_activitysector",
          value: 4
        });

        customer.setValue({
          fieldId: "custentity_enl_enviarnota",
          value: true
        });
      }

      customer.setValue({
        fieldId: "custentity_enl_legalname",
        value: context.name
      });
      customer.setValue({
        fieldId: "custentityid_dashboard_cliente",
        value: context.id
      });
      customer.setValue({
        fieldId: "custentity_enl_cnpjcpf",
        value: context.cpf_cnpj || ""
      });
      customer.setValue({ fieldId: "email", value: context.email || "" });
      customer.setValue({
        fieldId: "custentity_rsc_estadocivil",
        value: context.personal_state_id || ""
      });
      if (context.sex === "F") {
        customer.setValue({ fieldId: "custentity_rsc_sexo", value: "1" });
      }
      if (context.sex === "M") {
        customer.setValue({ fieldId: "custentity_rsc_sexo", value: "2" });
      }
      customer.setValue({ fieldId: "phone", value: context.phone || "" });
      customer.setValue({ fieldId: "altphone", value: context.alt_phone || "" });
      customer.setValue({ fieldId: "custentity_rsc_igreja", value: context.church_netsuite_id || "" });

      if (context.cmn_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_cmn_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_cmn_hierarchy_id", value: context.cmn_hierarchy_id })
      }
      if (context.mu_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_mu_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_mu_hierarchy_id", value: context.mu_hierarchy_id })
      }
      if (context.crown_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_crown_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_crown_hierarchy_id", value: context.crown_hierarchy_id })
      }
      if (context.mp_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_mp_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_mp_hierarchy_id", value: context.mp_hierarchy_id })
      }
      if (context.ffi_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_ffi_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_ffi_hierarchy_id", value: context.ffi_hierarchy_id })
      }
      if (context.gfi_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_gfi_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_gfi_hierarchy_id", value: context.gfi_hierarchy_id })
      }
      if (context.pg_hab_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_pg_hab_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_pg_hab_hierarchy_id", value: context.pg_hab_hierarchy_id })
      }
      if (context.pg_yes_hierarchy_id == 0) {
        customer.setValue({ fieldId: "custentity_pg_yes_hierarchy_id", value: "" });
      } else {
        customer.setValue({ fieldId: "custentity_pg_yes_hierarchy_id", value: context.pg_yes_hierarchy_id })
      }

      const customerId = customer.save();

      return {
        title: "Sucesso!",
        message: "O registro foi atualizado.",
        id: customerId
      };
    } catch (err) {
      return {
        title: "Falha!",
        message: "Houve um erro ao atualizar o registro",
        erro: err
      };
    }
  }

  return {
    put: update
  };
});
