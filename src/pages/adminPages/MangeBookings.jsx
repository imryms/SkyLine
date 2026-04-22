import "../BookingPages/Bookings.css"

import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings`)
        setBookings(response.data)
      } catch (error) {
        console.log("error:", error)
      }
    }
    fetchBookings()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${API_URL}/bookings/${id}`)
        setBookings((prev) => prev.filter((b) => b._id !== id))
      } catch (error) {
        console.error("Error deleting booking: ", error)
      }
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/bookings/${id}/status`, {
        status,
      })

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: response.data.status } : b
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="managePage">
      <h2 className="manageTitle">Manage Bookings</h2>

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Flight</th>
              <th>Ticket Type</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userID?.fullName}</td>

                <td>
                  {booking.flightID?.departureAirport} →{" "}
                  {booking.flightID?.arrivalAirport}
                </td>

                <td>{booking.ticketType}</td>

                <td>{booking.totalPrice} BD</td>

                <td>
                  <select
                    className={`status ${booking.status}`}
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings
