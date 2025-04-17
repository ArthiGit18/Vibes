import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Home1 from "./pages/MyRoutine/Main";
import Sidebar from "./pages/Sidebar";
import Foodmain from "./pages/FoodRoutine/Foodmain";
import Facecaremain from "./pages/FaceCare/Facecaremain";
import Exercisemain from "./pages/Exercise/Exercisemain";
import Bodycaremain from "./pages/Bodycare/Bodycaremain";
import Login from "./pages/Login/LoginMain";
import EmailTest from "./pages/Login/LoginTest";
import MorningDish from "./pages/FoodRoutine/MorningDish";
import LunchDish from "./pages/FoodRoutine/LunchDish";
import DinnerDish from "./pages/FoodRoutine/DinnerDish";
import JuiceSection from "./pages/FoodRoutine/JuiceSection";
import FoodDetails from "./pages/FoodRoutine/FoodDetails";
import RecipeList from "./pages/FoodRoutine/RecipeList";
import ExercisePage from "./pages/Exercise/Exercise";

function App() {
  const [themeColor, setThemeColor] = useState({ bg: "black", text: "white" });

  return (
    <Router>
      <div className="app-container">
        <Sidebar setThemeColor={setThemeColor} /> {/* Pass function to Sidebar */}
        <div 
          className="container" 
          style={{ backgroundColor: themeColor.bg, color: themeColor.text }}
        >
          <Routes>
            <Route path="/" element={<Main />} />

            {/* /Rountine - date tracker, Daily Routine , Notes */}
            <Route path="/my-routine" element={<Home1 />} />

            {/* Food Recipe Section - Morning,  */}
            <Route path="/healthy-food" element={<Foodmain />} />
            <Route path="/healthy-food-Morn" element={<MorningDish />} />
            <Route path="/healthy-food-lunch" element={<LunchDish />} />
            <Route path="/healthy-food-dinner" element={<DinnerDish />} />
            <Route path="/healthy-food-juice" element={<JuiceSection />} />
            <Route path="/healthy-food-recipe-list" element={<RecipeList />} />
            <Route path="/healthy-food-Recipe-details/:id" element={<FoodDetails />} />


            {/*  */}
            <Route path="/exercise" element={<Exercisemain />} />
            <Route path="/exercisePage" element={<ExercisePage />} />
            <Route path="/faceandhair-massage" element={<Facecaremain />} />
            <Route path="/beauty-tips" element={<Bodycaremain />} />



            {/* Login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
