import "./flights.css"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const FlightDetails = () => {
  const { id } = useParams()
  const [flight, setFlight] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getFlight = async () => {
      try {
        const res = await axios.get(`${API_URL}/flights/${id}`)
        setFlight(res.data)
      } catch (error) {
        console.error("Error finding flight details:", error)
      }
    }
    getFlight()
  }, [id])

  if (!flight) {
    return <div className="loading">Loading Flights Details ✈️...</div>
  }

  return (
    <div className="flightDetailsPage">
      <Link to="/flights" className="backLink">
        ← Back
      </Link>

      <div className="airlineHeader">
        <img
          src={flight.airLineCode?.logoURL}
          alt={flight.airLineCode?.airLineName}
          className="airlineLogo"
        />

        <h2 className="title">
          {flight.airLineCode?.airLineName}
          <span>{flight.flightNum}</span>
        </h2>
      </div>

      <div className="routeLine">
        <div>
          <p>{flight.departureAirport}</p>
          <span>{flight.departureTime}</span>
        </div>

        <div className="arrow">→</div>

        <div>
          <p>{flight.arrivalAirport}</p>
          <span>{flight.arrivalTime}</span>
        </div>
      </div>

      <div className="infoSection">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(flight.flightDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Type:</strong> {flight.isDirect ? "Direct" : "Connecting"}
        </p>
        <p>
          <strong>Duration:</strong> {flight.duration}
        </p>
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
