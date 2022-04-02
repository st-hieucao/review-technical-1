import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/index'));
const Order = lazy(() => import('../pages/order/index'));

const AppRoute = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/order' component={Order} />
      </Switch>
    </Suspense>
  );
};

export default AppRoute;
