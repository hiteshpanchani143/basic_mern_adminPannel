import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEditContact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const { id } = useParams();
  console.log(id)
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();
  const getSingleContactData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/admin/contact/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setContact({
          username: data.username,
          email: data.email,
          message: data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/admin/contact/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(contact),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("contact update successfully.");
        navigate("/admin/contacts");
      } else {
        toast("contact not update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleContactData();
  }, []);
  return (
    <section className="">
      <div className="container">
        <h1>Admin Contact Data</h1>
      </div>
      <div className="container ">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="username"
                name="username"
                placeholder="enter your username"
                id="username"
                required
                autoComplete="off"
                value={contact.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                id="email"
                required
                autoComplete="off"
                value={contact.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="message">message</label>
              <textarea
                type="text"
                name="message"
                placeholder="enter your message"
                id="message"
                required
                rows={10}
                cols={50}
                autoComplete="off"
                value={contact.message}
                onChange={handleInput}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-submit">
              Edit now
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default AdminEditContact;
