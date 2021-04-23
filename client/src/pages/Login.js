import React from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImTrello } from "react-icons/im";
import userLogStyles from "./UserLog.module.scss";

export default function Login() {
    const [email, updateEmail, resetEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/api/login", { email: email, password: password })
        .then((res) => {
            console.log(res);
        })
        .catch(error => {
            console.log(error.response.data);
            resetPassword();
        })
    }

    return (
        <main className={userLogStyles.userLogPage}>
            <div className={userLogStyles.logoName}><ImTrello /> <p>Trellolo</p></div>
            <div className={userLogStyles.formContainer}>
                <h1>Log in to Trellolo</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={updateEmail} placeholder="Enter email" required />
                    <input type="password" value={password} onChange={updatePassword} placeholder="Enter password" required />
                    <button>Log In</button>
                </form>
                <hr />
                <Link to="/signup">Sign up for an account</Link>
            </div>
        </main>
    );
}