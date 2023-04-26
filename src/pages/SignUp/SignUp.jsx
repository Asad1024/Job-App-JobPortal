import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config";
import "./SignUp.css";
import OAuth from "../../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="section1">
      <h1>Sign Up</h1>
      <div class="container">
        <div class="form">
          <form onSubmit={onSubmit}>
            <input
              type="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full name"
            />
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
                Have an account? <Link to="/sign-in">Sign In</Link>
              </p>
            </div>
            <button type="submit">Sign Up</button>
            <br />
            <span className="or">OR</span>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
