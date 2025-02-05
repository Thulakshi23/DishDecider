import Navbar from '../../../components/Navbar/navbar'; // Adjust the path if necessary
import Admin from '../../../components/Admin/admin'; // Adjust the path if necessary
import Footer from '../../../components/Footer/footer';


const AdminPage: React.FC = () => {
  return (
    <div>      
      <Navbar />
      <Admin />
      <Footer />
    </div>
  );
};

export default AdminPage;
