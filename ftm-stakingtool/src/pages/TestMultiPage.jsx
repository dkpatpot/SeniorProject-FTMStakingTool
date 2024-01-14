import React from "react";
import {
    BrowserRouter,
    Route,
    Link
} from "react-router-dom";

const TestMultiPage = () => {
    return (
        <div>
            <h1>
                Test Muti Page
                <Link to="/"> Home </Link>
            </h1>
        </div>
    );
};

export default TestMultiPage;