module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,

  options: {
    swaggerDefinition: {
      info: {
        title: 'UDF Back-end',
        version: '1.0.0',
      },

      basePath: '/',
    },
    apis: [
      'docs/**/*.yml', // load recursive all .yml file in docs directory
    ],
  },
};
