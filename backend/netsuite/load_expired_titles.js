/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(['N/search'], function (search) {
  /**
   * Columns to be retrieved in the search.
   *
   * @type {object[]}
   */

  function index (context) {
    return search.create({
      type: "invoice",
      filters:
      [
         ["type","anyof","CustInvc"],
         "AND",
         ["duedate","before","today"],
         "AND",
         ["amount","greaterthan","0.00"],
         "AND",
         ["billingstatus","is","T"],
         "AND",
         ["customer.custentity_enl_cnpjcpf","is", context.cpf]
      ],
      columns:
      [
         "trandate",
         "duedate",
         "type",
         "tranid",
         "entity",
         "account",
         "memo",
         "amount",
         search.createColumn({
            name: "custentity_enl_cnpjcpf",
            join: "customer"
         })
      ]
   })
    .run()
    .getRange({
      start: 0,
      end: 1000
    })
    .map(function (result) {
      const cpf = result.getValue({
        name: "custentity_enl_cnpjcpf",
        join: "customer",
      })

      return cpf
    })
  }

  return {
    get: index
  }
})
