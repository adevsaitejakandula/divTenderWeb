import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector(state => state.user)

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout" , {}, {
        withCredentials: true
      })
      navigate('/login')
      dispatch(removeUser())
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="navbar bg-neutral shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl" style={{color: 'white'}}>DevTinder</Link>
  </div>
{data?.user &&  <div className="flex gap-2">
        <div className="flex items-center justiy-center">
      <p className="text-white">Welcome {data?.user?.firstName}</p>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" >
            Profile
          </Link>
        </li>
          <li>
          <Link to="/connections" >
            Connections
          </Link>
        </li>
          <li>
          <Link to="/requests" >
            Requests
          </Link>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
  )
}

export default Navbar
