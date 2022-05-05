import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Rout, Route } from "react-router-dom";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashboardView";
import EditProfileView from "./routes/EditProfileView";
import SingOutView from "./routes/SingOutView";
import PublicProfileView from "./routes/PublicProfileView";
import ChooseUserNameView from "./routes/ChooseUserNameView";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/" element={<LoginView />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="dashboard/profile" element={<EditProfileView />} />
            <Route path="signout" element={<SingOutView />} />
            <Route path="u/:username" element={<PublicProfileView />} />
            <Route path="choose-username" element={<ChooseUserNameView />} />
        </Routes>
    </BrowserRouter>,

    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
