import Hero from './Hero';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import Subscribe from './Subscribe';

const Home = () => {
  return (
    <>
      <Navbar />
      <Subscribe />
      <Hero />
      <p>Some services</p>
      <p>Devices</p>
      <p>Get doing</p>
      <QuickLinks />
      <p>Search</p>
      <p>Favs</p>
      <p>Footer</p>
    </>
  );
};

export default Home;
