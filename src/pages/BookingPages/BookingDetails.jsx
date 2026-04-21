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

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/bookings/${id}`)
      navigate("/my-bookings")
    } catch (error) {
      console.log(error)
    }
  }

  if (!booking) return <h2>Loading...</h2>

  const flight = booking.flightID
  const basePrice = booking.pricePerTicket

  const getFactor = (type) => {
    if (type === "Kids") return 0.75
    if (type === "Infant") return 0.1
    return 1
  }

  return (
    <div className="booking-details">
      <h2>Booking Details ✈️</h2>

      {flight && (
        <>
          <p>
            Route: {flight.departureAirport} → {flight.arrivalAirport}
          </p>
          <p>Date: {new Date(flight.flightDate).toLocaleDateString()}</p>
          <p>
            Time: {flight.departureTime} - {flight.arrivalTime}
          </p>
        </>
      )}

      <p>Ticket Type: {booking.ticketType}</p>

      <div>
        {booking.passengers.map((p, i) => {
          const factor = getFactor(p.type)
          const pricePerPerson = basePrice * factor

          return (
            <div key={i}>
              {p.type} : {p.quantity}
              {p.type} : {pricePerPerson} BD × {p.quantity} ={" "}
              {Math.round(pricePerPerson * p.quantity * 100) / 100} BD
            </div>
          )
        })}
      </div>

      <p>Total Price: {booking.totalPrice} BD</p>
      <p>Status: {booking.status}</p>

      <button onClick={() => navigate("/my-bookings")}>Back</button>
      <button onClick={handleDelete}>Delete Booking</button>
    </div>
  )
}

export default BookingDetails
