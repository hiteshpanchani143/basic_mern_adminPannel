import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken, API } = useAuth();
  const getAllUsersContacts = async () => {
    try {
      const response = await fetch(`${API}/api/v1/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/v1/admin/contact/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response;
      if (data) {
        getAllUsersContacts();
      }
    } catch (error) {
      console.log("error in catch block", error);
    }
  };
  useEffect(() => {
    getAllUsersContacts();
  }, []);
  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Contacts Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact, i) => {
              return (
                <tr key={contact._id}>
                  <td>{i + 1}</td>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className="btn btnEdit">
                      <NavLink to={`/admin/contact/${contact._id}/edit`}>
                        Edit
                      </NavLink>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btnDelete"
                      onClick={() => deleteContact(contact._id)}
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

export default AdminContacts;
