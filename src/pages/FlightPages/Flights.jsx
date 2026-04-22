import "./flights.css"
import { Link } from "react-router-dom"

const Flights = ({ flights }) => {
  console.log("Flights data in component:", flights)

  if (!flights) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (flights.length === 0) {
    return <div className="noFlights">No flights available 🛬</div>
  }

  return (
    <div className="flightsPage">
      <h2 className="pageTitle">Available Flights ✈️</h2>

      <div className="flightsGrid">
        {flights.map((flight) => (
          <div key={flight._id} className="flightCard">
            <div className="cardTop">
              <div className="airline">
                <img
                  src={flight.airLineCode?.logoURL}
                  alt={flight.airLineCode?.airLineName}
                  className="airlineLogo"
                />
                <div>
                  <h3>{flight.airLineCode?.airLineName}</h3>
                  <p className="flightNumber">{flight.flightNum}</p>
                </div>
              </div>
            </div>

            <div className="routeFlights">
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

export default Flights
