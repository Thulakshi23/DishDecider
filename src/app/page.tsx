// src/app/page.tsx
import Navbar from '../../components/Navbar/navbar';
import Hero from '../../components/HomePage/homePage';
import Footer from '../../components/Footer/footer';
import ImageUploader from '../../components/Imagge/ImageUploader'; // Import the ImageUploader component

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ImageUploader /> {/* Add the ImageUploader component here */}
      <Footer />
    </div>
  );
};

export default HomePage;
