import { useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);
  const { user,API } = useAuth();
  console.log("user", user);
  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }
  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/api/v1/form/contact`,
        contact
      );
      if (response.statusText) {
        const data = await response.data;
        console.log(data);
        setContact({ message: "" });
        alert(data.message);
      }
    } catch (error) {
      alert(error.response.data.extraDetailes);
      console.log(error);
    }
  };

  //  Help me reach 1 Million subs 👉 https://youtube.com/thapatechnical

  return (
    <section className="section-contact">
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        <div className="contact-img">
          <img src="/images/home.png" alt="we are always ready to help" />
        </div>

        {/* contact form content actual  */}
        <section className="section-form">
          <h1 className="main-heading mb-3">Contact form</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={contact.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={contact.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="message">message</label>
              <textarea
                name="message"
                id="message"
                autoComplete="off"
                value={contact.message}
                onChange={handleInput}
                required
                cols="30"
                rows="6"
              ></textarea>
            </div>

            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        </section>
      </div>

      <section className="mb-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      </section>
    </section>
  );
};

export default Contact;
