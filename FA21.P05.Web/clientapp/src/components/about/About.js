import Carousels from "../carousel/Carousel";
import "./About.css";
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
function About() {
  return (
    <div className="about">
      <Container fluid>
        <div className="HomeImage">
          <Carousels />
        </div>

        <div className="bannertitle">
          <p> FRESH FOOD AT YOUR FINGERTIPS</p>
        </div>

        <div className="about_row">
          <div className="row">
            <div className="col-sm-6">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">What do we Offer?</h2>
                  <p className="card-text">
                    Food To Go combines flavors and inspiration from the
                    different spices and recipies throughout the world to create
                    what we think is the best! Our Chef has prepared the menu
                    keeping in mind the great responsibility we have to feed you
                    and your loved ones. We specialize in pizzas, as well as
                    some handmade appetizers and burgers. Feel free to indulge
                    in a our fantastic unique cuisine. Cheers!
                  </p>
                  <Link to="/menu">
                    <button className="btn btn-primary">Order Now</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">Who are we?</h2>
                  <p className="card-text">
                    Food To Go is a classic restaurant located in the sweet spot
                    of Hammond, Louisiana. Our team is dedicated towards
                    providing you with the experience you want an affordable
                    price range. We offer a variety of diiferent dishes and
                    beaverages to make your meal enjoyable. Our chefs are well
                    trained and dedicated. Parties, gatherings, date nights or
                    just another lazy day where you donot want to cook; We have
                    got you covered.
                  </p>
                  <Link className="zoom" to="/menu">
                    <button className="btn btn-primary">Order Now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <img
                    src="https://envoc-3c77.kxcdn.com/uploads/play/Travis_overmier.png"
                    alt=""
                    align="center"
                  />
                  <h5 className="card-title">TRAVIS OVERMIER</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Sales/stakeholder
                  </h6>
                  <p className="card-text"></p>
                  <Link to="mailto:383@envoc.com">
                    <button className="btn btn-primary">Email</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card">
                <div className="card-body" bg-color="aquablue">
                  <img
                    src="https://envoc-3c77.kxcdn.com/uploads/play/matt_vidacovich.png"
                    alt=""
                  />
                  <h5 className="card-title">MATTHEW VIDACOVICH</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Chef/stakeholder
                  </h6>
                  <p className="card-text"></p>
                  <Link to="mailto:383@envoc.com">
                    <button className="btn btn-primary">Email</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer">
          <Footer />
        </div>
      </Container>
    </div>
  );
}

export default About;
