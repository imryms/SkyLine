<<<<<<< HEAD
import './flights.css'
import { Link } from 'react-router-dom'

const Flights = ({ flights }) => {
  console.log("Flights data in component:", flights)

  if (!flights) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
=======
import { Link } from "react-router-dom"

const Flights = ({ flights }) => {
  console.log("Flights data in component:", flights)
  if (!flights || flights.length === 0) {
    return <div className="loading">No flights available.🛬</div>
>>>>>>> 957e01dce5133f0c433a2c97a6d685db6be41318
  }

  if (flights.length === 0) {
    return <div className="noFlights">No flights available 🛬</div>
  }

<<<<<<< HEAD
return (
  <div className="flightsPage">
    <h2 className="pageTitle">Available Flights ✈️</h2>

    <div className="flightsGrid">
      {flights.map((flight) => (
        <div key={flight._id} className="flightCard">

          <div className="cardTop">
            <div className="airline">
              <img
                src={flight.airLineCode?.logoURL }
                alt={flight.airLineCode?.airLineName}
                className="airlineLogo"
              />
              <div>
                <h3>{flight.airLineCode?.airLineName }</h3>
                <p className="flightNumber">{flight.flightNum}</p>
              </div>
            </div>
          </div>

          <div className="route">
            <div className="place">
              <span>From</span>
              <h4>{flight.departureAirport}</h4>
              <p>{flight.departureTime}</p>
            </div>

            <div className="arrow">→</div>

            <div className="place">
              <span>To</span>
              <h4>{flight.arrivalAirport}</h4>
              <p>{flight.arrivalTime}</p>
            </div>
          </div>

          <Link to={`/flights/${flight._id}`} className="detailsBtn">
            View Details
          </Link>

        </div>
      ))}
    </div>
  </div>
)
}

=======
      <div>
        {flights.map((flight) => (
          <div key={flight._id} className="flight-card">
            <div className="flight-header">
              <h3 className="flight-num">{flight.flightNum}</h3>
            </div>
            <div className="flight-info">
              <div className="departure">
                <p className="city">
                  Departure Airport : {flight.departureAirport}
                </p>
                <p className="date">
                  Date : {new Date(flight.flightDate).toLocaleDateString()}
                </p>
                <p className="time">{flight.departureTime}</p>
              </div>

              <div className="arrival">
                <p className="city">{flight.arrivalAirport}</p>
                <p className="time">{flight.arrivalTime}</p>
              </div>
            </div>

            <div className="flight-footer">
              <p>Economy: {flight.price.economy} BHD</p>
              <p>Business: {flight.price.business} BHD</p>
              <p>First Class: {flight.price.firstClass} BHD</p>
            </div>

            <Link to={`/flights/${flight._id}`} className="details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
>>>>>>> 957e01dce5133f0c433a2c97a6d685db6be41318
export default Flights
