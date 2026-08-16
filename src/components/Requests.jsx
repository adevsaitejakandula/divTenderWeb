import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { getRequests, removeRequest } from "../utils/requestsSlice"

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(state => state.requests)

    const fetchRequests = async () => {
        if (requests?.length) return 
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", {
                withCredentials: true
            })
            console.log(res.data.data, "requests_res_log")
            dispatch(getRequests(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return
    if (requests.length === 0) return <h1>No requests found</h1>

    const handleRequest = async (status,_id) => {
        try {
             await axios.post(`${BASE_URL}/request/review/${status}/${_id}`,{},{
                withCredentials: true
            })
            dispatch(removeRequest(_id))
        } catch(err) {
            console.log(err)
        }
    }
  return (
    <div>
      <h1>Your Requests</h1>
      {
        requests?.map((request) => {
            const {firstName, lastName, age, gender,about,photoUrl} = request.fromUserId;
            return (
                     <div key={request._id} className="flex items-center justify-center bg-neutral text-white bordrer-rounded">
                    <img className="w-20 h-20" src={photoUrl} alt={firstName + "image"} />
                    <div className="p-2">
                    <h2>{`${firstName} ${lastName}`}</h2>
                    {(age || gender) && <h2>{`${age ? age : ''} ${gender ? gender : ''}`}</h2>}
                    <h2>{about}</h2>
                    </div>
                    <div>
                              <button className="btn btn-primary mx-2" onClick={() => handleRequest("rejected", request._id)}>Reject</button>
      <button className="btn btn-secondary mx-2" onClick={() => handleRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
            )
        })
      }
    </div>
  )
}

export default Requests
