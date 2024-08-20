import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();
  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services?.map((serviceData, index) => {
          const { service, description, price, provider } = serviceData;
          return (
            <div className="card">
              <div className="card-img">
                <img src="/images/home.png" alt="designer" width="200" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols cardFirstContent">
                  <p className="cardProvider">{provider}</p>
                  <p className="cardPrice">{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
