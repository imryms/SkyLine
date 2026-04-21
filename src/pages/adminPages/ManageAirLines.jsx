import { Link } from 'react-router-dom'
import axios from 'axios'

const ManageAirLines = ({airLines, setAirLines}) => {
  const API_URL = import.meta.env.VITE_API_URL

  const handelDelete = async (id) =>{
    if(window .confirm ("Are you sure you want to delete this airLine? ")){
      try {
        await axios.delete(`${API_URL}/airLine/${id}`)
        const updateAirLines = airLines.filter(airline => airline._id !== id)
        setAirLines(updateAirLines)
      } catch (error) {
        console.error("Error deleting airLine: ", error)
      }
    }
  }


  return (
    <div className="AirLines">
      <div className='airLine-header'>
      <h2>Manage AirLine ⚙️</h2>
      <Link to="/add-airLine" className="add-btn">+ Add New AirLine</Link>
      </div>

      <div className='airLine-card'>
        {airLines.map((airLine)=>(
          <div key={airLine._id} className='airLine-container'>
            <div className='airLine-logo'>
              {airLine.logoURL && (
                <img src={airLine.logoURL} alt={airLine.airLineName}/>
              )}
            </div>

            <div className='airLine-info'>
              <h3>{airLine.airLineName}</h3>
              <p>ID: {airLine._id}</p>
            </div>

            <div className='actions'>
            <Link to={`/edit-airLines/${airLine._id}`} className="edit-btn">Edit🔧</Link>

            <button onClick={()=> handelDelete(airLine._id)} className='delete-btn'>Delete 🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ManageAirLines

