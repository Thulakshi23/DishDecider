// app/page.tsx (or pages/page.tsx if using Pages Router)
import Navbar from '../../components/Navbar/navbar';
import Hero from '../../components/HomePage/homePage';  
import Footer from '../../components/Footer/footer';
// import User from '../../components/User/user';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <User /> */}
      <Footer />  


    </div>
  );
};

export default HomePage;
