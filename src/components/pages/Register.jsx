import { Link } from "react-router-dom";
import React from "react";

export default function Register() {
  return (
    <section className="mt-header layout-pt-lg layout-pb-lg bg-img2">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30" style={{ color: 'white' }}>
              <h1 className="text-60" style={{ color: 'white' }}>Signup</h1>
              <div className="mt-5" style={{ color: '#ffff' }}>
                Already have an account?{" "}
                <Link to="/login" className="text-accent-1" >
                  Log In!
                </Link>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
              style={{ backgroundColor: 'white' }}
            >
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Username</label>
              </div>

              <div className="form-input mt-30">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>

              <div className="form-input mt-30">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">Your Email</label>
              </div>

              <div className="form-input mt-30">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">
                  Confirm email
                </label>
              </div>

              <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                Register
                <i className="icon-arrow-top-right ml-10"></i>
              </button>

              
            
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
