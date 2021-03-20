import React from "react";
import homeStyles from "./Home.module.scss";

export default function Home() {
    return (
        <>
        <header className={homeStyles.homeHeader}>
            <div>
                <h1>Trellolo helps move your project forward.</h1>
                <p>Manage projects and reach new productivity peaks.</p>
                <form>
                    <input type="text" />
                    <button>Sign up - It's free!</button>
                </form>
            </div>
            <img src="https://images.unsplash.com/photo-1594823274242-19036bf455e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                alt="A laptop in front of a computer screen with headphones laying in front of the laptop and a small plant on the right."
            />
        </header>
        
        
        </>
    );
};