import gif from '../../assets/loading.gif';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className='loading-container'>
      <p className='loading'>Loading</p>
      <img className='gif' src={gif} alt='plane' />
    </div>
  );
};

export default Loading;