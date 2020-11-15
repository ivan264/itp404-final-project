import React from "react";

export default function GuestAbout() {

  document.title = "About Page";

  return (
    <>
      <h3 className="text-center mt-2 ">About</h3>
      <hr className="brown-hr"></hr>

      <p className="text-center">Thank you for visiting our store today 🎈 As a thank you we are committed to providing you with the best deals to make your special occasion just a bit more special 🥳</p>
      <div className="container text-center">
      <img src="./about-img.jpg" alt="drink" className="img-fluid img-jarro rounded text-center m-2"></img>
      </div>


      <div className="container">
        <div className="row">
          <div className="col-3 text-center">
            Contact
            <hr className="brown-hr"></hr>
            <p>Primary: (213)-740-7471</p>
            <p>Secondary: (213)-740-4077</p>
          </div>
          <div className="col"></div>
          <div className="col-3 text-center">
            Address
            <hr className="brown-hr"></hr>
            <p>
              University of Southern California Los Angeles, CA 90007 United
              States
            </p>
          </div>
          <div className="col"></div>
          <div className="col-3 text-center">
            Business Hours
            <hr className="brown-hr"></hr>
            <ul className="text-left">
              <li>Mon: 9:00 AM-6:00 PM</li>
              <li>Tue: 9:00 AM-6:00 PM</li>
              <li>Wed: 9:00 AM-6:00 PM</li>
              <li>Thu: 9:00 AM-6:00 PM</li>
              <li>Fri: 9:00 AM-6:00 PM</li>
              <li>Sat: 9:00 AM-6:00 PM</li>
              <li>Sun: 9:00 AM-6:00 PM</li>
            </ul>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}
