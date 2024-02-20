import { Header, Nav, Footer } from 'app/module/layouts/index';
import { Banner, Content } from 'app/module/pages/home/components';

const Home = () => {
  return (
    <>
      <Header />
      <Nav />
      <Banner />
      <Content />
      <Footer />
    </>
  );
};

export { Home };
