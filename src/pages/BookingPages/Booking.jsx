import "./Bookings.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const Booking = ({ bookings, setBookings, user }) => {
  const navigate = useNavigate()
  const { id: flightID } = useParams()

  const [flight, setFlight] = useState(null)

  const [formState, setFormState] = useState({
    ticketType: "",
    adults: 0,
    kids: 0,
    infant: 0,
  })

  const [error, setError] = useState("")

  useEffect(() => {
    const getFlight = async () => {
      try {
        const res = await axios.get(`${API_URL}/flights/${flightID}`)
        setFlight(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getFlight()
  }, [flightID])

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const passengers = [
      { type: "Adults", quantity: Number(formState.adults) },
      { type: "Kids", quantity: Number(formState.kids) },
      { type: "Infant", quantity: Number(formState.infant) },
    ].filter((p) => p.quantity > 0)

    if (passengers.length === 0) {
      setError("Add at least one passenger")
      return
    }

    if (!formState.ticketType) {
      setError("Select ticket type")
      return
    }

    try {
      const response = await axios.post(`${API_URL}/bookings/create`, {
        userID: user.id,
        flightID,
        ticketType: formState.ticketType,
        passengers,
      })

      setBookings([...bookings, response.data])
      navigate(`/booking-success/${response.data._id}`)
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong")
    }
  }

  if (!flight) {
    return (
      <div className="bookingLoading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="bookingPage">
      <div className="bookingCards">
        <h2 className="bookingTitle">Book Flight ✈️</h2>

        <div className="flightInfo">
          <p>
            {flight.departureAirport} → {flight.arrivalAirport}
          </p>
          <span>
            {flight.departureTime} - {flight.arrivalTime}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bookingForm">
          <div className="formGrid">
            <div className="formFull">
              <label>Ticket Type</label>
              <select
                name="ticketType"
                value={formState.ticketType}
                onChange={handleChange}
              >
                <option value="">Select Ticket Type</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div>
              <label>Adults</label>
              <input type="number" name="adults" onChange={handleChange} />
            </div>

            <div>
              <label>Kids</label>
              <input type="number" name="kids" onChange={handleChange} />
            </div>

            <div>
              <label>Infant</label>
              <input type="number" name="infant" onChange={handleChange} />
            </div>

            <div className="formFull">
              <button type="submit" className="bookBtn">
                Confirm Booking
              </button>
            </div>
          </div>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Booking
