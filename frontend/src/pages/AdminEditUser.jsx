import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEditUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();
  const { authorizationToken, API } = useAuth();
  const navigate = useNavigate();
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${API}/api/v1/admin/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          username: data.username,
          email: data.email,
          phone: data.phone,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/v1/admin/user/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("user update successfully.");
        navigate("/admin/users");
      } else {
        toast("user not update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleUserData();
  }, []);
  return (
    <section className="">
      <div className="container">
        <h1>Admin Users Data</h1>
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
                value={user.username}
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
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="phone">phone</label>
              <input
                type="number"
                name="phone"
                placeholder="enter your phone"
                id="phone"
                required
                autoComplete="off"
                value={user.phone}
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

export default AdminEditUser;
