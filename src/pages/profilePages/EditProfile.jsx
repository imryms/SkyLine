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
    <div>
      <h2>Edit Profile </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditProfile
