/**
 *@author Erick
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */

// adress.custrecord_enl_uf
// adress.custrecord_enl_city
// categoria de cliente = custentity_rsc_categoriacliente === 1 (igreja)

define(["N/search"], function(search) {
  /* const searchColumns = [
    "internalid",
    "companyname",
    "address.custrecord_enl_uf",
    "address.custrecord_enl_city"
  ]; */

  const removeAccents = function(string) {
    var r = string.toLowerCase();
    r = r.replace(new RegExp("\\s", "g"), " ");
    r = r.replace(new RegExp("[àáâãäå]", "g"), "a");
    r = r.replace(new RegExp("æ", "g"), "ae");
    r = r.replace(new RegExp("ç", "g"), "c");
    r = r.replace(new RegExp("[èéêë]", "g"), "e");
    r = r.replace(new RegExp("[ìíîï]", "g"), "i");
    r = r.replace(new RegExp("ñ", "g"), "n");
    r = r.replace(new RegExp("[òóôõö]", "g"), "o");
    r = r.replace(new RegExp("œ", "g"), "oe");
    r = r.replace(new RegExp("[ùúûü]", "g"), "u");
    r = r.replace(new RegExp("[ýÿ]", "g"), "y");
    r = r.replace(new RegExp("\\W", "g"), " ");
    return r;
  };

  function _get(context) {
    return search
      .create({
        type: search.Type.CUSTOMER,
        filters: [["custentity_rsc_categoriacliente", "is", 1]],
        columns: [
          search.createColumn({ name: "internalid" }),
          search.createColumn({ name: "companyname" }),
          search.createColumn({ name: "address3" }),
          search.createColumn({ name: "custrecord_enl_uf", join: "address" }),
          search.createColumn({ name: "custrecord_enl_city", join: "address" })
        ]
      })
      .run()
      .getRange({
        start: 0,
        end: 1000
      })
      .filter(function(result) {
        const uf = removeAccents(result.getText(result.columns[3]));
        const city = removeAccents(result.getText(result.columns[4]));
        const name = removeAccents(result.getValue({ name: "companyname" }));

        const context_uf = removeAccents(context.uf);
        const context_city = removeAccents(context.city);
        const context_name = removeAccents(context.name);

        if (
          uf === context_uf &&
          city === context_city &&
          name.indexOf(context_name) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map(function(result) {
        return {
          id: result.getValue({ name: "internalid" }),
          name: result.getValue({ name: "companyname" }),
          neighborhood: result.getValue({ name: "address3" })
        };
      });

    if (churchs.length === 0) {
      return {
        error: {
          title: "Falha!",
          message: "Nenhuma igreja foi encontrada"
        }
      };
    }
  }

  return {
    get: _get
  };
});
