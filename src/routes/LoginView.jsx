import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExist } from "../fibebase/firebase";

import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";

import style from "./LoginView.module.css";

export default function LoginView() {
    const navigate = useNavigate();
    //  const [currentUser, setCurrentUser] = useState(null);

    /* 
    State
    0: inicializado
    1: loading
    2: loggin completo
    3: loggin peron sin registro
    4: no hay nadie loggeado
    5: ya existe user name
    6: nuevo username para continuar Click
    7: user no existe
    */

    const [state, setCurrentState] = useState(0);

    /*     useEffect(() => {
        setCurrentState(1);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    //TODO: redirigir a Dashboard
                    navigate("/dashboard");
                    setCurrentState(2);
                } else {
                    //TODO: redirigir a Choose username
                    navigate("/choose-username");
                    setCurrentState(3);
                }

                console.log(user.displayName);
            } else {
                setCurrentState(4);

                console.log("no hay nadie");
            }
        });
    }, [navigate]); */

    async function handleOnClick() {
        const googleProvider = new GoogleAuthProvider();
        await signInGoogle(googleProvider);

        async function signInGoogle(googleProvider) {
            try {
                const res = await signInWithPopup(auth, googleProvider);
                // console.log(res.user);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleUserLoggedIn(user) {
        navigate("/dashboard");
    }
    function handleUserNotRegistered(user) {
        navigate("/choose-username");
    }
    function handleUserNotLoggedIn() {
        setCurrentState(4);
    }

    /*    if (state === 2) {
        return <div>Estás autenticado y registrado</div>;
    }
    if (state === 3) {
        return <div>Estás autenticado pero no registrado</div>;
    } */
    if (state === 4) {
        return (
            <div className={style.loginView}>
                <div>
                    <h1>Linktree rancio</h1>
                </div>
                <button className={style.provider} onClick={handleOnClick}>
                    Loggin with Google
                </button>
                <div>
                    <p>Estilos en proceso 29/03/22</p>
                </div>
            </div>
        );
    }
    /*    if (state === 5) {
        return (
            <div>
                <button onClick={handleOnClick}>Loggin with Google</button>
            </div>
        );
    } */

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>Loading</div>
        </AuthProvider>
    );
}
