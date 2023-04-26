import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import OAuth from "../../components/OAuth";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {}
  }
  return (
    <section className="section1">
      <h1>Sign In</h1>
      <div class="container">
        <div class="form">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div class="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
            </div>
            <div class="links">
              <p>
                Don't Have an account? <Link to="/sign-up">Sign Up</Link>
              </p>
            </div>
            <button type="submit">Sign In</button>
            <br />
            <span className="or">OR</span>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
