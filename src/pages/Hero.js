import React from "react";
// import BlossomingFlowers from "./Blooming/Blooming";
import Banner from "./Banner";

const Hero = () => {
  // const [showFlowers, setShowFlowers] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowFlowers(false);
  //   }, 7000); // Show BlossomingFlowers for 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  return <div>
    <Banner />
    {/* {showFlowers ? <BlossomingFlowers /> : <Banner />} */}
  </div>;
};

export default Hero;
