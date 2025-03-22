import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home1 from './pages/MyRoutine/Main';
import Sidebar from './pages/Sidebar';
import Foodmain from './pages/FoodRoutine/Foodmain';
import Facecaremain from './pages/FaceCare/Facecaremain';
import Exercisemain from './pages/Exercise/Exercisemain';
import Bodycaremain from './pages/Bodycare/Bodycaremain';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar is now common for all pages */}
        <div className="main-content"></div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/my-routine" element={<Home1 />} />
          <Route path="/healthy-food" element={<Foodmain />} />
          <Route path="/exercise" element={<Exercisemain /> } />
          <Route path="/faceandhair-massage" element={<Facecaremain />} />
          <Route path="/beauty-tips" element={<Bodycaremain />} />
          {/* <Route path="/settings" element={<h1>Settings</h1>} /> */}
          {/* <Route path="/login" element={<h1>Login Page</h1>} /> */}
        </Routes>
      </div>
    </Router >
  );
}

export default App;
