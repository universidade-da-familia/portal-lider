/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["N/search", "N/record"], function(search, record) {
  /**
   * Columns to be retrieved in the search.
   *
   * @type {object[]}
   */
  const searchColumns = ["entityid", "internalid", "custentity_enl_cnpjcpf"];

  function createCustomer(context) {
    const customer = record.create({ type: record.Type.CUSTOMER });

    // id da entidade no portal
    customer.setValue({
      fieldId: "custentityid_dashboard_cliente",
      value: context.id
    });

    if (context.is_business) {
      customer.setValue({
        fieldId: "companyname",
        value: context.company_name
      });
      customer.setValue({
        fieldId: "custentity_rsc_nomefantasia",
        value: context.fantasy_name
      });
      customer.setValue({ fieldId: "isperson", value: "F" });
    } else {
      customer.setValue({ fieldId: "firstname", value: context.firstname });
      customer.setValue({ fieldId: "lastname", value: context.lastname });
      customer.setValue({ fieldId: "isperson", value: "T" });
      customer.setValue({ fieldId: "custentity_enl_ienum", value: "ISENTO" });
    }

    customer.setValue({
      fieldId: "custentity_enl_enviarnota",
      value: true
    });
    customer.setValue({
      fieldId: "custentity_enl_legalname",
      value: context.name
    });
    customer.setValue({
      fieldId: "custentity_enl_ent_activitysector",
      value: 4
    });
    customer.setValue({
      fieldId: "custentity_enl_cnpjcpf",
      value: context.cpf_cnpj
    });
    customer.setValue({ fieldId: "email", value: context.email || "" });
    customer.setValue({ fieldId: "subsidiary", value: 2 });
    customer.setValue({
      fieldId: "custrecord_udf_flag_integrado",
      value: true
    });

    if (context.sex === "F") {
      customer.setValue({ fieldId: "custentity_rsc_sexo", value: "1" });
    }
    if (context.sex === "M") {
      customer.setValue({ fieldId: "custentity_rsc_sexo", value: "2" });
    }

    const customerId = customer.save();

    return {
      id: customerId
    };
  }

  /**
   * POST.
   *
   * @param context
   */
  function store(context) {
    try {
      if (context.cpf_cnpj) {
        const customers = search
        .create({
          type: search.Type.CUSTOMER,
          filters: [["custentity_enl_cnpjcpf", "is", context.cpf_cnpj]],
          columns: searchColumns
        })
        .run()
        .getRange({
          start: 0,
          end: 1000
        })
        .map(function(result) {
          return {
            id: result.getValue({ name: "internalid" }),
            cpf_cnpj: result.getValue({ name: "custentity_enl_cnpjcpf" })
          };
        });

        if (customers.length > 0) {
          return {
            title: "Aviso!",
            message: "O participante informado já possui cadastro ativo.",
            id: customers[0].id
          };
        } else {
          return createCustomer(context)
        }
      } else {
        return createCustomer(context)
      }
    } catch (err) {
      return {
        title: "Falha!",
        message: "Houve um erro ao criar o registro",
        erro: err
      };
    }
  }

  return {
    post: store
  };
});
