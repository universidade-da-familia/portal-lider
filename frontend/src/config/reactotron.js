import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import rectotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(rectotronSaga())
    .connect();

  tron.clear();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
