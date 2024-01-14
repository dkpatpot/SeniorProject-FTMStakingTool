import React from "react";
import {
    BrowserRouter,
    Route,
    Link
} from "react-router-dom";
import Header from "../components/Header";
import Content from "../components/Content";

const Home = () => {
    return (
        <div>
            <Header />
            <Content />
        </div>
    );
};

export default Home;