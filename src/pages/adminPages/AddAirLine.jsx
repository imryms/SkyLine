import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const AirLine =({ airLines , setAirLines }) => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const initialState = {
    airLineName:"",
    airLineCode: "",
    logoURL:"",
    contactNumber:0
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) =>{
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormState({ ...formState, [event.target.name]: value})
  }

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try{
      const res = await axios.post(`${API_URL}/airLines`,formState)
      if(airLines){
        let airLinesList = [...airLines]
        airLinesList.push(res.data)
        setAirLines(airLinesList)}


      setFormState(initialState)
      navigate(`/`)
    }catch(error){
      console.error("Error creating AirLine",error)
    }
  }
  return(
    <div className="AirLins">
      <form className="AirLines-form" onSubmit={handleSubmit}>

        <label>airLine Name: </label>
        <input
        type="text"
        name="airLineName"
        onChange={handleChange}
        value={formState.airLineName}
        autoComplete="off"/>

        <label>airLine Code: </label>
        <input
        type="text"
        name="airLineCode"
        onChange={handleChange}
        value={formState.airLineCode}
        autoComplete="off"/>

        <label>logo URL: </label>
        <input
        type="text"
        name="logoURL"
        onChange={handleChange}
        value={formState.logoURL}
        autoComplete="off"/>

        <label>contact Number: </label>
        <input
        type="number"
        name="contactNumber"
        onChange={handleChange}
        value={formState.contactNumber}
        autoComplete="off"/>

      <button type="submit">Add AirLine</button>
      </form>
    </div>
  )
}

export default AirLine
