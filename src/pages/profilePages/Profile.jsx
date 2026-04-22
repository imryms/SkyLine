import '../../App.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/")
          }
        const response = await axios.get(`${API_URL}/users/profile`,{
          headers: {
           Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data.user)

      } catch (error) {
        console.log(error)

      }
    }
    getProfile()
  }, [navigate])
  if (!user) return <h2 className="Loading">Loading</h2>
  return (
  <div className="profilePage">

    <div className="profileHeader">
      <h1>My Profile</h1>
      <p>Your personal information</p>
    </div>

    <div className="profileContent">

      <div className="info">
        <div className="row">
          <span>Name</span>
          <p>{user.fullName}</p>
        </div>

        <div className="row">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="row">
          <span>Phone</span>
          <p>{user.phoneNumber}</p>
        </div>
      </div>


      <div className="actionsProfile">
        <Link to="/edit-profile" className="actionBtn">Edit Profile</Link>
        <Link to="/change-password" className="actionBtn lightBtn">Change Password</Link>
      </div>

    </div>

  </div>
)

}
export default Profile


