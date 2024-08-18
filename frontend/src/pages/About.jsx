const About = () => {
  return (
    <section className="section-hero">
      <div className="container grid grid-two-cols">
        <div className="hero-content">
          <p>Welcome,Basic Learn Mern stack</p>
          <h1>Why Choose Us</h1>
          <p>
            Expertise: Our team consists of experienced IT professionals who are
            passionate about staying up-to-date with the latest industry trends.
          </p>
          <p>
            Customization: We understands that every bussiness is unique. That's
            why we create solutions that are tailored to your specific needs and
            goals.
          </p>
          <p>
            Customer-Centric Approach: We prioritize your satisfaction and
            provide top-notch support to address your IT concerns.
          </p>
          <p>
            Affordobility: We offer competitive pricing without compromising on
            the quality of our services
          </p>
          <p>
            Reliability: Count on us to be there whene you need us. We're
            commited to ensuring your IT environment is reliable and avalable
            24/7.
          </p>
          <div className="btn btn-group">
            <a href="/contact">
              <button className="btn">connect now</button>
            </a>
            <a href="/services">
              <button className="btn secondary-btn">learn more</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/images/home.png"
            alt="coding together"
            width="400"
            height="500"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
