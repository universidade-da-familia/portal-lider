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
  const searchColumns = [
    'entityid',
    'custentity_enl_cnpjcpf',
  ]

  function _get(context) {
    const customers = search.create({
      type: search.Type.CUSTOMER,
      filters: [
        ["custentity_enl_cnpjcpf", "is", context.cpf]
      ],
      columns: searchColumns
    })
      .run()
      .getRange({
        start: 0,
        end: 1000
      })
      .map(function (result) {
        return {
          id: result.getValue({ name: 'entityid' }),
          cpf: result.getValue({ name: 'custentity_enl_cnpjcpf' }),
        }
    })

    if (customers.length === 0) {
      return 
      {
        error: {
          title: "Falha!",
          message: "Não existe um líder com este cpf"
        }
      }
    } else if (customers.length > 1) {
      {
        error: {
          title: "Falha!",
          message: "Líder com cpf duplicado"
        }
      }
    }

    return record.load({
      type: 'customer',
      id: customers[0].id
    });
  }

  return {
    get: _get
  };
});
