import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <h1>Explore the world</h1>
      <Link to="/home"><button>Home</button></Link>
    </div>
  );
};

export default LandingPage;
