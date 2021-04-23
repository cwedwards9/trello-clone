import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImTrello, ImCross } from "react-icons/im";
import userLogStyles from "./UserLog.module.scss";

export default function Signup() {
    const [name, updateName, resetName] = useInputState("");
    const [email, updateEmail, resetEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");
    const [signupMsg, setSignupMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/api/register", { email: email, password: password, name: name })
            .then((res) => {
                console.log(res);
            })
            .catch(error => {
                setSignupMsg(error.response.data);
                resetPassword();
            })
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
                <h1>Sign up for your account</h1>
                <form onSubmit={handleSubmit} >
                    <input type="text" value={name} onChange={updateName} placeholder="Name" required />
                    <input type="email" value={email} onChange={updateEmail} placeholder="Email" required />
                    <input type="password" value={password} onChange={updatePassword} placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button>Sign Up</button>
                </form>
                <hr />
                <Link to="/login">Already have an account? Log In</Link>
            </div>
        </main>
    );
}