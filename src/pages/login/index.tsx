import Navbar from '../../../components/Navbar/navbar'; // Adjust the path if necessary
import Login from '../../../components/Login/login'; // Adjust the path if necessary
import Footer from '../../../components/Footer/footer';

const LoginPage: React.FC = () => {
  return (
    <div>      
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
