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
              <div className="form-input">
                <input type="text" placeholder="Full Name" required />
              </div>

              <div className="form-input mt-30">
                <input type="text" placeholder="Your Email" required />
              </div>

              <div className="form-input mt-30">
                <input type="number" placeholder="Telephone" required />
              </div>

              <div className="form-input mt-30">
                <select required>
                  <option value="" disabled selected>Select Your Governorate</option>
                  <option value="Ariana">Ariana</option>
                  <option value="Beja">Beja</option>
                  <option value="Ben Arous">Ben Arous</option>
                  <option value="Bizerte">Bizerte</option>
                  <option value="Gabes">Gabes</option>
                  <option value="Gafsa">Gafsa</option>
                  <option value="Jendouba">Jendouba</option>
                  <option value="Kairouan">Kairouan</option>
                  <option value="Kasserine">Kasserine</option>
                  <option value="Kebili">Kebili</option>
                  <option value="Kef">Kef</option>
                  <option value="Mahdia">Mahdia</option>
                  <option value="Manouba">Manouba</option>
                  <option value="Medenine">Medenine</option>
                  <option value="Monastir">Monastir</option>
                  <option value="Nabeul">Nabeul</option>
                  <option value="Sfax">Sfax</option>
                  <option value="Sidi Bouzid">Sidi Bouzid</option>
                  <option value="Siliana">Siliana</option>
                  <option value="Sousse">Sousse</option>
                  <option value="Tataouine">Tataouine</option>
                  <option value="Tozeur">Tozeur</option>
                  <option value="Tunis">Tunis</option>
                  <option value="Zaghouan">Zaghouan</option>
                </select>
              </div>

              <div className="form-input mt-30">
                <input type="password" placeholder="Password" required />
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
