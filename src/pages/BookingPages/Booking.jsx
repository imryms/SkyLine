import { useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const Book = ({ bookings, setBookings }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const flight = location.state?.flight

  const [formState, setFormState] = useState({
    ticketType: "",
    adults: 0,
    kids: 0,
    infant: 0,
  })

  const [error, setError] = useState("")

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
        userID: localStorage.getItem("userID"),
        flightID: flight._id,
        ticketType,
        passengers,
      })

      setBookings([...bookings, response.data])

      navigate(`/booking-success/${response.data._id}`)
    } catch (error) {
      console.log(error.response?.data)
      setError(error.response?.data || "Something went wrong")
    }
  }

  return (
    <div className="booking">
      <form onSubmit={handleSubmit}>
        <h2>Book Flight ✈️</h2>

        <p>
          {flight?.departureAirport} → {flight?.arrivalAirport}
        </p>

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

        <label>Quantity:</label>

        <label>Adults:</label>
        <input
          type="number"
          name="adults"
          placeholder="Adults"
          onChange={handleChange}
        />

        <label>Kids:</label>
        <input
          type="number"
          name="kids"
          placeholder="Kids"
          onChange={handleChange}
        />

        <label>Infant:</label>
        <input
          type="number"
          name="infant"
          placeholder="Infant"
          onChange={handleChange}
        />

        <button type="submit">Book</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Book
