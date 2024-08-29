import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [regdata, setRegData] = useState([]);

  const getRegisterNo = async () => {
    try {
      const { data } = await API.get("/admin/register-no");
      if (data?.success) {
        setRegData(data.data); // Set the array of registration data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegisterNo();
  }, []);

  const getCountByRole = (role) => {
    const roleData = regdata.find((item) => item.role === role);
    return roleData ? roleData.count : 0;
  };

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3 className="text-danger">Manage Blood Bank App</h3>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <h4>Portal Registered</h4>
                </th>
                <th scope="col">
                  <h4>Total no. of Registered</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h5>Donors</h5>
                </td>
                <td>{getCountByRole("donor")}</td>
              </tr>
              <tr>
                <td>
                  <h5>Organisations</h5>
                </td>
                <td>{getCountByRole("organisation")}</td>
              </tr>
              <tr>
                <td>
                  <h5>Hospitals</h5>
                </td>
                <td>{getCountByRole("hospital")}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
