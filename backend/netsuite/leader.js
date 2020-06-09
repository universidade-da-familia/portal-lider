/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["N/search", "N/record"], function(search, record) {
  const searchColumns = ["internalid"];

  function _get(context) {
    const customers = search
      .create({
        type: search.Type.CUSTOMER,
        filters: [["custentity_enl_cnpjcpf", "is", context.cpf]],
        columns: searchColumns
      })
      .run()
      .getRange({
        start: 0,
        end: 1000
      })
      .map(function(result) {
        return {
          id: result.getValue({ name: "internalid" })
        };
      });

    if (customers.length === 0) {
      return {
        error: {
          title: "Falha!",
          message: "CPF não cadastrado no sistema"
        }
      };
    } else if (customers.length > 1) {
      return {
        error: {
          title: "CPF duplicado",
          message: "Entre em contato conosco"
        }
      };
    }

    return record.load({
      type: "customer",
      id: customers[0].id
    });
  }

  return {
    get: _get
  };
});
