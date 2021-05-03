import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImTrello, ImCross } from "react-icons/im";
import userLogStyles from "./UserLog.module.scss";

export default function Signup(props) {
    const [name, updateName] = useInputState("");
    const [email, updateEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");
    const [passwordConfirm, updatePasswordConfirm, resetPasswordConfirm] = useInputState("");
    const [signupMsg, setSignupMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordConfirm) {
            setSignupMsg("Your passwords do not match!")
        } else {
            axios.post("/api/register", { email: email, password: password, name: name })
                .then((res) => {
                    sessionStorage.setItem("user", JSON.stringify(res.data.user));
                    props.routeProps.history.push("/dashboard");
                })
                .catch(error => {
                    setSignupMsg(error.response.data);
                    resetPassword();
                    resetPasswordConfirm();
                })
        }
    }

    return (
        <main className={userLogStyles.userLogPage}>
            <div className={userLogStyles.logoName}><ImTrello /> <p>Trellolo</p></div>

            {signupMsg ? 
                <div className={userLogStyles.message}>
                    <p>{signupMsg}</p>
                    <button type="button" onClick={() => setSignupMsg("")}><ImCross /></button>
                </div>
                : null
            }
            
            <div className={userLogStyles.formContainer}>
                <h1>Sign up for an account</h1>
                <form onSubmit={handleSubmit} >
                    <input type="text" value={name} onChange={updateName} placeholder="Name" required />
                    <input type="email" value={email} onChange={updateEmail} placeholder="Email" required />
                    <input type="password" value={password} onChange={updatePassword} placeholder="Password" required />
                    <input type="password" value={passwordConfirm} onChange={updatePasswordConfirm}placeholder="Confirm Password" required />
                    <button>Sign Up</button>
                </form>
                <hr />
                <div className={userLogStyles.links}>
                    <Link to="/">Home</Link> ·
                    <Link to="/login">Have an account? Log In</Link>
                </div>
            </div>
        </main>
    );
}