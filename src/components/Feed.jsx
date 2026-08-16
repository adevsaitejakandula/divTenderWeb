import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { getFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"
const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)
  console.log(feed,'feed_log')
  const fetchFeed = async () => {
    if (feed?.length) return
    try {
      const res = await axios.get(BASE_URL + "/feed",{
        withCredentials: true
      })
      dispatch(getFeed(res.data.users))
      console.log(res,'feed_res_log')
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchFeed()
  }, [])
  if (!feed) return
  if (feed?.length <= 0) return <h1 className="flex items-center justify-center">No new users Found.</h1>
  return (
    <div className="flex items-center justify-center">
      {feed?.length >0  && <UserCard user={feed[0]} />}
    </div>
  )
}

export default Feed
