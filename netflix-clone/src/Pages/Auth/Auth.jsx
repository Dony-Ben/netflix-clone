import React, { useState } from "react";
import { auth, db } from "../../Config/Firebase.jsx";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png"
import "./Auth.css"
import netflix_spinner from "../../assets/netflix_spinner.gif"
const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading,setLoading] =useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
    try {
      if (signState === "Sign Up") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: name,
          watchlist: [],
          createdAt: new Date().toISOString()
        });
        
        toast.success("Sign Up successful", {
          position: "top-right",
          autoClose: 3000,
        });

      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
        })
        navigate("/home")
      }
    } catch (error) {
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    setLoading(false);
  };

  return (
    
    loading ? <div className="loading-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
      <div className="login">
        <img src={logo} alt="" className="login-logo" />
        <div className="login-form">
          <h1>{signState}</h1>

          <form onSubmit={handleSubmit}>
            {signState === "Sign Up" && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">{signState}</button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          <div className="form-Switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?{" "}
                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already Have an Account?{" "}
                <span onClick={() => setSignState("Sign In")}>Sign In</span>
              </p>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default Login;