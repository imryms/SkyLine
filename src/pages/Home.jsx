import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div className="home">

      <section className="hero">
        <h1>Fly Smart with SkyLine</h1>
        <p>Book flights easily and explore the world</p>
        <Link to="/flights">
        <button>Explore Flights</button>
        </Link>
      </section>

      <section className="features">

        <div className="featureCard">
          <h3> Easy Booking</h3>
          <p>Book your flights in seconds without hassle</p>
        </div>

        <div className="featureCard">
          <h3> Best Prices</h3>
          <p>Find the best deals and save your money</p>
        </div>

        <div className="featureCard">
          <h3> Flexible Times</h3>
          <p>Choose flights that match your schedule</p>
        </div>

      </section>

    </div>
  )
}

export default Home
