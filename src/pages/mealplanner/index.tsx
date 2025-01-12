import Navbar from '../../../components/Navbar/navbar'; 
import MealPlanner from '../../../components/MealPlanner/mealPlanner'; 
import Footer from '../../../components/Footer/footer';

const MealPlannerPage: React.FC = () => {
  return (
    <div>      
      <Navbar />
      <MealPlanner />
      <Footer />
    </div>
  );
};

export default MealPlannerPage;
