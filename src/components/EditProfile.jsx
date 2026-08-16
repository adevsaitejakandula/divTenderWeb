import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    skills: user?.skills || "",
    about: user?.about || "",
    photoUrl: user?.photoUrl || "",
    gender: user?.gender || "",
  });
  const [error, setError] = useState("");
  const handleChange = (value, key) => {
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const onUpdateProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", userData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
      setError("");
    } catch (err) {
      console.log(err.response?.data);
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="mx-5">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input"
            placeholder="first name"
            value={userData?.firstName}
            onChange={(e) => handleChange(e.target.value, "firstName")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input"
            placeholder="last name"
            value={userData?.lastName}
            onChange={(e) => handleChange(e.target.value, "lastName")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">age</legend>
          <input
            type="text"
            className="input"
            placeholder="age"
            value={userData?.age}
            onChange={(e) => handleChange(e.target.value, "age")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Photo URL</legend>
          <input
            type="text"
            className="input"
            placeholder="photo url"
            value={userData?.photoUrl}
            onChange={(e) => handleChange(e.target.value, "photoUrl")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input"
            placeholder="gender"
            value={userData?.gender}
            onChange={(e) => handleChange(e.target.value, "gender")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <input
            type="text"
            className="input"
            placeholder="about"
            value={userData?.about}
            onChange={(e) => handleChange(e.target.value, "about")}
          />
        </fieldset>
        {error && <p className="text-error">{error}</p>}
        <button className="btn btn-primary my-2" onClick={onUpdateProfile}>
          Update Profile
        </button>
      </div>
      <div>
        <UserCard user={userData} show={false} />
      </div>
    </div>
  );
};

export default EditProfile;
