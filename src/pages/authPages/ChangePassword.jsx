import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

const ChangePassword = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")

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

      await axios.put(
        `${API_URL}/auth/updatePassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Password updated Successfully")
      navigate("/profile")

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.msg || "Error updating password")
    }
  }

return (
  <div className="changePassword">
    <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>

      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        value={formData.oldPassword}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Update Password</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  </div>
)
}

export default ChangePassword
