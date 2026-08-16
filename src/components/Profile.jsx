// import { useEffect } from "react"
import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import EditProfile from "./EditProfile"

const Profile = () => {
  const data = useSelector(state => state.user)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!data?.user) {
  //     navigate("/login")
  //   }
  // }, [data])
  return (
    <div className="flex items-center justify-between">
      <EditProfile user={data?.user} />
    </div>
  )
}

export default Profile
