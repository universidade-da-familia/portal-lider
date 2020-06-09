/* eslint-disable */
/**
 *@author Lucas Alves
 *
 *@NApiVersion 2.x
 *@NScriptType Restlet
 *@NModuleScope SameAccount
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
        id: context.entity.netsuite_id,
        isDynamic: true
      });

      customer.setValue({
        fieldId: "custentity_enl_legalname",
        value: context.entity.name
      });

      customer.setValue({
        fieldId: "custentity_enl_ienum",
        value: "ISENTO"
      });

      customer.setValue({
        fieldId: "custentity_enl_ent_activitysector",
        value: 4
      });

      customer.setValue({
        fieldId: "custentity_enl_enviarnota",
        value: true
      });

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

          if(parseInt(context.address_id) === parseInt(address.id)) {
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
            value: address.receiver || context.entity.name
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

      const salesOrder = record.create({
        type: record.Type.SALES_ORDER,
        isDynamic: true,
        defaultValues: {
          entity: context.entity.netsuite_id
        }
      });

      salesOrder.setValue({ fieldId: "trandate", value: new Date() });
      salesOrder.setValue({ fieldId: "department", value: "3" });
      salesOrder.setValue({ fieldId: "class", value: "1" });
      salesOrder.setValue({ fieldId: "location", value: "1" });

      if (context.card === null) {
        salesOrder.setValue({ fieldId: "terms", value: "10" });
      } else {
        if (context.installments === 1) {
          salesOrder.setValue({ fieldId: "terms", value: "1" });
        }

        if (context.installments === 2) {
          salesOrder.setValue({ fieldId: "terms", value: "15" });
        }

        if (context.installments === 3) {
          salesOrder.setValue({ fieldId: "terms", value: "16" });
        }

        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.orderstatus) {
          salesOrder.setValue({
            fieldId: "orderstatus",
            value: context.orderstatus
          })
        }

        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.origstatus) {
          salesOrder.setValue({
            fieldId: "origstatus",
            value: context.origstatus
          })
        }

        // grava o pedido como pendente de aprovação (pagamento pendente na payu)
        if (context.statusRef) {
          salesOrder.setValue({
            fieldId: "statusRef",
            value: context.statusRef
          })
        }
      }

      if (context.order_type === "Curso") {
        salesOrder.setValue({
          fieldId: "custbodyudf_order_type",
          value: 1
        })
      }

      if (context.order_type === "Capacitação de líderes" ||
        context.order_type === "Treinamento de treinadores"
      ) {
        salesOrder.setValue({
          fieldId: "custbodyudf_order_type",
          value: 2
        })
      }

      if (context.order_type === "Seminário") {
        salesOrder.setValue({
          fieldId: "custbodyudf_order_type",
          value: 3
        })
      }

      salesOrder.setValue({
        fieldId: "custbody_enl_operationtypeid",
        value: "1"
      });
      salesOrder.setValue({
        fieldId: "custbody_enl_order_documenttype",
        value: "1"
      });
      salesOrder.setValue({
        fieldId: "custbodyudf_observacao_cliente",
        value: "Pedido gerado automaticamente através da plataforma de líderes"
      });

      salesOrder.setValue({
        fieldId: "custbody_rsc_payu_json",
        value: context.payu_json
      });
      salesOrder.setValue({
        fieldId: "custbody_rsc_payu_order_id",
        value: context.payu_order_id
      });
      salesOrder.setValue({
        fieldId: "custbody_rsc_payu_link_payment",
        value: context.payu_link_payment
      });
      salesOrder.setValue({
        fieldId: "custbody_rsc_status_payu",
        value: context.payu_order_status
      });

      salesOrder.setValue({ fieldId: "custbody_enl_freighttype", value: "1" });

      if (context.shipping_option.delivery_method_name === "Correios PAC") {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3647
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 4
        });
      } else if (
        context.shipping_option.delivery_method_name === "Correios Sedex"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3670
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 4
        });
      } else if (
        context.shipping_option.delivery_method_name === "Braspress Standard"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3653
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 3
        });
      } else if (
        context.shipping_option.delivery_method_name === "Braspress Multiply"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3652
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 3
        });
      } else if (
        context.shipping_option.delivery_method_name === "Correios Sedex 10"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3651
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 4
        });
      } else if (
        context.shipping_option.delivery_method_name === "Braspress Aéreo"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3654
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 3
        });
      } else if (
        context.shipping_option.delivery_method_name === "Azul Cargo Express"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3655
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 1
        });
      } else if (
        context.shipping_option.delivery_method_name === "Araçalog Aéreo"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3656
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 2
        });
      } else if (
        context.shipping_option.delivery_method_name === "Aracalog Standard"
      ) {
        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3657
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 2
        });
      } else if (
        context.shipping_option.delivery_method_name === "Retirar na UDF"
      ) {
        if (context.gifts !== "") {
          salesOrder.setValue({
            fieldId: "custbody_udf_obs_envio",
            value: "Brindes: \n" + context.gifts + "\n" + "O líder irá retirar na UDF"
          });
        } else {
          salesOrder.setValue({
            fieldId: "custbody_udf_obs_envio",
            value: "O líder irá retirar na UDF"
          });
        }


        salesOrder.setValue({
          fieldId: "custbody_enl_legaltext",
          value: "O líder irá retirar na UDF"
        });

        salesOrder.setValue({ fieldId: "custbody_enl_freighttype", value: "10" });

        salesOrder.setValue({
          fieldId: "shipmethod",
          value: 3686
        });

        salesOrder.setValue({
          fieldId: "custbody_enl_carrierid",
          value: 12
        });
      }

      // resumo do pedido - custo do frete
      salesOrder.setValue({
        fieldId: "altshippingcost",
        value: 0
      });
      // valor frete aba entrega
      salesOrder.setValue({
        fieldId: "shippingcost",
        value: 0
      });

      if (context.shipping_cost === 0) {
        // valor frete aba informacoes fiscais
        salesOrder.setValue({
          fieldId: "custbody_enl_trans_freightamount",
          value: context.shipping_option.final_shipping_cost || 0
        });
      } else {
        // valor frete aba informacoes fiscais
        salesOrder.setValue({
          fieldId: "custbody_enl_trans_freightamount",
          value: context.shipping_cost || 0
        });
      }

      const shippingAddress = salesOrder.getSubrecord({
        fieldId: "shippingaddress"
      });

      // avalara actualization
      shippingAddress.setValue({
        fieldId: "zipcode",
        value: context.shipping_cep
      });

      salesOrder.selectNewLine({ sublistId: "item" });

      const products = context.products;
      products.forEach(function(product) {
        salesOrder.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "item",
          value: product.netsuite_id
        });
        salesOrder.setCurrentSublistValue({
          sublistId: "item",
          fieldId: "quantity",
          value: product.quantity
        });

        if (context.order_type === "Curso") {
          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "price",
            value: 3
          });
        }

        if (context.order_type === "Capacitação de líderes" ||
          context.order_type === "Treinamento de treinadores"
        ) {
          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "price",
            value: 6
          });
        }

        if (context.order_type === "Seminário") {
          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "price",
            value: 9
          });
        }

        if (context.shipping_cost === 0) {
          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "custcol_enl_line_freightamount",
            value: 0
          });
        } else {
          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "custcol_enl_line_freightamount",
            value: product.freight_per_item || 0
          });
        }

        salesOrder.commitLine({ sublistId: "item" });
      });

      if (context.gifts !== "") {
        salesOrder.setValue({
          fieldId: "custbody_udf_obs_envio",
          value: "Brindes: \n" + context.gifts
        });
      }

      const salesOrderId = salesOrder.save({
        ignoreMandatoryFields: false,
        enableSourcing: false
      });

      return {
        id: salesOrderId
      };
    } catch (err) {
      return err
    }
  }

  return {
    post: store
  };
});
