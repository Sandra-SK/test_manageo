import './App.css';
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Profil from './containers/user/profil'
import { Routes, Route } from 'react-router-dom'
import RequireDataAuth from './helpers/require-data-auth'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<RequireDataAuth child={Logout} auth={true} />} />
        <Route exact path="/" element={<RequireDataAuth child={Profil} auth={true} />} />
      </Routes>
    </div>
  );
}

export default App;
