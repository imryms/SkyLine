import "./auth.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const API_URL = import.meta.env.VITE_API_URL

const Login = ({ setUser }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await axios.post(`${API_URL}/auth/login`,formData)

      const token = response.data.token
      localStorage.setItem("token", token)

      const decoded = jwtDecode(token)
      setUser(decoded)
      navigate("/")
    } catch (error) {
  console.log(error.response?.data)
  setError(error.response?.data?.msg || "Login failed")
}
  }

  return (
    <div className="loginPage">

      <form onSubmit={handleSubmit}>
      <h2>Login </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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

        <button type="submit">Login</button>
        <p className="switch-auth">
          Don't have an account? <span onClick={()=> navigate("/register")}>Register</span>
        </p>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Login
