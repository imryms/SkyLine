import './flights.css'
import { Link } from 'react-router-dom'

const Flights = ({ flights }) => {
  console.log("Flights data in component:", flights)

  // loading
  if (!flights) {
    return (
      <div className="loaderCenter">
        <div className="spinner"></div>
      </div>
    )
  }

  // no data
  if (flights.length === 0) {
    return <div className='noFlights'>No flights available 🛬</div>
  }

  return (
    <div className="flightsPage">

      <div className="flightsHeader">
        <h2>Available Flights ✈️</h2>
        <p>Choose your flight and view more details</p>
      </div>

      <div className="flightsGrid">
        {flights.map((flight) => (
          <div key={flight._id} className="flightCard">

            <div className="flightTop">
              <h3>{flight.airLineId?.airLineName || "AirLine"}</h3>
              <span className="flightNum">{flight.flightNum}</span>
            </div>

            <div className="flightRoute">
              <div className="routeBox">
                <p className="label">From</p>
                <h4>{flight.departureAirport}</h4>
                <span>{flight.departureTime}</span>
              </div>

              <div className="routeArrow">→</div>

              <div className="routeBox">
                <p className="label">To</p>
                <h4>{flight.arrivalAirport}</h4>
                <span>{flight.arrivalTime}</span>
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
