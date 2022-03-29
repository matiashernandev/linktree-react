import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    existsUsername,
    getProfilePhotoUrl,
    getUserPublicProfileInfo,
} from "../fibebase/firebase";

export default function PublicProfileView() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        getProfile();

        async function getProfile() {
            const username = params.username;

            try {
                const userUid = await existsUsername(username);

                /*  console.log(username);
                console.log(userUid); */
                if (userUid) {
                    const userInfo = await getUserPublicProfileInfo(userUid);
                    setProfile(userInfo);
                    console.log(userInfo);

                    const url = await getProfilePhotoUrl(
                        userInfo.profileInfo.profilePicture
                    );
                    setUrl(url);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [params]);
    return (
        /*funciona pero cuando se actualiza se hace mierda todo*/
        <div>
            <div>
                <img src={url} width={100} alt="" />
            </div>
            <div>
                {/*  <h2>{profile.profileInfo.username}</h2>
                <h3>{profile.profileInfo.displayName}</h3> */}
                <div>Links</div>
            </div>
        </div>
    );
}
