import { useEffect } from "react";
import Cookies from "js-cookie";
import useUserStore from "../store/user";
import { showConfirm, showToast } from "../components/ui-lib";

const useAuth = () => {
  const { user, setUser } = <any>useUserStore();

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
        Cookies.set("token", _token, { expires: 7 });
      }
      setUser({ userName: _userName, integral });
    } else {
      throw "登录失败";
    }
  };

  const logout = async () => {
    await showConfirm("确认退出当前账号？");
    // 从 cookie 中移除用户信息
    Cookies.remove("token");
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
