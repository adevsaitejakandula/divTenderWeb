import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormData = (value, key) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "something went wrong");
    }
  };

  const handleSignup = async () => {
      try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email: formData.email,
          password: formData.password,
          firstName: formData?.firstName,
          lastName: formData?.lastName
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message || "something went wrong");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="card bg-neutral text-neutral-content w-96 my-2">
                  <p className="flex justify-center items-center">{isLoginForm ? 'Login' : 'Signup'}</p>

        <div className="card-body items-center text-center">
            {!isLoginForm &&
                <>
                          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">First Name</legend>
            <input
              type="text"
              className="input text-black"
              value={formData?.firstName}
              onChange={(e) => handleFormData(e.target.value, "firstName")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">Password</legend>
            <input
              type="text"
              className="input text-black"
              value={formData.lastName}
              onChange={(e) => handleFormData(e.target.value, "lastName")}
            />
          </fieldset>
                </>
            }
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">Email</legend>
            <input
              type="text"
              className="input text-black"
              value={formData?.email}
              onChange={(e) => handleFormData(e.target.value, "email")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">Password</legend>
            <input
              type="text"
              className="input text-black"
              value={formData.password}
              onChange={(e) => handleFormData(e.target.value, "password")}
            />
          </fieldset>
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn" onClick={() => isLoginForm ? handleLogin() : handleSignup()}>
              Login
            </button>
          </div>
          <p onClick={() => setIsLoginForm((prev) => !prev)}>{isLoginForm ? 'New User? sign up here.' : 'Existing user ? Login here'}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
