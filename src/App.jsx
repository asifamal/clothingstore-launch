import Countdown from './Countdown';
import IntroOverlay from './IntroOverlay';
import './index.css';

function App() {
  return (
    <>
      <IntroOverlay />
      <div className="background-wrapper">
        <img src="/bg.png" alt="City Skyline" className="background-image" />
        <div className="overlay"></div>
      </div>

      <div className="container">
        <div className="brand-name">
          NOTED.
        </div>

        <div className="subheading">
          OUR NEW COLLECTION IS LAUNCHING SOON
        </div>

        <h1 className="headline">
          The Future is Coming
        </h1>

        <Countdown />


      </div>
    </>
  );
}

export default App;
