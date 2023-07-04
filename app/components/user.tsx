import { useState } from "react";
import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
// import { Path } from "../constant";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import useUser from "../hooks/useUser";

const User = () => {
  const { addUser } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const goHome = () => navigate(Path.Home);
  const login = () => {
    addUser(userName, password, email);
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.User.LoginTitle}</div>
      <div className={styles["auth-tips"]} style={{ marginBottom: 10 }}>
        {Locale.User.LoginSubTitle}
      </div>

      <input
        style={{ marginBottom: 10 }}
        type="text"
        placeholder={Locale.User.UserName}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        type="password"
        style={{ marginBottom: 10 }}
        placeholder={Locale.User.Password}
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />

      <input
        type="text"
        style={{ marginBottom: 20 }}
        placeholder={Locale.User.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={styles["auth-actions"]} style={{ width: "80px" }}>
        <IconButton
          text={Locale.User.ConfirmBtn}
          type="primary"
          onClick={login}
        />
      </div>
    </div>
  );
};

export default User;
