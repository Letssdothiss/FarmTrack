import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import MyAnimals from './pages/myAnimals/MyAnimals';
function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-animals' element={<MyAnimals />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;