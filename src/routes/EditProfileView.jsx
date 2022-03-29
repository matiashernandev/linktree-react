import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import AuthProvider from "../components/AuthProvider";
import { async } from "@firebase/util";
import {
    getProfilePhotoUrl,
    setUserProfilePhoto,
    updateUser,
} from "../fibebase/firebase";

export default function EditProfileView() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);
    const [profileUrl, setProfileUrl] = useState(null);
    const fileRef = useRef();

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfileUrl(url);
        setState(2);
    }
    function handleUserNotRegistered(user) {
        navigate("/login");
    }
    function handleUserNotLoggedIn() {
        navigate("/login");
    }

    function handleOpenFilePicker() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function handleOnChangeFile(e) {
        const files = e.target.files;
        const fileReader = new FileReader();

        if (fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result;

                const res = await setUserProfilePhoto(
                    currentUser.uid,
                    imageData
                );
                if (res) {
                    const tmpUser = { ...currentUser };
                    tmpUser.profilePicture = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    setCurrentUser({ ...tmpUser });
                    const url = await getProfilePhotoUrl(
                        currentUser.profilePicture
                    );
                    //console.log(url);
                    setProfileUrl(url);
                }
            };
        }
    }

    if (state !== 2) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotLoggedIn={handleUserNotLoggedIn}
                onUserNotRegistered={handleUserNotRegistered}
            ></AuthProvider>
        );
    }

    return (
        <DashboardWrapper>
            <div>
                Edit Profile Info
                <div>
                    <div>
                        <img src={profileUrl} width={100} alt="" />
                    </div>
                    <div>
                        <button onClick={handleOpenFilePicker}>
                            Choose new profile picture
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleOnChangeFile}
                        />
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
}
