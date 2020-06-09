/* eslint-disable */
/**
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType UserEventScript
 */
define(["N/runtime", "N/record", "N/http"], function(runtime, record, http) {
  /**
   * Function definition to be triggered before record is loaded.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.newRecord - New record
   * @param {Record} scriptContext.oldRecord - Old record
   * @param {string} scriptContext.type - Trigger type
   */
  function afterSubmit(scriptContext) {
    const type = scriptContext.type;
    const oldRecord = scriptContext.oldRecord;

    if (type === "delete") {
      const netsuite_id = oldRecord.id;
      const name = runtime.getCurrentUser().name

      http.delete({
        url: "http://apieventos.udf.org.br/netsuite_order/" + netsuite_id + "/" + name
      });
    }
  }

  return {
    afterSubmit: afterSubmit
  };
});
