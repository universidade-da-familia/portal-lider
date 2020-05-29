/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with siteevents
 */
class SiteEventController {
  /**
   * Display a single siteevent.
   * GET siteevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show() {
    // const event_id = params.id;

    const event = {
      id: 1,
      ministery_id: 4,
      start_date: '2019-10-20 18:00:00',
      end_date: '2019-10-20 18:00:00',
      details: {
        title: 'Grupo Semanal Habitudes I',
        description:
          'Preparada ou não, a juventude atual estará no comando da sociedade em poucos anos. Os jovens e adolescentes compõem a geração mais conectada da humanidade. Porém, não são relacionais. De acordo com estudiosos, muitos sentem um vazio, um enfado pelo cotidiano, não conseguem ver o futuro com boas perspectivas, buscam sem sucesso motivos que sustentem a vida que levam. Eles necessitam urgentemente de acompanhamento, mentoreamento, orientação. O Ministério Próximas Gerações da UDF tem como objetivo ajudar pastores e líderes de jovens e adolescentes a forjar a futura geração de adultos para que sejam pessoas que tenham o caráter sólido pautado sobre princípios e valores da Palavra de Deus, aprendam a desenvolver relacionamentos saudáveis e maduros, desenvolvam suas habilidades de liderança, sejam agentes de transformação na sociedade, tornem-se profissionais competentes e que honrem ao chamado que Deus tem para a vida deles.',
        sub_description:
          '"O que fazemos hoje como adultos determinará o tipo de adulto que os adolescentes e jovens se tornarão" (Dr. Tim Elmore).',
        video: 'https://youtu.be/rLJum_LYm2M',
      },
      address: {
        name: 'Igreja Nova Vida de Jacarepaguá',
        uf: 'RJ',
        city: 'Rio de Janeiro',
        country: 'Brasil',
        cep: '21341-270',
        street: 'Rua Pinto Teles',
        street_number: '708',
        neighborhood: 'Bairro Praça Seca',
      },
      programation: [
        {
          id: 1,
          title: 'Lição 1',
          description: 'Deus trará uma solução & Deus será fiel a você',
          date: '2019-10-20 07:30:00',
        },
        {
          id: 2,
          title: 'Lição 2',
          description: 'Deus irá falar com você',
          date: '2019-10-27 07:30:00',
        },
        {
          id: 3,
          title: 'Lição 3',
          description: 'Deus irá restaurar tudo',
          date: '2019-11-03 07:30:00',
        },
        {
          id: 4,
          title: 'Lição 4',
          description: 'Os padrões divinos para mudanças',
          date: '2019-11-10 07:30:00',
        },
        {
          id: 5,
          title: 'Lição 5',
          description: 'Como entrar e sair (primeira parte)',
          date: '2019-11-17 07:30:00',
        },
        {
          id: 6,
          title: 'Lição 6',
          description: 'Como entrar e sair (segunda parte)',
          date: '2019-11-24 07:30:00',
        },
        {
          id: 7,
          title: 'Lição 7',
          description: 'A crise da meia idade',
          date: '2019-12-01 07:30:00',
        },
        {
          id: 8,
          title: 'Lição 8',
          description: 'O caminho para a vitória',
          date: '2019-12-08 07:30:00',
        },
        {
          id: 9,
          title: 'Lição 9',
          description: 'Como passar do fracasso para o sucesso',
          date: '2019-12-15 07:30:00',
        },
        {
          id: 10,
          title: 'Lição 10',
          description: 'O poder de sua confissão de fé (primeira parte)',
          date: '2019-12-22 07:30:00',
        },
        {
          id: 11,
          title: 'Lição 11',
          description: ' O poder de sua confissão de fé (segunda parte)',
          date: '2019-12-29 07:30:00',
        },
        {
          id: 12,
          title: 'Lição 12',
          description: 'Declarando a palavra de Deus',
          date: '2020-01-05 07:30:00',
        },
      ],
      organizators: [
        {
          id: 1,
          name: 'Edson Sakiyama',
          hierarchy_id: 1,
          hierarchy: 'Líder',
          theme: 'Diretor Ministério Próximas Gerações',
          avatar: 'https://i.ytimg.com/vi/lD_XcssolD8/hqdefault.jpg',
          worksIn: 'UDF',
          worksLink: 'https://astrocoders.com',
          videoId: 'npgdgea4ueQ',
          isYou: false,
        },
        {
          id: 2,
          name: 'Lucas Alves',
          hierarchy_id: 2,
          hierarchy: 'Líder em treinamento',
          theme: 'Líder em treinamento',
          avatar: 'https://avatars3.githubusercontent.com/u/46606051?s=460&v=4',
          worksIn: 'UDF',
          worksLink: 'https://astrocoders.com',
          isYou: false,
        },
      ],
      contact: {
        name: 'Edson Sakiyama',
        phone: '14 98110-7819',
        alt_phone: '14 99783-7748',
        email: 'edson.sakiyama@udf.org.br',
        facebook: 'https://www.facebook.com/edsoneiverli',
        instagram: 'https://www.instagram.com/edson.sakiyama',
      },
      files: {
        banner: 'https://i.imgur.com/x2J60hv.jpg',
        banner_mobile: 'https://i.imgur.com/CTMgviU.png',
        address:
          'https://arcowebarquivos-us.s3.amazonaws.com/imagens/52/21/arq_85221.jpg',
      },
      checkout: {
        items: [
          {
            id: 'individual',
            name_id: 'Inscrição individual',
            title: 'Incrição individual grupo semanal homem ao máximo',
            unit_price: 80,
            tangible: false,
          },
          {
            id: 'casal',
            name_id: 'Inscrição de casal',
            title: 'Incrição para casal grupo semanal homem ao máximo',
            unit_price: 110,
            tangible: false,
          },
        ],
      },
    };

    return event;
  }
}

module.exports = SiteEventController;
