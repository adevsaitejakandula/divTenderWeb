import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({user, show=true}) => {
    const dispatch = useDispatch()
    const handleUserRequest = async (status,_id) => {
        try {
             await axios.post(`${BASE_URL}/request/send/${status}/${_id}`,{},{
                withCredentials: true
            })
            dispatch(removeUserFromFeed(_id))
        } catch(err) {
            console.log(err)
        }
    }
  return (
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user?.photoUrl}
      alt={user?.firstName + "photoUtl"} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
    <p>{user?.about}</p>
    {show && <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleUserRequest("ignored", user._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleUserRequest("interested", user._id)}>Interested</button>
    </div>}
  </div>
</div>
  )
}

export default UserCard
