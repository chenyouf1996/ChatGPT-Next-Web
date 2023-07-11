import { useEffect } from "react";
import Cookies from "js-cookie";
import { showConfirm } from "../components/ui-lib";
import useUser from "./useUser";

const useAuth = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const userToken = Cookies.get("token");

    if (userToken) {
      // 如果有用户 cookie，表示用户已登录
      login("", "", userToken);
    }
  }, []);

  const login = async (userName: string, password: string, token?: string) => {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, token }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const { token: _token, userName: _userName, integral } = data.data;
      // 将用户信息保存到 cookie 中
      if (_token) {
        Cookies.set("token", _token, { expires: 30 });
      }
      setUser({ userName: _userName, integral });
    } else {
      throw "登录失败,密码不正确";
    }
  };

  const logout = async () => {
    const result = await showConfirm("确认退出当前账号？");
    if (result) {
      // 从 cookie 中移除用户信息
      Cookies.remove("token");
      setUser(null);
    } else {
      throw "取消退出";
    }
  };

  return { login, logout };
};

export default useAuth;
