import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Flight =({ flights, setFlights, airLines }) => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const initialState = {
    flightNum:"",
    airLineId: "",
    departureAirport:"",
    arrivalAirport: "",
    flightDate: "",
    departureTime: "",
    arrivalTime:"",
    price:50,
    availableSeats:100,
    duration:"",
    isDirect:true
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) =>{
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormState({ ...formState, [event.target.name]: value})
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()

    const res = await axios.post(`${API_URL}/flights`,formState)

    let flightsList = [...flights]
    flightsList.push(res.data)
    setFlights(flightsList)


  setFormState(initialState)
  navigate(`/`)
  }

  return(
    <div className="Flights">
      <form className="Flights-form" onSubmit={handleSubmit}>
        <h1>Create New Flight ✈️</h1>

        <label>Flight Number:</label>
        <input
        type="text"
        name="flightNum"
        onChange={handleChange}
        value={formState.flightNum}
        autoComplete="off"/>

        <label>AirLine Code:</label>
        <select
        name="airLineCode"
        onChange={handleChange}
        value={formState.airLineCode}>
          <option value="">SelectAirLine</option>
          {airLines.map((airLine)=>(<option key={airLine._id} value={airLine._id}>{airLine.airLineCode}-{airLine.airLineName}</option>))}
        </select>


        <label>Departure Airport:</label>
        <input
        type="text"
        name="departureAirport"
        onChange={handleChange}
        value={formState.departureAirport}
        autoComplete="off"/>

        <label>Arrival Airport:</label>
        <input
        type="text"
        name="arrivalAirport"
        onChange={handleChange}
        value={formState.arrivalAirport}
        autoComplete="off"/>

        <label>Fight Date:</label>
        <input
        type="date"
        name="flightDate"
        onChange={handleChange}
        value={formState.flightDate}
        autoComplete="off"/>

        <label>Departure Time:</label>
        <input
        type="time"
        name="departureTime"
        onChange={handleChange}
        value={formState.departureTime}
        autoComplete="off"/>

        <label>Arrival Time</label>
        <input
        type="time"
        name="arrivalTime"
        onChange={handleChange}
        value={formState.arrivalTime}
        autoComplete="off"/>

        <label>Price</label>
        <input
        type="Number"
        name="price"
        onChange={handleChange}
        value={formState.price}
        autoComplete="off"/>

        <label>Available Seats:</label>
        <input
        type="number"
        name="availableSeats"
        onChange={handleChange}
        value={formState.availableSeats}
        autoComplete="off"/>

        <label>Duration:</label>
        <input
        type="text"
        name="duration"
        onChange={handleChange}
        value={formState.duration}
        autoComplete="off"/>

        <label>Direct</label>
        <input
        type="checkbox"
        name="isDirect"
        onChange={handleChange}
        value={formState.isDirect}
        autoComplete="off"/>

        <button type="submit">Add Flight</button>
      </form>
    </div>
  )
}

export default Flight
