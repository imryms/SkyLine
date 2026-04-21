import "./auth.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const API_URL = import.meta.env.VITE_API_URL

const Register = ({ setUser }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
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
      const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
      )

      const token = response.data.token
      localStorage.setItem("token", token)
      const decoded = jwtDecode(token)
      setUser(decoded)
      navigate("/")

    } catch (error) {
  console.log(error.response?.data)
  setError(error.response?.data?.msg || "Something went wrong")
}
  }

  return (
    <div className="register-page">

      <form onSubmit={handleSubmit}>
      <h2>Create an Account </h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
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

        <button type="submit">Register</button>
        <p className="switch-auth">
          Already have an account? <span onClick={()=> navigate("/login")}>Login</span>
        </p>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Register
