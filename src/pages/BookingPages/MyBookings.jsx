import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings`)
        setBookings(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getBookings()
  }, [])

  return (
    <div className="my-bookings">
      <h2>My Bookings ✈️</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <p>Type: {b.ticketType}</p>

            <p>
              Passengers:{" "}
              {b.passengers.map((p, i) => (
                <span key={i}>
                  {p.type}({p.quantity}){" "}
                </span>
              ))}
            </p>

            <p>Total: {b.totalPrice} BD</p>

            <button onClick={() => navigate(`/booking-details/${b._id}`)}>
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default MyBookings
