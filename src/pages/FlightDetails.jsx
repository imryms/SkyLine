import './flights.css'
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
  <div className="flightDetailsPage">

    <Link to="/flights" className="backLink">← Back</Link>

    <div className="airlineHeader">
      <img
        src={flight.airLineCode?.logoURL}
        alt={flight.airLineCode?.airLineName}
        className="airlineLogo"
      />

      <h2 className="title">
        {flight.airLineCode?.airLineName }
        <span>{flight.flightNum}</span>
      </h2>
    </div>

    <div className="routeLine">
      <div>
        <p>{flight.departureAirport}</p>
        <span>{flight.departureTime}</span>
      </div>

      <div className="arrow">→</div>

<<<<<<< HEAD
      <div>
        <p>{flight.arrivalAirport}</p>
        <span>{flight.arrivalTime}</span>
=======
          <div className="spec">
            <p><strong>Duration:</strong> {flight.duration}</p>
          </div>

          <div className="spec">
            <p><strong>First Class:</strong> {flight.price?.firstClass} BHD</p>
            <p><strong>Business:</strong> {flight.price?.business} BHD</p>
            <p><strong>Economy:</strong> {flight.price?.economy} BHD</p>
          </div>

          <div className="spec">
            <p><strong>Status:</strong> {flight.isDirect ? "Direct Flight" : "Connecting Flight"}</p>
          </div>
        </div>

        <Link to={`/booking/${flight._id}`} className="book-btn">Book This Flight</Link>
>>>>>>> 957e01dce5133f0c433a2c97a6d685db6be41318
      </div>
    </div>

    <div className="infoSection">
      <p><strong>Date:</strong> {new Date(flight.flightDate).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {flight.isDirect ? "Direct" : "Connecting"}</p>
    </div>

    <div className="prices">
      <p>Economy: {flight.price?.economy} BHD</p>
      <p>Business: {flight.price?.business} BHD</p>
      <p>First: {flight.price?.firstClass} BHD</p>
    </div>

    <Link to={`/booking/${flight._id}`} className="bookBtn">
      Book Flight
    </Link>

  </div>
)
}
export default FlightDetails
