import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Flights from './pages/Flights'
import FlightDetails from './pages/FlightDetails'
import Booking from './pages/Booking'
import MyBookings from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Profile from './pages/Profile'

function App() {
  const [user, setUser]=useState(null)

  useEffect(()=> {
    const token = localStorage.getItem("token")

    if(token){
      try {
        const decodedUser = jwtDecode (token)
        setUser(decodedUser)

      } catch (error) {
        console.log("Invalid token")
        localStorage.removeItem("token")
        setUser(null)
      }
    }
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/bookings" element={<Profile />} />

        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
