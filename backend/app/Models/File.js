/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 *  @swagger
 *  definitions:
 *    File:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        file:
 *          type: string
 *        name:
 *          type: string
 *        type:
 *          type: string
 *        url:
 *          type: string
 *      required:
 *        - file
 *        - name
 *        - type
 */
class File extends Model {
  user() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = File;
