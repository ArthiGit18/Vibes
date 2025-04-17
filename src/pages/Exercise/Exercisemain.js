import React, {useState, useEffect} from 'react'
import FilterSection from './FilterSection';
import './Exercise.css';

const Exercisemain = () => {

  const [showImage, setShowImage] = useState(true);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const zoomTimeout = setTimeout(() => {
      setZoomed(true);
    }, 2000); // Start zoom after 200ms

    const hideImageTimeout = setTimeout(() => {
      setShowImage(false);
    }, 2500); // Hide image after 2 seconds

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(hideImageTimeout);
    };
  }, []);

  return (
    <div>
      {showImage ? (
       <div className={`zoom-image ${zoomed ? "zoom-in" : ""}`}>
        <img src="/assets/Exercise/2.jpg" alt="Fitness Girl" />
      </div>

      ) : (
       <FilterSection />
      )};
    </div>
  )
}

export default Exercisemain