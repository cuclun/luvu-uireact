const Home = '/home';
const Product = '/product/:id';
const Collection = '/collection/:id';
const AboutUs = '/about-us';
const Cart = '/cart';
const Pay = '/pay';
const ThankYou = '/pay-success';
const Address = '/address';
const Blog = '/blog';
const SearchParam = '/search?keyword=:keyword';
const Search = '/search';
const Admin = '/admin';
const AdminDashboard = '/admin/dashboard';
const AdminLogin = '/admin/login';
const AdminCollection = '/admin/collection';
const AdminProduct = '/admin/product';
const AdminImage = '/admin/image';
const AdminBanner = '/admin/banner';
const AdminBill = '/admin/bill';
const AdminAccount = '/admin/account';
const PageNotFound = '*';
const Forbidden = '/admin/403';

export const RoutesUser = {
  PageNotFound,
  Home,
  Product,
  Collection,
  Address,
  AboutUs,
  Blog,
  Cart,
  Pay,
  Admin,
  AdminDashboard,
  AdminLogin,
  AdminCollection,
  AdminBanner,
  AdminImage,
  AdminAccount,
  AdminProduct,
  AdminBill,
  ThankYou,
  Search,
  SearchParam, Forbidden
};
