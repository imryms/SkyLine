import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/authPages/Login"
import Register from "./pages/authPages/Register"
import Profile from "./pages/profilePages/Profile"
import EditProfile from "./pages/profilePages/EditProfile"
import ChangePassword from "./pages/authPages/ChangePassword"
import ManageFlights from "./pages/adminPages/MangeFlights"
import ManageAirLines from "./pages/adminPages/ManageAirLines"
import FlightForm from "./pages/adminPages/AddFlight"
import AirLineForm from "./pages/adminPages/AddAirLine"
import EditFlight from "./pages/adminPages/EditFlight"
import EditAirLine from "./pages/adminPages/EditAirLine"
import ManageBookings from "./pages/adminPages/MangeBookings"
import Flights from "./pages/FlightPages/Flights"
import FlightDetails from "./pages/FlightPages/FlightDetails"
import Booking from "./pages/BookingPages/Booking"
import MyBookings from "./pages/BookingPages/MyBookings"
import BookingSuccess from "./pages/BookingPages/BookingSuccess"
import BookingDetails from "./pages/BookingPages/BookingDetails"

function App() {
  const [user, setUser] = useState(null)
  const [flights, setFlights] = useState([])
  const [airLines, setAirLines] = useState([])
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const decodedUser = jwtDecode(token)
        setUser(decodedUser)
      } catch {
        localStorage.removeItem("token")
        setUser(null)
      }
    }

    const fetchFlight = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/flights`)
      setFlights(res.data)
    }

    const fetchAirLines = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/airLines`)
      setAirLines(res.data)
    }

    fetchFlight()
    fetchAirLines()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }

  return (
    <div className="app">
      <Navbar user={user} handleLogout={handleLogout} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />

          <Route path="/profile" element={user ? <Profile /> : <Home />} />

          <Route
            path="/change-password"
            element={user ? <ChangePassword /> : <Navigate to="/" />}
          />

          <Route path="/flights" element={<Flights flights={flights} />} />
          <Route path="/flights/:id" element={<FlightDetails />} />

          <Route
            path="/manage-flights"
            element={
              <ManageFlights flights={flights} setFlights={setFlights} />
            }
          />

          <Route
            path="/add-flight"
            element={
              <FlightForm
                flights={flights}
                setFlights={setFlights}
                airLines={airLines}
              />
            }
          />

          <Route
          path="/edit-flight/:id"
          element={
            <EditFlight
              flights={flights}
              setFlights={setFlights}
              airLines={airLines}
            />
          }
        />

          <Route path="/edit-profile" element={<EditProfile />} />

          <Route
            path="/manage-airLines"
            element={
              <ManageAirLines airLines={airLines} setAirLines={setAirLines} />
            }
          />

          <Route
            path="/add-airLine"
            element={
              <AirLineForm airLines={airLines} setAirLines={setAirLines} />
            }
          />

          <Route
            path="/edit-airLines/:id"
            element={
              <EditAirLine airLines={airLines} setAirLines={setAirLines} />
            }
          />
          <Route path="/manage-bookings" element={<ManageBookings />} />

          <Route
            path="/booking/:id"
            element={
              <Booking
                bookings={bookings}
                setBookings={setBookings}
                user={user}
              />
            }
          />

          <Route path="/booking-success/:id" element={<BookingSuccess />} />
          <Route path="/my-bookings" element={<MyBookings user={user} />} />
          <Route path="/booking-details/:id" element={<BookingDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
