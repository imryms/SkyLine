import { Link } from 'react-router-dom'
import axios from 'axios'

const ManageFlights = ({flights, setFlights}) => {
  const API_URL = import.meta.env.VITE_API_URL

  const handelDelete = async (id) =>{
    if(window .confirm ("Are you sure you want to delete this flight? ")){
      try {
        await axios.delete(`${API_URL}/flights/${id}`)
        const updateFlights = flights.filter(f => f._id !== id)
        setFlights(updateFlights)
      } catch (error) {
        console.error("Error deleting flight: ", error)
      }
    }
  }


  return (
    <div className="Flights">
      <h2>Manage Flights 🔧</h2>
      <Link to="/add-flight" className="add-btn">+ Add New Flight</Link>
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
              <p className='price'>Price: {flight.price} BHD</p>
            </div>

            <Link to={`/edit-flight/${flight._id}`} className="edit-btn">Edit🔧</Link>
            <Link to={`/flights/${flight._id}`} className="details-btn">View Details</Link>
            <button onClick={()=> handelDelete(flight._id)} className='delete-btn'>Delete 🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ManageFlights

