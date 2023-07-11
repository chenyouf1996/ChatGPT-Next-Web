import useUserStore from "../store/user";

const useUser = () => {
  const { user, setUser } = <any>useUserStore();

  const addUser = async (userName: string, password: string, email: string) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, email }),
    });
    const data = await res.json();
    if (res.status === 200) {
      if (data.result === "success") {
        return data.data;
      } else {
        throw data.message;
      }
    } else {
      throw "error";
    }
  };

  const minusIntegral = async () => {
    if (!user) return;
    const res = await fetch("/api/user/integral/minus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: user.userName }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const updatedUser = data.data;
      setUser(updatedUser);
      return updatedUser;
    } else {
      throw "error";
    }
  };

  const addIntegral = async () => {
    if (!user) return;
    const res = await fetch("/api/user/integral/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: user.userName }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const updatedUser = data.data;
      setUser(updatedUser);
      return updatedUser;
    } else {
      throw "error";
    }
  };

  const findUser = async (userName: string) => {
    const res = await fetch(`/api/user/${userName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userInfo = await res.json();
    return userInfo;
  };

  const getUserIntegral = async (userName: string) => {
    const res = await findUser(userName);
    return res?.data?.integral || 0;
  };

  return {
    user,
    setUser,
    addUser,
    minusIntegral,
    addIntegral,
    findUser,
    getUserIntegral,
  };
};

export default useUser;
