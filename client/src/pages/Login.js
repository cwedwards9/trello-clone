import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImTrello, ImCross } from "react-icons/im";
import userLogStyles from "./UserLog.module.scss";

export default function Login(props) {
    const [email, updateEmail, resetEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");
    const [loginMsg, setLoginMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/api/login", { email: email, password: password })
            .then((res) => {
                sessionStorage.setItem("user", JSON.stringify(res.data.userSession));
                props.routeProps.history.push("/dashboard");
            })
            .catch(error => {
                setLoginMsg(error.response.data);
                resetEmail();
                resetPassword();
            })
    }

    return (
        <main className={userLogStyles.userLogPage}>
            <div className={userLogStyles.logoName}><ImTrello /> <p>Trellolo</p></div>

            {loginMsg ? 
                <div className={userLogStyles.message}>
                    <p>{loginMsg}</p>
                    <button type="button" onClick={() => setLoginMsg("")}><ImCross /></button>
                </div>
                : null
            }

            <div className={userLogStyles.formContainer}>
                <h1>Log in to Trellolo</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={updateEmail} placeholder="Enter email" required />
                    <input type="password" value={password} onChange={updatePassword} placeholder="Enter password" required />
                    <button>Log In</button>
                </form>
                <hr />
                <div className={userLogStyles.links}>
                    <Link to="/">Home</Link> ·
                    <Link to="/signup">Sign up for an account</Link>
                </div>
            </div>
        </main>
    );
}