import Navbar from '../../../components/Navbar/navbar'; // Adjust the path if necessary
import User from '../../../components/User/user'; // Ensure you're importing the UserPage component correctly
import Footer from '../../../components/Footer/footer';

const UserPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <User />
      <Footer />
    </div>
  );
};

export default UserPage;
