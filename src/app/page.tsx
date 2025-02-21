// src/app/page.tsx
import Navbar from '../../components/Navbar/navbar';
import Hero from '../../components/HomePage/homePage';
import Footer from '../../components/Footer/footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;