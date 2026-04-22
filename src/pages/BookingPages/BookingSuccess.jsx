import "./Bookings.css"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const BookingSuccess = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [booking, setBooking] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings/${id}`)
        setBooking(response.data)
      } catch (err) {
        setError("No Booking Found")
      }
    }

    getBooking()
  }, [id])

  if (!booking) {
    return (
      <div className="noBookingPage">
        <h2>{error || "Loading..."}</h2>
        <p>
          It looks like you haven’t made any booking yet. Start now and enjoy
          your experience.
        </p>
        <button className="primaryBtn" onClick={() => navigate("/")}>
          Book Now
        </button>
      </div>
    )
  }

  return (
    <div className="bookingPage">
      <div className="successCard">
        <h1 className="successTitle">Thank You for Your Booking ✈️</h1>

        <div className="detailsBox">
          <div className="detailRow">
            <span>Flight</span>
            <p>
              {booking.flightID?.departureAirport} →{" "}
              {booking.flightID?.arrivalAirport}
            </p>
          </div>

          <div className="detailRow">
            <span>Ticket Type</span>
            <p className="tag">{booking.ticketType}</p>
          </div>

          <div className="detailRow">
            <span>Passengers</span>
            <div className="passengersList">
              {booking.passengers.map((p, i) => (
                <p key={i}>
                  {p.type}: {p.quantity}
                </p>
              ))}
            </div>
          </div>

          <div className="detailRow total">
            <span>Total Price</span>
            <p>{booking.totalPrice} BHD</p>
          </div>
        </div>

        <div className="actionsBook">
          <button className="primaryBtn" onClick={() => navigate("/")}>
            Back to Home
          </button>

          <button
            className="secondaryBtn"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess
