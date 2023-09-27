import React, { useEffect, useState } from "react";
import "./Userlist.css";
import Axios from "axios";
import { backendUrl } from "../../Endpoints/Endpoint";

const Userlist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`${backendUrl}user/get-all-user`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <div className="containerr mt-5">
      <h1>Users Table</h1>
      <table className="table table-striped">
        <thead className="table-header">
          <tr>
            <th>S.no</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Gender</th>
            <th>D.O.B</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((ele, index) => {
              return (
                <tr key={index} style={{ fontSize: "13px" }}>
                  <td>{++index}.</td>
                  <td>{ele?.firstName}</td>
                  <td>{ele?.lastName}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.country?.name}</td>
                  <td>{ele?.state?.name}</td>
                  <td>{ele?.city?.name}</td>
                  <td>{ele?.gender}</td>
                  <td>{ele?.dob.split("T")[0]}</td>
                  <td>{ele?.age}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
