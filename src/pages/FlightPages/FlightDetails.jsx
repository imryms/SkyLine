import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"

const FlightDetails = () => {
  const {id} = useParams()
  const [flight, setFlight] =useState(null)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect (()=>{
      const getFlight = async ()=>{
        try {
          const res = await axios.get(`${API_URL}/flights/${id}`)
          setFlight(res.data)
        } catch (error) {
          console.error("Error finding flight details:", error)
    }}
    getFlight()
  },[id])

  if(!flight){
    return(
      <div className="loading">Loading Flights Details✈️...</div>)
  }
  return (
    <div className="flights-details">
      <h2>Flight Details ✈️: </h2>
      <Link to="/flights" className="back-link">←Back to Flights</Link>

      <div className="details-card">
        <div className="details-header">
          <h1>{flight.airLinId?.airLinName}</h1>
          <img src={flight.airLinId?.logoURL} alt="AirLine Logo" className="airLine-logo-size" />
        </div>

        <div className="space=grid">
          <div className="spec">
            <p><strong>Flight Number:</strong> {flight.flightNum}</p>
          </div>

          <div className="spec">
            <p><strong>Route:</strong> {flight.departureAirport} → {flight.arrivalAirport}</p>
          </div>

          <div className="spec">
            <p><strong>Date:</strong> {new Date(flight.flightDate).toLocaleDateString()}</p>
          </div>

          <div className="spec">
            <p><strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}</p>
          </div>

          <div className="spec">
            <p><strong>Price:</strong> {flight.price} BHD</p>
          </div>

          <div className="spec">
            <p><strong>Status:</strong> {flight.isDirect ? "Direct Flight" : "Connecting Flight"}</p>
          </div>
        </div>

        <Link to={`/booking/${flight._id}`} className="book-btn">Book This Flight</Link>
      </div>
    </div>
  )
}
export default FlightDetails
