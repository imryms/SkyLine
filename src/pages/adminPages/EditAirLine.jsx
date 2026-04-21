import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"

const EditAirLine =({ airLines, setAirLines }) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [formData, setFormData] = useState({
    airLineName:"",
    airLineCode: "",
    logoURL:"",
    contactNumber:0
  })

  useEffect(()=>{
    const fetchAirLine = async()=>{
      try {
        const res = await axios.get (`${import.meta.env.VITE_API_URL}/airLines/${id}`)
        const airLineData = res.data
        console.log(airLineData)

        setFormData({
          airLineName:airLineData.airLineName,
          airLineCode:airLineData.airLineCode,
          logoURL:airLineData.logoURL,
          contactNumber:airLineData.contactNumber
        })
      }catch(error){
        console.error("Error finding airLine to edit:", error)
      }
    }
    fetchAirLine()
  },[id])


  const handleChange = (event) =>{
    const {name, value, type, checked} = event.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value})
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const res = await axios.put(`${API_URL}/airLines/${id}`, formData)

      const updateAirLines = airLines.map(airLine => airLine._id
        === id ? res.data :airLine)
        setAirLines(updateAirLines)

        alert("airLine updated Successfully!")
        navigate('/manage-airLines')
    } catch (error) {
      console.error("Error updating airLine:", error)
    }
  }

  return(
    <div className="AirLines">
      <form className="AirLines-form" onSubmit={handleSubmit}>
        <h1>Edit AirLine ✏️</h1>

        <label>airLine Name: </label>
        <input
        type="text"
        name="airLineName"
        onChange={handleChange}
        value={formData.airLineName}
        autoComplete="off"/>

        <label>airLine Code: </label>
        <input
        type="text"
        name="airLineCode"
        onChange={handleChange}
        value={formData.airLineCode}
        autoComplete="off"/>

        <label>logo URL: </label>
        <input
        type="text"
        name="logoURL"
        onChange={handleChange}
        value={formData.logoURL}
        autoComplete="off"/>

        <label>contact Number: </label>
        <input
        type="number"
        name="contactNumber"
        onChange={handleChange}
        value={formData.contactNumber}
        autoComplete="off"/>


        <button type="submit">Update AirLines</button>
      </form>
    </div>
  )
}

export default EditAirLine
