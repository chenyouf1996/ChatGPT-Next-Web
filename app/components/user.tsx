import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { Path } from "../constant";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const User = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const navigate = useNavigate();
  const { addUser } = useUser();
  const { user, login, logout } = useAuth();

  const goHome = () => navigate(Path.Home);

  const handleLogin = async () => {
    await login(userName, password);
    goHome();
  };

  const handleRegister = async () => {
    await addUser(userName, password, email);
    await login(userName, password);
    goHome();
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      {user ? (
        <div style={{ marginTop: 10 }}>您已登录</div>
      ) : (
        <Fragment>
          <div className={styles["auth-title"]}>
            {loginPage ? Locale.User.LoginTitle : Locale.User.RegisterTitle}
          </div>
          <div className={styles["auth-tips"]} style={{ marginBottom: 10 }}>
            <span>{Locale.User.LoginSubTitle}</span>
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

          {!loginPage && (
            <input
              type="text"
              placeholder={Locale.User.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: 10 }}
            />
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              position: "relative",
              marginTop: 10,
            }}
          >
            <div>
              {loginPage ? (
                <IconButton
                  text={Locale.User.LoginBtn}
                  type="primary"
                  onClick={handleLogin}
                  style={{ width: "100px" }}
                />
              ) : (
                <IconButton
                  text={Locale.User.RegisterBtn}
                  type="primary"
                  onClick={handleRegister}
                  style={{ width: "100px" }}
                />
              )}
            </div>
            <div style={{ position: "absolute", left: "110px" }}>
              {!loginPage ? (
                <IconButton
                  text={Locale.User.LoginBtn}
                  onClick={() => setLoginPage(true)}
                />
              ) : (
                <IconButton
                  text={Locale.User.RegisterBtn}
                  onClick={() => setLoginPage(false)}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default User;
