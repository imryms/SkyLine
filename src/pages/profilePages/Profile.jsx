import { useEffect, useState } from "react"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/users/profile`,{
          headers: {
            Authorization:`Bareer ${token}`
          }
        })
        setUser(response.data.user)

      } catch (error) {
        console.log(error)

      }
    }
    getProfile()
  }, [])
  if (!user) return <h2 className="Loading">Loading</h2>
  return (
    <div className="profile">
      <h2>My Profile</h2>
      <p><strong>Name:</strong>  {user.fullName}</p>
      <p><strong>Email:</strong>  {user.email}</p>
      <p><strong>Phone:</strong>  {user.phoneNumber}</p>

    </div>

  )
}
export default Profile


