import Topbar from '../components/Topbar';
import StoreCategories from '../components/StoreCategories';
import Deals from '../components/Deals';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Homepage = () => {
  return (
    <div>
      <Topbar />
      <StoreCategories />
      <Deals />
    </div>
  );
};

export default Homepage;
