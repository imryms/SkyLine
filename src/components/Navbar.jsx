import {Link} from "react-router-dom"

const NavBar = ({user, handleLogout})=> {
  return (
    <nav className="navbar">
      <h2 className="logo">SkyLine</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>

        {
  user ? (
    <>
      {user.isAdmin ? (
        <Link to="/manage-flights">Manage Flights</Link>
      ) : (
        <Link to="/my-bookings">My Bookings</Link>
      )}

      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
        )
      }

      </div>
    </nav>

  )
}
export default NavBar
