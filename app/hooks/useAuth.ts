import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      // 如果有用户 cookie，表示用户已登录
      setUser(userCookie);
    }
  }, []);

  const login = async (userName: string, password: string) => {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const token = data.data;
      // 将用户信息保存到 cookie 中
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", userName, { expires: 7 });
      setUser(userName);
    }
  };

  const logout = () => {
    // 从 cookie 中移除用户信息
    Cookies.remove("token");
    Cookies.remove("user");
    setUser("");
  };

  return { user, login, logout };
};

export default useAuth;
