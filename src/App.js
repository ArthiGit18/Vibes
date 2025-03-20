import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home1 from './pages/MyRoutine/Main';
import Sidebar from './pages/Sidebar';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar is now common for all pages */}
        <div className="main-content"></div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/my-routine" element={<Home1 />} />
          {/* <Route path="/healthy-food" element={<h1>Healthy Food</h1>} /> */}
          {/* <Route path="/exercise" element={<h1>Exercise</h1>} /> */}
          {/* <Route path="/face-massage" element={<h1>Face Massage</h1>} /> */}
          {/* <Route path="/beauty-tips" element={<h1>Beauty Tips</h1>} /> */}
          {/* <Route path="/settings" element={<h1>Settings</h1>} /> */}
          {/* <Route path="/login" element={<h1>Login Page</h1>} /> */}
        </Routes>
      </div>
    </Router >
  );
}

export default App;
