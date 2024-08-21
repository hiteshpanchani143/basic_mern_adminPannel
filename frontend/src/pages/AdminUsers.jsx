import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/admin/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/user/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response;
      if (data) {
        getAllUsersData();
      }
    } catch (error) {
      console.log("error in catch block", error);
    }
  };
  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="btn btnEdit">
                      <NavLink to={`/admin/user/${user._id}/edit`}>
                        Edit
                      </NavLink>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btnDelete"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
