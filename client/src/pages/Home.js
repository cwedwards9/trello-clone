import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import homeStyles from "./Home.module.scss";
import deskWork from "../images/desk-work.png";
import boardListCardsImg from "../images/boardImage2.png";
import boardGraphic from "../images/boardGraphic.png";
import cardsGraphic from "../images/cardGraphic.png";
import companyList from "../images/companyList.PNG";

export default function Home() {
    return (
        <>
        <Navbar />
        <div className={homeStyles.homePage}>
            <header className={homeStyles.homeHeader}>
                <div>
                    <h1>Trellolo helps move your project forward.</h1>
                    <p>Manage projects and reach new productivity peaks. From high rises to the home office, the way
                        your team works is unique—accomplish it all with Trellolo.
                    </p>
                    <Link to="/signup">Sign up - It's free!</Link>
                </div>
            </header>

            <section className={homeStyles.product}>
                <div>
                    <h2>It's more than work. It's a way of working together.</h2>
                    <p>Start with a Trellolo board, lists, and cards. Customize and expand with more features as your teamwork grows.
                        Manage projects, organize tasks, and build tream spirit-all in one place.
                    </p>
                    <Link to="/signup" className={homeStyles.link}>Start doing &rarr;</Link>
                </div>
                <img src={boardListCardsImg} className={homeStyles.boardImg} alt="A project board with lists and cards laid out for a project" />
                <p>Join over 1,000,000 teams worldwide that are using Trellolo to get more done.</p>
                <img src={companyList} className={homeStyles.companyImg} alt="List of companies: Google, Fender, Squarespace, Costco" />
            </section>

            <section className={homeStyles.featuresSection}>
                <div className={homeStyles.feature}>
                    <div>
                        <h2>Features to help your team succeed</h2>
                        <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and 
                            projects to events and goal setting, Trellolo's intuitive features give any team the ability to quickly
                            set up and customize workflows for just about anything.
                        </p>
                    </div>
                    <img src={deskWork} alt="Girl sitting at desk on her computer." />
                </div>
                
                <div className={homeStyles.feature}>
                    <img src={boardGraphic} alt="" className={homeStyles.boardGraphic} />
                    <div>
                        <h2>The board is just the beginning</h2>
                        <p>Lists and cards are the building blocks of organizing work on a Trellolo board. Grow from there 
                            with task assignments, timelines, productivity metrics, calendars, and more.
                        </p>
                    </div>
                </div>
                
                <div className={homeStyles.feature}>
                    <div>
                        <h2>Cards contain everything you need</h2>
                        <p>Trellolo cards are your portal to more organized work—where every single part of your task can be 
                            managed, tracked, and shared with teammates. Open any card to uncover an ecosystem of checklists,
                            due dates, attachments, conversations, and more.
                        </p>
                    </div>
                    <img src={cardsGraphic} alt="" />
                </div>
            </section>

            <section className={homeStyles.signUp}>
                <div className={homeStyles.signUpContainer}>
                    <div>
                        <h3>Sign up and get started with Trellolo today. A world of productive teamwork awaits!</h3>
                        <form>
                            <input type="text" placeholder="Email"/>
                            <Link to="/signup">Sign up</Link>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        </>
    );
}