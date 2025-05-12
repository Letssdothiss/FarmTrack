import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import MyAnimals from './pages/myAnimals/MyAnimals';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return(
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected routes, requires authenticated user */}
        <Route 
          path='/my-animals' 
          element={
            <ProtectedRoute>
              <MyAnimals />
            </ProtectedRoute>
          } 
        />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;