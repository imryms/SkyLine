import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const BookingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings/${id}`)
        setBooking(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getBooking()
  }, [id])

  if (!booking) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="booking-details">
      <h2>Booking Details ✈️</h2>

      <p>Ticket Type: {booking.ticketType}</p>

      <p>
        Passengers:
        {booking.passengers.map((p, i) => (
          <span key={i}>
            {p.type} ({p.quantity}){" "}
          </span>
        ))}
      </p>

      <p>Total Price: {booking.totalPrice} BD</p>

      <p>Status: {booking.status}</p>

      <button onClick={() => navigate("/my-bookings")}>Back</button>
    </div>
  )
}

export default BookingDetails
