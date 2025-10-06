import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className='header'>
      <span className='logo'>Countries App</span>
      <Link to='/create'><button>Create activity</button></Link>
    </header>
  );
};

export default Header;
