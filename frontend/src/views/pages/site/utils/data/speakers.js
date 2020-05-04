import you from '../../media/images/speakers/anonymous.png';
import globals from '../globals';

/**
 * Retorna um array com os palestrantes, exemplo:
 *
 * {
 *    id: 1, //ID de controle
 *    name: '', //Nome do Palestrante
 *    talk: '', //Link da talk
 *    theme: '', //Tema da palestra
 *    videoId: '', //ID do vídeo do Youtube
 *    avatar: '', //Foto do palestrante
 *    worksIn: '', //Nome do local de trabalho
 *    worksLink: '', //URL do local de trabalho
 *    github: '' //URL do github
 * }
 */
export default [
  {
    id: 1,
    name: 'Edson Sakiyama',
    theme: 'Diretor Ministério Próximas Gerações',
    avatar: 'https://i.ytimg.com/vi/lD_XcssolD8/hqdefault.jpg',
    worksIn: 'UDF',
    worksLink: 'https://astrocoders.com',
    videoId: 'npgdgea4ueQ',
    github: 'https://github.com/fakenickels',
    isYou: false,
  },
  {
    id: 2,
    name: 'Palestrante Surpresa!',
    theme: 'Envie sua talk',
    avatar: you,
    worksIn: 'SuaEmpresa',
    worksLink: globals.contacts.github,
    talk: globals.contacts.c4p,
    github: globals.contacts.github,
    isYou: true,
  },
];
