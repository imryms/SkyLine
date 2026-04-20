import { Link } from "react-router-dom";
import '../index.css'

const Home = () => {
  return (
    <div className="skyline-home">
      <section className="hero">
        <div className="hero-badge">✈ Flight Booking Platform</div>
        <h1> Fly Smart with <span>SkyLine</span> </h1>
        <p>Book flights easily and explore the world</p>
        <div>
          <Link to="/flights" className="heroButtons"> Explore Flights </Link>
        </div>
      </section>

      <section className="features">
        <div className="section-label">WHY CHOOSE US</div>
        <h2 className="section-title">Experience the Difference</h2>
        <p className="section-sub">Travel smarter with SkyLine's premium service</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Book your flights in seconds without hassle</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">🏷️</div>
            <h3>Best Prices</h3>
            <p>Find the best deals and save your money</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">⏰</div>
            <h3>Flexible Times</h3>
            <p>Choose flights that match your schedule</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
