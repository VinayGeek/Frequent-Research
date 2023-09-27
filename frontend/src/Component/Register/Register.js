import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { toast } from "react-hot-toast";
import "./Register.css";
import { backendUrl } from "../../Endpoints/Endpoint";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "other",
    dob: "",
    age: 0,
  });

  const [apiData, setApiData] = useState({
    cityArr: [],
    stateArr: [],
    countryArr: [],
  });

  const commonAxios = (url, stateObj, id = "") => {
    Axios.get(`${backendUrl}${url}?id=${id}`)
      .then((res) => {
        setApiData({ ...apiData, [stateObj]: res?.data?.data });
        console.log("object");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    commonAxios("country/get-all-country", "countryArr");
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "firstName" || e.target.name == "lastName") {
      let newVal = /^[a-zA-Z]+$/.test(e?.target?.value);
      if (newVal) setData({ ...data, [e.target.name]: e?.target?.value });
    } else if (e.target.name == "dob") {
      let newAge = new Date().getFullYear() - new Date(data?.dob).getFullYear();
      setData({ ...data, [e.target.name]: e?.target?.value, age: newAge });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      if (e.target.name == "country" && e.target.value) {
        commonAxios("state/get-all-state", "stateArr", e.target.value);
      } else if (e.target.name == "state" && e.target.value) {
        commonAxios("city/get-all-city", "cityArr", e.target.value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
      }
      if (!isValidEmail(data.email)) {
        toast.error("invalid email");
      } else {
        const response = await Axios.post(
          `${backendUrl}user/register-user`,
          data
        );

        if (response.status === 201) {
          toast.success(response.data.message);
          setData({
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            state: "",
            city: "",
            gender: "",
            dob: null,
            age: null,
          });
        } else {
          toast.error("Registration failed!");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={(e) => handleChange(e)}
            value={data.firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={(e) => handleChange(e)}
            value={data.lastName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => handleChange(e)}
            value={data.email}
          />
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            required
            onChange={(e) => handleChange(e)}
            value={data.country}
          >
            <option value="">{"select country"}</option>
            {apiData?.countryArr.map((d, i) => (
              <React.Fragment key={i}>
                <option value={d?._id}>{d?.name}</option>
              </React.Fragment>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            required
            onChange={(e) => handleChange(e)}
            value={data.state}
          >
            <option value="">{"select state"}</option>
            {apiData?.stateArr.map((d, i) => (
              <React.Fragment key={i}>
                <option value={d?._id}>{d?.name}</option>
              </React.Fragment>
            ))}
          </select>
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            required
            onChange={(e) => handleChange(e)}
            value={data.city || "USA"}
          >
            <option value="">{"select city"}</option>
            {apiData?.cityArr.map((d, i) => (
              <React.Fragment key={i}>
                <option value={d?._id}>{d?.name}</option>
              </React.Fragment>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            required
            onChange={(e) => handleChange(e)}
            value={data.gender || "other"}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="dob">Date of Birth</label>

          <input
            type="datetime-local"
            min="1970-01-01T00:00"
            max="2009-09-28T00:00"
            id="dob"
            name="dob"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" required value={data.age} />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
