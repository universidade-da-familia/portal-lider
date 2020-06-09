/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["N/record", "N/search"], function(record, search) {
  /**
   * POST.
   *
   * @param context
   */
  function store(context) {
    try {
      const customer = record.load({
        type: record.Type.CUSTOMER,
        id: context.netsuite_id,
        isDynamic: true
      });

      const name = customer.getText({ fieldId: "custentity_enl_legalname" }) || ""

      const numberOfAddresses = customer.getLineCount({
        sublistId: "addressbook"
      });

      if(numberOfAddresses > 0) {
        for (var index = 0; index < numberOfAddresses; index += 1) {
          customer.selectLine({
            sublistId: "addressbook",
            line: index
          });

          customer.removeCurrentSublistSubrecord({
            sublistId: "addressbook",
            fieldId: "addressbookaddress"
          });

          customer.commitLine({
            sublistId: "addressbook"
          });
        }
      }


      if(context.netsuiteAddresses && context.netsuiteAddresses.length > 0) {
        customer.selectNewLine({ sublistId: "addressbook" });

        context.netsuiteAddresses.forEach(function(address, index) {
          log.debug({ "title": "logs", "details": address })
          const searchColumns = ["internalid"]
          const ufIds = search.create({
            type: "customlist_enl_state",
            filters: [
              ["name", "is", address.uf]
            ],
            columns: searchColumns
          })
            .run()
            .getRange({
              start: 0,
              end: 1000
            })
            .map(function (result) {
              const id = result.getValue({ name: "internalid" });

              return id;
            })
          const cityIds = search.create({
              type: "customrecord_enl_cities",
              filters: [
                ["name", "is", address.city]
              ],
              columns: searchColumns
            })
              .run()
              .getRange({
                start: 0,
                end: 1000
              })
              .map(function (result) {
                const id = result.getValue({ name: "internalid" });

                return id;
              })

          const addressSubrecord = customer.getCurrentSublistSubrecord({
            sublistId: 'addressbook',
            fieldId: 'addressbookaddress'
          });

          if(index === 0) {
            customer.setCurrentSublistValue({
              sublistId: "addressbook",
              fieldId: "defaultbilling",
              value: true
            });
            customer.setCurrentSublistValue({
              sublistId: "addressbook",
              fieldId: "defaultshipping",
              value: true
            });
          }

          if(address.type === "other") {
            customer.setCurrentSublistValue({
              sublistId: "addressbook",
              fieldId: "label",
              value: address.other_type_name || address.street
            });
          } else if(address.type === "home") {
            customer.setCurrentSublistValue({
              sublistId: "addressbook",
              fieldId: "label",
              value: "Minha casa"
            });
          } else {
            customer.setCurrentSublistValue({
              sublistId: "addressbook",
              fieldId: "label",
              value: "Meu trabalho"
            });
          }
          addressSubrecord.setValue({
            fieldId: "country",
            value: "BR"
          });
          addressSubrecord.setValue({
            fieldId: "zip",
            value: address.cep
          });
          addressSubrecord.setValue({
            fieldId: "addr1",
            value: address.street
          });
          addressSubrecord.setValue({
            fieldId: "custrecord_enl_numero",
            value: address.street_number
          });
          addressSubrecord.setValue({
            fieldId: "addr2",
            value: address.complement
          });
          addressSubrecord.setValue({
            fieldId: "addr3",
            value: address.neighborhood
          });
          addressSubrecord.setValue({
            fieldId: "custrecord_enl_uf",
            value: parseInt(ufIds[0]) || ""
          });
          addressSubrecord.setValue({
            fieldId: "custrecord_enl_city",
            value: parseInt(cityIds[0]) || ""
          });
          addressSubrecord.setValue({
            fieldId: "addressee",
            value: address.receiver || name
          });
          addressSubrecord.setValue({
            fieldId: "custrecordudf_dashboard_address_id",
            value: address.id
          });

          customer.commitLine({ sublistId: "addressbook" });

        });
      }

      customer.save({
        ignoreMandatoryFields: false,
        enableSourcing: false
      });

      return {
        title: "Sucesso!",
        message: "Os registros foram atualizados."
      };
    } catch (err) {
      return {
        title: "Falha!",
        message: "Houve um erro ao atualizar o registro",
        erro: err
      };
    }
  }

  /**
   * DELETE.
   *
   * @param requestParams
   */
  function destroy(requestParams) {
    try {
      const customer = record.load({
        type: record.Type.CUSTOMER,
        id: requestParams.netsuite_id,
        isDynamic: true
      });

      log.debug({ "title": "destroy", "details": customer });

      customer.selectLine({
        sublistId: "addressbook",
        line: requestParams.index
      });

      customer.removeCurrentSublistSubrecord({
        sublistId: "addressbook",
        fieldId: "addressbookaddress"
      });

      customer.commitLine({
        sublistId: 'addressbook'
      });

      customer.save({
        ignoreMandatoryFields: false,
        enableSourcing: false
      });

      return {
        title: "Sucesso!",
        message: "O registro foi removido."
      };
    } catch (err) {
      return {
        title: "Falha!",
        message: "Houve um erro ao remover o registro",
        erro: err
      };
    }
  }

  return {
    post: store,
    delete: destroy
  };
});
