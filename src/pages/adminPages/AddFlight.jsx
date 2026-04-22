import '../FlightPages/flights.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Flight = ({ flights, setFlights, airLines }) => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const initialState = {
    flightNum: "",
    airLineCode: "",
    departureAirport: "",
    arrivalAirport: "",
    flightDate: "",
    departureTime: "",
    arrivalTime: "",
    price: {
      firstClass: 0,
      business: 0,
      economy: 0,
    },
    availableSeats: 100,
    duration: "",
    isDirect: true,
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const val = type === "checkbox" ? checked : value

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormState((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: val,
        },
      }))
    } else {
      setFormState((prev) => ({ ...prev, [name]: val }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = await axios.post(`${API_URL}/flights`, formState)

    let flightsList = [...flights]
    flightsList.push(res.data)
    setFlights(flightsList)

    setFormState(initialState)
  }

  return (
    <div className="editFlightPage">
      <form className="createFlights-form" onSubmit={handleSubmit}>
        <div className="flightHeader">
      <h1>Create New Flight </h1>
      <p>Add Flight information</p>
    </div>

        <div  className='inputGroup'>
        <label>Flight Number:</label>
        <input
          type="text"
          name="flightNum"
          onChange={handleChange}
          value={formState.flightNum}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>AirLine Code:</label>
        <select
          name="airLineCode"
          onChange={handleChange}
          value={formState.airLineCode}
        >
          <option value="">SelectAirLine</option>
          {airLines.map((airLine) => (
            <option key={airLine._id} value={airLine._id}>
              {airLine.airLineCode}-{airLine.airLineName}
            </option>
          ))}
        </select></div>

        <div className='inputGroup'>
        <label>Departure Airport:</label>
        <input
          type="text"
          name="departureAirport"
          onChange={handleChange}
          value={formState.departureAirport}
          autoComplete="off"
        />
        </div>
        <div className='inputGroup'>
        <label>Arrival Airport:</label>
        <input
          type="text"
          name="arrivalAirport"
          onChange={handleChange}
          value={formState.arrivalAirport}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Fight Date:</label>
        <input
          type="date"
          name="flightDate"
          onChange={handleChange}
          value={formState.flightDate}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Departure Time:</label>
        <input
          type="time"
          name="departureTime"
          onChange={handleChange}
          value={formState.departureTime}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Arrival Time</label>
        <input
          type="time"
          name="arrivalTime"
          onChange={handleChange}
          value={formState.arrivalTime}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>First Class Price</label>
        <input
          type="number"
          name="price.firstClass"
          onChange={handleChange}
          value={formState.price.firstClass}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Business Class Price</label>
        <input
          type="number"
          name="price.business"
          onChange={handleChange}
          value={formState.price.business}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Economy Price</label>
        <input
          type="number"
          name="price.economy"
          onChange={handleChange}
          value={formState.price.economy}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Available Seats:</label>
        <input
          type="number"
          name="availableSeats"
          onChange={handleChange}
          value={formState.availableSeats}
          autoComplete="off"
        /></div>

        <div className='inputGroup'>
        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          onChange={handleChange}
          value={formState.duration}
          autoComplete="off"
        /></div>

        <div className='checkGroup '>
        <input
          type="checkbox"
          name="isDirect"
          onChange={handleChange}
          value={formState.isDirect}
          autoComplete="off"
        />
        <label>Direct</label>
        </div>

        <button type="submit" className='add-btn-createPage' onClick={() => navigate("/manage-flights")}>
          Add Flight
        </button>
      </form>
    </div>
  )
}

export default Flight
