import "./Bookings.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const API_URL = import.meta.env.VITE_API_URL

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getBookings = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          navigate("/login")
          return
        }

        const decoded = jwtDecode(token)
        const userID = decoded.id

        const response = await axios.get(
          `${API_URL}/bookings?userID=${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setBookings(response.data)
      } catch (error) {
        console.log(error)
        if (error.response?.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
        }
      }
    }

    getBookings()
  }, [])

  return (
    <div className="myBookingsPage">
      <h2 className="pageTitle">My Bookings ✈️</h2>

      {bookings.length === 0 ? (
        <div className="emptyState">
          <p>No bookings yet</p>
        </div>
      ) : (
        <div className="bookingsGrid">
          {bookings.map((b) => (
            <div key={b._id} className="bookingsCard">
              <div className="cardHeader">
                <p className="ticketType">{b.ticketType}</p>
              </div>

              {b.flightID && (
                <div className="route">
                  <span>Route</span>
                  <p>
                    {b.flightID.departureAirport} → {b.flightID.arrivalAirport}
                  </p>
                </div>
              )}

              <div className="passengers">
                <span>Passengers</span>
                <div>
                  {b.passengers.map((p, i) => (
                    <p key={i}>
                      {p.type} ({p.quantity})
                    </p>
                  ))}
                </div>
              </div>

              <div className="total">
                <span>Total</span>
                <p>{b.totalPrice} BD</p>
              </div>

              <button
                className="detailsBtn"
                onClick={() => navigate(`/booking-details/${b._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
