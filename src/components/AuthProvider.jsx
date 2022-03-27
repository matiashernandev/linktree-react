import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
    auth,
    getUserInfo,
    registerNewUser,
    userExist,
} from "../fibebase/firebase";

import { useNavigate } from "react-router-dom";

export default function AuthProvider({
    children,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegistered,
}) {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExist(user.uid);
                if (isRegistered) {
                    const userInfo = await getUserInfo(user.uid);
                    if (userInfo.processCompleted) {
                        onUserLoggedIn(userInfo);
                    } else {
                        onUserNotRegistered(userInfo);
                    }
                    //TODO: redirigir a Dashboard
                } else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: "",
                        processCompleted: false,
                    });
                    onUserNotRegistered(user);
                }

                console.log(user.displayName);
            } else {
                onUserNotLoggedIn();
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
    return <div>{children}</div>;
}
