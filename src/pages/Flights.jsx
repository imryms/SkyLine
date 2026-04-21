import { Link } from 'react-router-dom'


const Flights = ({flights}) => {
  console.log("Flights data in component:", flights);
  if(!flights || flights.length === 0){
    return <div className='loading'>No flights available.🛬</div>
  }

  return (
    <div className="Flights">
      <h2>Available Flights ✈️</h2>

      <div>
        {flights.map((flight)=>(
          <div key={flight._id} className='flight-card'>
            <div className='flight-header'>
              <h3>{flight.airLineId?.airLineName || "AirLine"}</h3>
              <span className='flight-num'>{flight.flightNum}</span>
            </div>
            <div className='flight-info'>
              <div className='departure'>
                <p className='city'>{flight.departureAirport}</p>
                <p className='time'>{flight.departureTime}</p>
              </div>

              <div className='arrival'>
                <p className='city'>{flight.arrivalAirport}</p>
                <p className='time'>{flight.arrivalTime}</p>
              </div>
            </div>

            <div className='flight-footer'>
              <p>Economy: {flight.price.economy} BHD</p>
              <p>Business: {flight.price.business} BHD</p>
              <p>First Class: {flight.price.firstClass} BHD</p>
            </div>

            <Link to={`/flights/${flight._id}`} className="details-btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Flights

