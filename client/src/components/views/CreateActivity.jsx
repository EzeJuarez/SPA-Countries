import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from '../../helpers/validate';
import { useFetch } from '../../hooks/useFetch';
import { createActivity } from '../../services/apiService';
import Modal from './Modal';
import '../styles/CreateActivity.css';

const CreateActivity = () => {
  const { data, loading, error } = useFetch("allCountries");
  const [ inputs, setInputs ] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: [],
    countries: [],
  });
  const [ errors, setErrors ] = useState({
    name: "Name is required",
    difficulty: "Should be a number 1-5",
    duration: "Numer most 0",
    season: "Should select at least one season",
    countries: "Should select at least one country",
  });
  const [ isOpen, setIsOpen ] = useState(false);
  const [ modal, setModal ] = useState({ isOpen: false, msg: "" });

  useEffect(() => {
    setErrors(validate(inputs));
  }, [inputs]);

  const handleInputChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectSeason = e => {
    if(e.target.checked) {
      setInputs({
        ...inputs,
        season: [...inputs.season, e.target.value],
      });
    };
    if(!e.target.checked) {
      setInputs({
        ...inputs,
        season: inputs.season.filter(season => season !== e.target.value),
      });
    };
  };

  const handleSelectCountries = e => {
    if(!inputs.countries.includes(e.target.value)) {
      setInputs({
        ...inputs,
        countries: [...inputs.countries, e.target.value],
      });
    };
    inputs.countries.sort();
  };

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  const deleteCountry = e => {
    e.preventDefault();
    const countriesFiltered = inputs.countries?.filter(country => country !== e.target.value);
    setInputs({
      ...inputs,
      countries: countriesFiltered,
    });
  };

  const handleCreate = async (e, body) => {
    e.preventDefault();
    if(Object.keys(errors).length === 0) {
      await createActivity(body);
      setInputs({
        name: "",
        difficulty: 0,
        duration: "",
        season: [],
        countries: [],
      });
      e.target.difficulty.forEach(difficulty => difficulty.checked = false);
      e.target.season.forEach(season => season.checked = false);
      e.target.countries.value = "Select countries";
      setModal({isOpen: true, msg: "Activity created succesfully"});
    } else {
      setModal({isOpen: true, msg: "Complete all"});
    };
  };

  return (
    <>
      <div className='create-content'>
        <div className='go-to-home'>
          <Link to='/'><button>Go to Home</button></Link>
        </div>
        <div className='form-create'>
          <form onSubmit={e => handleCreate(e, inputs)}>

            <div className='content-input'>
              <label>Name:</label>
              <input className='input-text' type="text" name='name' value={inputs.name} onChange={handleInputChange} />
              { errors.name ? <span className='error'>{errors.name}</span> : undefined }
            </div>

            <div className='content-input'>
              <div className='double'>

                <div className='difficulty-content'>
                  <label>Difficulty:</label>
                  <div className='radio'>
                    <section>
                      <input className='select' type="radio" name='difficulty' value={1} onChange={handleInputChange} />
                      <label className='label'>1</label>
                    </section>
                    <section>
                      <input className='select' type="radio" name='difficulty' value={2} onChange={handleInputChange} />
                      <label className='label'>2</label>
                    </section>
                    <section>
                      <input className='select' type="radio" name='difficulty' value={3} onChange={handleInputChange} />
                      <label className='label'>3</label>
                    </section>
                    <section>
                      <input className='select' type="radio" name='difficulty' value={4} onChange={handleInputChange} />
                      <label className='label'>4</label>
                    </section>
                    <section>
                      <input className='select' type="radio" name='difficulty' value={5} onChange={handleInputChange} />
                      <label className='label'>5</label>
                    </section>
                  </div>
                  { errors.difficulty ? <span className='error'>{errors.difficulty}</span> : undefined }
                </div>

                <div className='duration-content'>
                  <label>Duration:</label>
                  <div className='mins'>
                    <input className='input-number' type="number" name='duration' value={inputs.duration} onChange={handleInputChange} />
                    <span>mins'</span>
                  </div>
                  { errors.duration ? <span className='error'>{errors.duration}</span> : undefined }
                </div>

              </div>
            </div>

            <div className='content-input'>
              <label>Season:</label>
              <div className='select-season'>
                <section>
                  <input className='select' type="checkbox" name='season' value="Summer" onClick={handleSelectSeason} />
                  <label className='label'>Summer</label>
                </section>
                <section>
                  <input className='select' type="checkbox" name='season' value="Fall" onClick={handleSelectSeason} />
                  <label className='label'>Fall</label>
                </section>
                <section>
                  <input className='select' type="checkbox" name='season' value="Winter" onClick={handleSelectSeason} />
                  <label className='label'>Winter</label>
                </section>
                <section>
                  <input className='select' type="checkbox" name='season' value="Spring" onClick={handleSelectSeason} />
                  <label className='label'>Spring</label>
                </section>
              </div>
              { errors.season ? <span className='error'>{errors.season}</span> : undefined }
            </div>

            <div className='content-input'>
              <label>Countries:</label>
              <select defaultValue="Select countries" name='countries' onChange={handleSelectCountries}>
                <option value="Select countries" disabled>Select countries</option>
                {
                  loading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    data ? (
                      data?.sort((a, b) => a.name.localeCompare(b.name)).map(country => <option key={country.id} value={data.name}>{country.name}</option>)
                    ) : (
                      <option disabled>{error}</option>
                    )
                  )
                }
              </select>
              {
                errors.countries ? (
                  <span className='error'>{errors.countries}</span>
                ) : (
                  <div className='list-country'>
                    <span className='countries-count'>{`${inputs.countries.length} countries selected`}</span>
                    <button className='eye' onClick={e => openModal(e)}><i className="ti ti-eye"></i></button>
                  </div>
                )
              }
            </div>

            <div className='button-container'>
              <button>Create</button>
            </div>

          </form>
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {
          inputs.countries.length ? (
            <>
              <span className='title-modal'>Countries selected</span>
              <ul>
                {
                  inputs.countries.sort().map(country => (
                    <li key={country}>{country}
                      <button value={country} onClick={e => deleteCountry(e)}>
                        x
                      </button>
                    </li>
                  ))
                }
              </ul>
              <button className='delete-countries' onClick={() => setInputs({...inputs, countries: []})}>Delete all countries</button>
            </>
          ) : (
            <span>All countries deleted</span>
          )
        }
      </Modal>
      {
        modal.isOpen && (
          <div className='overlay'>
            <div className='content-modal'>
              <span>{ modal.msg }</span>
              <button onClick={() => setModal({isOpen: false, msg: ""})}>Close</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default CreateActivity;
