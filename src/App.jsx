import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, matchPath } from 'react-router-dom'
import axios from 'axios'

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
import ManageFlights from './pages/adminPages/MangeFlights'
import ManageAirLines from './pages/adminPages/ManageAirLines'
import EditFlight from './pages/adminPages/EditFlight'

function App() {
  const [user, setUser]=useState(null)

  const [flights, setFlights] = useState([])


  const [airLines, setAirLines] = useState([])

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

    const fetchFlight = async()=>{
      try {
        const res = await axios.get (`${import.meta.env.VITE_API_URL}/flights`)
        setFlights(res.data)
      } catch (error) {
        console.error("Error fetching flights:" ,error)
      }
    }
    fetchFlight()

    const fetchAirLines = async()=>{
      try {
        const res = await axios.get (`${import.meta.env.VITE_API_URL}/airLines`)
        setAirLines(res.data)
      } catch (error) {
        console.error("Error fetching airLines:" ,error)
      }
    }
    fetchAirLines()

  },[])
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
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
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={user? <ChangePassword/> : <Navigate to="/" />} />
        <Route path="/flights" element={<Flights flights={flights}/>} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/manage-flights" element={<ManageFlights  flights={flights}  setFlights={setFlights}/>} />
        <Route path="/add-flight" element={<FlightForm flights={flights} setFlights={setFlights}/>} />
        <Route path="/edit-flight/:id" element={<EditFlight flights={flights} setFlights={setFlights} />} />
        <Route path="/manage-airLines" element={<ManageAirLines  airLines={airLines}  setAirLines={setAirLines}/>} />
        <Route path="/add-airLine" element={<AirLineForm airLines={airLines} setFlights={setAirLines}/>} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
      </main>

      <Footer />
      </div >

  )
}

export default App
