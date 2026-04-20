import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Flights from './pages/Flights'
import FlightDetails from './pages/FlightDetails'
import Booking from './pages/Booking'
import MyBookings from './pages/profilePages/Profile'
import Login from './pages/authPages/Login'
import Register from './pages/authPages/Register'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import FlightForm from './pages/adminPages/AddFlight'
import AirLineForm from './pages/adminPages/AddAirLine'
import Profile from './pages/profilePages/Profile'
import EditProfile from './pages/profilePages/EditProfile'
import ChangePassword from './pages/authPages/ChangePassword'

import { Navigate } from 'react-router-dom'

function App() {
  const [user, setUser]=useState(null)

  const [flights, setFlights] = useState([])

  const [airLins, setAirLines] = useState([])

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
      <div className="app">
      <Navbar user={user} handleLogout={handleLogout} />
      <main className="content">


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile /> : <Home />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={user? <ChangePassword/> : <Navigate to="/" />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/add-flight" element={<FlightForm flights={flights} setFlights={setFlights}/>} />
        <Route path="/add-airLin" element={<AirLineForm airLines={airLins} setFlights={setAirLines}/>} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
      </main>

      <Footer />
      </div >
    </>
  )
}

export default App
