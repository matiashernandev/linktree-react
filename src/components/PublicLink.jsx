import style from "./PublicLink.module.css";

export default function PublicLink({ url, title }) {
    console.log(url);
    return (
        <a  target="_blank" className={style.publicLinkContainer} href={`https://`+url} rel="noopener noreferrer">
            <div >{title}</div>
        </a>
    );
}
