import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    existsUsername,
    getProfilePhotoUrl,
    getUserPublicProfileInfo,
} from "../fibebase/firebase";
import PublicLink from "../components/PublicLink";

import style from "./PublicProfileView.module.css";
import styleLinks from "../components/PublicLink.module.css";

export default function PublicProfileView() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");
    const [state, setState] = useState(0);

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
                    //console.log(userInfo);

                    const url = await getProfilePhotoUrl(
                        userInfo.profileInfo.profilePicture
                    );
                    setUrl(url);
                } else {
                    setState(7);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [params]);

    if (state === 7) {
        return (
            <div>
                <h1>Username doesn't exists</h1>
            </div>
        );
    }

    return (
        /*funciona pero cuando se actualiza se hace mierda todo*/
        /* no andan los styles*/
        <div className={style.profileContainer}>
            <div className={style.profilePicture}>
                <img src={url} width={100} alt="" />
            </div>
            <div>
                <h2>{profile?.profileInfo.username}</h2>
                <h3>{profile?.profileInfo.displayName}</h3>
                <div className={styleLinks.publicLinksContainer}>
                    {profile?.linksInfo.map((link) => (
                        <PublicLink
                            key={link.docId}
                            url={link.url}
                            title={link.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
