import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"

const EditFlight =({ flights, setFlights }) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [formData, setFormData] = useState({
    flightNum:"",
    airLineCode: "",
    departureAirport:"",
    arrivalAirport: "",
    flightDate: "",
    departureTime: "",
    arrivalTime:"",
    price:{
      firstClass:0,
      business:0,
      economy:0
    },
    availableSeats:100,
    duration:"",
    isDirect:true
  })

  useEffect(()=>{
    const fetchFlight = async()=>{
      try {
        const res = await axios.get (`${import.meta.env.VITE_API_URL}/flights/${id}`)
        const flightData = res.data
        console.log(flightData)

        const formattedDate = flightData.flightDate ? new Date(flightData.flightDate).toISOString().split('T')[0] : ""

        setFormData({
          flightNum: flightData.flightNum,
          airLineCode: flightData.airLineCode?._id || flightData.airLineCode,
          departureAirport: flightData.departureAirport,
          arrivalAirport: flightData.arrivalAirport,
          flightDate: formattedDate,
          departureTime: flightData.departureTime,
          arrivalTime: flightData.arrivalTime,
          price: {
            firstClass: flightData.price.firstClass,
            business: flightData.price.business,
            economy: flightData.price.economy
          },
          availableSeats: flightData.availableSeats,
          duration: flightData.duration,
          isDirect: flightData.isDirect
        })
      }catch(error){
        console.error("Error finding flight to edit:", error)
      }
    }
    fetchFlight()
  },[id])


  const handleChange = (event) =>{
    const { name, value, type, checked}= event.target
    const val = type === 'checkbox' ? checked : value

    if(name.includes('.')){
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]:{
          ...prev[parent],
          [child]:val
        }
      }))
    }else{
      setFormData( prev =>({...prev, [name]: val}))
    }

  }

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const res = await axios.put(`${API_URL}/flights/${id}`, formData)

      const updateFlights = flights.map(flight => flight._id !== id ? res.data :flight)
        setFlights(updateFlights)

        alert("Flight updated Successfully!")
        navigate('/manage-flights')
    } catch (error) {
      console.error("Error updating flight:", error)
    }
  }

  return(
    <div className="Flights">
      <form className="Flights-form" onSubmit={handleSubmit}>
        <h1>Edit Flight ✏️</h1>

        <label>Flight Number:</label>
        <input
        type="text"
        name="flightNum"
        onChange={handleChange}
        value={formData.flightNum}
        autoComplete="off"/>

        <label>AirLine ID:</label>
        <input
        type="text"
        name="airLineCode"
        onChange={handleChange}
        value={formData.airLineCode}
        autoComplete="off"/>

        <label>Departure Airport:</label>
        <input
        type="text"
        name="departureAirport"
        onChange={handleChange}
        value={formData.departureAirport}
        autoComplete="off"/>

        <label>Arrival Airport:</label>
        <input
        type="text"
        name="arrivalAirport"
        onChange={handleChange}
        value={formData.arrivalAirport}
        autoComplete="off"/>

        <label>Fight Date:</label>
        <input
        type="date"
        name="flightDate"
        onChange={handleChange}
        value={formData.flightDate}
        autoComplete="off"/>

        <label>Departure Time:</label>
        <input
        type="time"
        name="departureTime"
        onChange={handleChange}
        value={formData.departureTime}
        autoComplete="off"/>

        <label>Arrival Time</label>
        <input
        type="time"
        name="arrivalTime"
        onChange={handleChange}
        value={formData.arrivalTime}
        autoComplete="off"/>

        <label>First Class Price</label>
        <input
        type="number"
        name="price.firstClass"
        onChange={handleChange}
        value={formData.price.firstClass}
        autoComplete="off"/>

        <label>Business Class Price</label>
        <input
        type="number"
        name="price.business"
        onChange={handleChange}
        value={formData.price.business}
        autoComplete="off"/>

        <label>Economy Price</label>
        <input
        type="number"
        name="price.economy"
        onChange={handleChange}
        value={formData.price.economy}
        autoComplete="off"/>

        <label>Available Seats:</label>
        <input
        type="number"
        name="availableSeats"
        onChange={handleChange}
        value={formData.availableSeats}
        autoComplete="off"/>

        <label>Duration:</label>
        <input
        type="text"
        name="duration"
        onChange={handleChange}
        value={formData.duration}
        autoComplete="off"/>

        <label>Direct</label>
        <input
        type="checkbox"
        name="isDirect"
        onChange={handleChange}
        checked={formData.isDirect}
        autoComplete="off"/>

        <button type="submit">Update Flight</button>
      </form>
    </div>
  )
}

export default EditFlight
