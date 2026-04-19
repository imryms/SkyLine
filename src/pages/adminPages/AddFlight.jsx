import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Flight =({ flights, setFlights }) => {
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

  const [fromState, setFormState] = useState(initialState)

  const handleChange = (event) =>{
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormState({ ...fromState, [event.target.name]: value})
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()

    const res = await axios.post(`${API_URL}/flights`,fromState)

    let flightsList = [...flights]
    flightsList.push(res.data)
    setFlights(flightsList)


  setFormState(initialState)
  navigate(`/flights/${res.data._id}`)
  }

  return(
    <div classNme="Flights">
      <form className="Flights-form" onSubmit={handleSubmit}>
        <h1>Create New Flight ✈️</h1>

        <label>Flight Number:</label>
        <input
        type="text"
        name="flightNum"
        onChange={handleChange}
        value={fromState.flightNum}
        autoComplete="off"/>

        <label>AirLine ID:</label>
        <input
        type="text"
        name="airLineId"
        onChange={handleChange}
        value={fromState.airLineId}
        autoComplete="off"/>

        <label>Departure Airport:</label>
        <input
        type="text"
        name="departureAirport"
        onChange={handleChange}
        value={fromState.departureAirport}
        autoComplete="off"/>

        <label>Arrival Airport:</label>
        <input
        type="text"
        name="arrivalAirport"
        onChange={handleChange}
        value={fromState.arrivalAirport}
        autoComplete="off"/>

        <label>Fight Date:</label>
        <input
        type="date"
        name="flightDate"
        onChange={handleChange}
        value={fromState.flightDate}
        autoComplete="off"/>

        <label>Departure Time:</label>
        <input
        type="time"
        name="departureTime"
        onChange={handleChange}
        value={fromState.departureTime}
        autoComplete="off"/>

        <label>Arrival Time</label>
        <input
        type="time"
        name="arrivalTime"
        onChange={handleChange}
        value={fromState.arrivalTime}
        autoComplete="off"/>

        <label>Price</label>
        <input
        type="Number"
        name="price"
        onChange={handleChange}
        value={fromState.price}
        autoComplete="off"/>

        <label>Available Seats:</label>
        <input
        type="number"
        name="availableSeats"
        onChange={handleChange}
        value={fromState.availableSeats}
        autoComplete="off"/>

        <label>Duration:</label>
        <input
        type="text"
        name="duration"
        onChange={handleChange}
        value={fromState.duration}
        autoComplete="off"/>

        <label>Direct</label>
        <input
        type="checkbox"
        name="isDirect"
        onChange={handleChange}
        value={fromState.isDirect}
        autoComplete="off"/>

        <button type="submit">Add Flight</button>
      </form>
    </div>
  )
}

export default Flight
