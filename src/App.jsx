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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/bookings" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
