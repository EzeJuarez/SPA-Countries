import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage';
import Home from './components/views/Home';
import Detail from './components/views/Detail';
import CreateActivity from './components/views/CreateActivity';
import ErrorPage from './components/views/ErrorPage';

import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreateActivity />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
