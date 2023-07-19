import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { Path } from "../constant";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import { Loading, showToast } from "./ui-lib";
import useVerifyForm from "../hooks/useVerifyForm";

const User = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addUser } = useUser();
  const { login } = useAuth();
  const { user } = useUser();
  const { verifyUserName, verifyPassword, verifyEmail } = useVerifyForm();

  const goHome = () => navigate(Path.Home);

  const handleLogin = async (name: string, word: string) => {
    setLoading(true);
    try {
      await login(name, word);
      goHome();
    } catch (error: any) {
      showToast(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!verifyUserName(userName)) {
      return showToast("用户名校验失败：最少6个字符，不能超过18个字符");
    } else if (!verifyPassword(password)) {
      return showToast(
        "密码校验失败：最少6个字符，包含字母和数字，最大18个字符",
      );
    } else if (!verifyEmail(email)) {
      return showToast("邮箱校验失败");
    }
    setLoading(true);
    try {
      await addUser(userName, password, email);
      await login(userName, password);
      goHome();
    } catch (error: any) {
      showToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["auth-page"]}>
      {!loading ? (
        user ? (
          <Fragment>
            <div className={`no-dark ${styles["auth-logo"]}`}>
              <BotIcon />
            </div>
            <div style={{ marginTop: 10 }}>您已登录</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={`no-dark ${styles["auth-logo"]}`}>
              <BotIcon />
            </div>
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
                    onClick={() => handleLogin(userName, password)}
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      text={Locale.User.RegisterBtn}
                      onClick={() => setLoginPage(false)}
                    />
                    <IconButton
                      text={"游客登录"}
                      onClick={() => {
                        handleLogin("visitor", "abc123...");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default User;
