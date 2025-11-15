import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Loading from './Loading';
import '../styles/Detail.css';

const Detail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch("countryById", id);

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          error ? (
            <span>{error}</span>
          ) : (
            <>
              <div className='go-to-home'>
                <Link to='/'><button>Go to Home</button></Link>
              </div>
              <div className='detail'>
                <div className='flag-container'>
                  <img src={data?.flag} alt={data?.name} className='flag' />
                </div>

                <div className='info-container'>
                  <div>
                    <span className='name'>{data?.name}</span>
                  </div>

                  <div>
                    <span className='title'>CCA3:</span>
                    <span className='text'>{data?.id}</span>
                  </div>

                  <div>
                    <span className='title'>Capital:</span>
                    <span className='text'>{data?.capital || "None"}</span>
                  </div>

                  <div>
                    <span className='title'>Continent:</span>
                    {
                      data?.continents.length === 1 ? (
                        <span className='text'>{data?.continents[0]}</span>
                      ) : (
                        <span className='text'>{`${data?.continents[0]} / ${data?.continents[1]}`}</span>
                      )
                    }
                  </div>

                  <div>
                    <span className='title'>Subregion:</span>
                    <span className='text'>{data?.subregion || "No information"}</span>
                  </div>

                  <div>
                    <span className='title'>Area:</span>
                    <span className='text'>{data?.area}</span>
                  </div>

                  <div>
                    <span className='title'>Population:</span>
                    <span className='text'>{data?.population}</span>
                  </div>

                </div>
              </div>

              {
                !!data?.Activities?.length && (
                  <div className='table-activities'>
                    <table>
                      <thead>
                        <tr className='table-head'>
                          <th className='activity-head'>Activity</th>
                          <th className='difficulty-head'>Difficulty</th>
                          <th className='duration-head'>Duration</th>
                          <th className='season-head'>Season</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data?.Activities?.map(activity => (
                            <tr key={activity.name} className='table-body'>
                              <th className='activity'>{activity.name}</th>
                              <th className='difficulty'>{activity.difficulty}</th>
                              <th className='duration'>{`${activity.duration} minutes`}</th>
                              <th className='season'>{activity.season.map(season => <span key={season}>{`${season}`}</span>)}</th>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
              }
            </>
          )
        )
      }
    </>
  );
};

export default Detail;
