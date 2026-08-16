import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import axios from "axios"

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector(state => state.user)
  const fetchProfile = async () => {
    if(!data?.user) return
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      dispatch(addUser(res.data.user))
    } catch(err) {
      if(err.status === 401) {
        navigate("/login")
      }
    }
  }
  useEffect(() => {
      fetchProfile()
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
