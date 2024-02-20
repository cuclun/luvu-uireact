import { Router, Route, Switch } from 'react-router-dom';
import { Home, Collection, Product, Admin, Cart, Pay, ThankYou, NotFound, Search, AboutUs, Address, Blog } from 'app/module/pages';
import { AdminCollection, Login, AdminProduct, AdminBill, AdminAccount, Forbidden, AdminBanner, AdminImage } from 'app/module/pages/admin/pages';
import { RoutesUser } from 'app/constant';
import history from 'app/services/history';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={RoutesUser.Home} component={Home} />
        <Route exact path={RoutesUser.Collection} component={Collection} />
        <Route exact path={RoutesUser.Product} component={Product} />
        <Route exact path={RoutesUser.Cart} component={Cart} />
        <Route exact path={RoutesUser.Pay} component={Pay} />
        <Route exact path={RoutesUser.ThankYou} component={ThankYou} />
        <Route exact path={RoutesUser.Search} component={Search} />
        <Route exact path={RoutesUser.AboutUs} component={AboutUs} />
        <Route exact path={RoutesUser.Address} component={Address} />
        <Route exact path={RoutesUser.Blog} component={Blog} />

        <Route exact path={RoutesUser.Admin} component={Admin} />
        <Route exact path={RoutesUser.AdminDashboard} component={Admin} />
        <Route exact path={RoutesUser.AdminLogin} component={Login} />
        <Route exact path={RoutesUser.AdminCollection} component={AdminCollection} />
        <Route exact path={RoutesUser.AdminImage} component={AdminImage} />
        <Route exact path={RoutesUser.AdminBanner} component={AdminBanner} />
        <Route exact path={RoutesUser.AdminProduct} component={AdminProduct} />
        <Route exact path={RoutesUser.AdminBill} component={AdminBill} />
        <Route exact path={RoutesUser.AdminAccount} component={AdminAccount} />
        <Route exact path={RoutesUser.Forbidden} component={Forbidden} />

        <Route exact path={RoutesUser.PageNotFound} component={NotFound} />
      </Switch>
    </Router>
  );
};

export { Routes };
