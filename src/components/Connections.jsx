import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {getConnections} from '../utils/connectionsSlice'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((state) => state.connections);
    const fetchConnectionsData = async () => {
        if (connections?.length) return
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            })
            console.log(res.data.data, "connections_res_log")
            dispatch(getConnections(res.data.data))
        } catch(err) {
            console.log(err)
        }
    }
console.log(connections, 'connections_log')
    useEffect(() => {
        fetchConnectionsData()
    }, [])
    if (!connections) return
    if (connections?.length === 0) return <h1>No Connections Found</h1>
  return (
    <div>
      <h1>Connections</h1>
      {
        connections?.map((connection) => {
            const {photoUrl , firstName, lastName, age,gender, about, _id} = connection 
            return (
                <div key={_id} className="flex items-center justify-center bg-neutral text-white bordrer-rounded">
                    <img className="w-20 h-20" src={photoUrl} alt={firstName + "image"} />
                    <div className="p-2">
                    <h2>{`${firstName} ${lastName}`}</h2>
                    {(age || gender) && <h2>{`${age ? age : ''} ${gender ? gender : ''}`}</h2>}
                    <h2>{about}</h2>
                    </div>
                    </div>
            )
        })
      }
    </div>
  )
}

export default Connections
