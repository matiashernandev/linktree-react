import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logout } from "../fibebase/firebase";

export default function SingOutView() {
    const navigate = useNavigate();

    async function handleUserLoggedIn(user) {
        await logout();
    }
    function handleUserNotRegistered(user) {
        navigate("/login");
    }
    function handleUserNotLoggedIn() {
        navigate("/login");
    }

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotLoggedIn={handleUserNotLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
        ></AuthProvider>
    );
}
