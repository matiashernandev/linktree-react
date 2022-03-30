import { Link } from "react-router-dom";
import style from "./DashboardWrapper.module.css";

export default function DashboardWrapper({ children }) {
    return (
        <div>
            <nav className={style.nav}>
                <Link to="/">
                    <div className={style.logo}>Logotipo</div>
                </Link>
                <Link to="/dashboard">Links</Link>
                <Link to="/dashboard/profile">Profile</Link>
                <Link to="/signout">Signout</Link>
            </nav>

            <div className="main-container">{children}</div>
        </div>
    );
}
