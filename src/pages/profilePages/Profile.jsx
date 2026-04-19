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
    <div className="profile">
      <h2>My Profile</h2>
      <p><strong>Name:</strong>  {user.fullName}</p>
      <p><strong>Email:</strong>  {user.email}</p>
      <p><strong>Phone:</strong>  {user.phoneNumber}</p>

    <Link to="/edit-profile">
    <button>Edit Profile</button>
    </Link>
    <Link to="/change-password">
    <button>Change Password</button>
    </Link>
    </div>


  )
}
export default Profile


