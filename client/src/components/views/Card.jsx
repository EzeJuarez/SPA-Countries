import { Link } from 'react-router-dom'
import '../styles/Card.css';

const Card = ({ country }) => {
  return (
    <div className='card'>
      <Link to={`/detail/${country.id}`}>
        <img src={country.flag} alt={country.name} className='flag' />
        <span className='main'>{country.name}</span>
        <span className='text'>
          {
            country?.continents.length === 1 ? (
              country?.continents[0]
            ) : (
              `${country?.continents[0]} / ${country?.continents[1]}`
            )
          }
        </span>
      </Link>
    </div>
  );
};

export default Card;
