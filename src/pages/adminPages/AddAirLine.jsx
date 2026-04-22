import './airline.css'
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
        setAirLines([...airLines, res.data])}


      setFormState(initialState)
      alert("AirLine added Successfully! ✅")
      // navigate('/manage-airLines')



    }catch(error){
      console.error("Error creating AirLine",error)
    }
  }
  return(
    <div className="addAirLinePage">

    <div className="airLineHeader">
      <h1>Add AirLine </h1>
      <p>Add AirLine information</p>
    </div>

      <form className="addForm" onSubmit={handleSubmit}>

        <div className='inputGroup'>
        <label>airLine Name: </label>
        <input
        type="text"
        name="airLineName"
        onChange={handleChange}
        value={formState.airLineName}
        autoComplete="off"/>
        </div>

        <div className='inputGroup'>
        <label>airLine Code: </label>
        <input
        type="text"
        name="airLineCode"
        onChange={handleChange}
        value={formState.airLineCode}
        autoComplete="off"/>
        </div>

        <div className='inputGroup'>
        <label>logo URL: </label>
        <input
        type="text"
        name="logoURL"
        onChange={handleChange}
        value={formState.logoURL}
        autoComplete="off"/>
        </div>

        <div className='inputGroup'>
        <label>contact Number: </label>
        <input
        type="number"
        name="contactNumber"
        onChange={handleChange}
        value={formState.contactNumber}
        autoComplete="off"/>
        </div>

      <button type="submit" onClick={()=>navigate('/manage-airLines')}>Add AirLine</button>
      </form>
    </div>
  )
}

export default AirLine
