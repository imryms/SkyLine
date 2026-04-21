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
        console.log("Error loading flight:", err)
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

    try {
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

      const response = await axios.post(`${API_URL}/bookings/create`, {
        userID: user.id,
        flightID: flightID,
        ticketType: formState.ticketType,
        passengers,
      })

      setBookings([...bookings, response.data])

      navigate(`/booking-success/${response.data._id}`)
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong")
    }
  }

  return (
    <div className="booking">
      <form onSubmit={handleSubmit}>
        <h2>Book Flight ✈️</h2>
        {flight && (
          <p className="route">
            {flight.departureAirport} → {flight.arrivalAirport}✈️
          </p>
        )}

        <label>Ticket Type:</label>
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

        <label>Adults:</label>
        <input type="number" name="adults" onChange={handleChange} />

        <label>Kids:</label>
        <input type="number" name="kids" onChange={handleChange} />

        <label>Infant:</label>
        <input type="number" name="infant" onChange={handleChange} />

        <button type="submit">Book</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Booking
