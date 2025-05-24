import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import MyAnimals from './pages/myAnimals/MyAnimals';
import CattlePage from './pages/myAnimals/CattlePage';
import GoatPage from './pages/myAnimals/GoatPage';
import PoultryPage from './pages/myAnimals/PoultryPage';
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
        <Route 
          path='/my-animals/cattle' 
          element={
            <ProtectedRoute>
              <CattlePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/my-animals/goat' 
          element={
            <ProtectedRoute>
              <GoatPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/my-animals/poultry' 
          element={
            <ProtectedRoute>
              <PoultryPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;