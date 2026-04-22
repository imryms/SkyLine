import "./Bookings.css"
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

  if (!booking) return <h2 className="loading">Loading...</h2>

  const flight = booking.flightID
  const basePrice = booking.pricePerTicket

  const getFactor = (type) => {
    if (type === "Kids") return 0.75
    if (type === "Infant") return 0.1
    return 1
  }

  return (
    <div className="booking-details-container">
      <div className="booking-card">
        <h2 className="title">Booking Details ✈️</h2>

        {flight && (
          <div className="flight-info">
            <p>
              Route: {flight.departureAirport} → {flight.arrivalAirport}
            </p>
            <p>Date: {new Date(flight.flightDate).toLocaleDateString()}</p>
            <p>
              Time: {flight.departureTime} - {flight.arrivalTime}
            </p>
          </div>
        )}

        <div className="section">
          <p>Ticket Type: {booking.ticketType}</p>
        </div>

        <div className="passengers-section">
          {booking.passengers.map((p, i) => {
            const factor = getFactor(p.type)
            const pricePerPerson = basePrice * factor

            return (
              <div key={i} className="passenger-row">
                <p>
                  {p.type} : {p.quantity}
                </p>
                <p>
                  {p.type} : {pricePerPerson} BD × {p.quantity} ={" "}
                  {Math.round(pricePerPerson * p.quantity * 100) / 100} BD
                </p>
              </div>
            )
          })}
        </div>

        <div className="section total">
          <p>Total Price: {booking.totalPrice} BD</p>
          <p>Status: {booking.status}</p>
        </div>

        <div className="buttons">
          <button onClick={() => navigate("/my-bookings")}>Back</button>
          <button onClick={handleDelete}>Delete Booking</button>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
