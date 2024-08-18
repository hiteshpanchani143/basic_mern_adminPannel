import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        user
      );
      const data = await response;
      console.log(data);
      if (data) {
        storeTokenInLocalStorage(data?.data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/form.png"
                alt="login image"
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">login form</h1>
              <br />
              <section className="section-form">
                <form onSubmit={handleSubmit}>
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
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    login now
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
