import '../../App.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const EditProfile = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")

      const res = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setFormData(res.data.user)
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      await axios.put(`${API_URL}/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert("Updated Successfully")
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className="editProfilePage">

    <div className="profileHeader">
      <h1>Edit Profile</h1>
      <p>Update your personal information</p>
    </div>

    <form onSubmit={handleSubmit} className="editForm">

      <div className="inputGroup">
        <label>Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="inputGroup">
        <label>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="inputGroup">
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save Changes</button>

    </form>

  </div>
)
}

export default EditProfile
