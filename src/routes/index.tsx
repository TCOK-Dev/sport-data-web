import { createBrowserRouter } from 'react-router-dom';
import LiveBasketball from '../pages/live-basketball/LiveBasketball';
import LiveBasketballDetail from '../pages/live-basketball/LiveBasketballDetail';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LiveBasketball />,
  },
  {
    path: '/:basketballId',
    element: <LiveBasketballDetail />,
  },
]);

export default routes;
