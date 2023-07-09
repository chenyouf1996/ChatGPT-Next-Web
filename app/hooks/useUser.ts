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

  // const findUser = async (id: string) => {
  //   const res = await fetch(`/api/user/${id}`);
  //   const userInfo = await res.json();
  //   console.log(userInfo);

  //   return userInfo
  // };

  // const deleteUser = async (id: string) => {
  //   await fetch(`/api/user/${id}`, {
  //     method: "DELETE",
  //   });
  // };

  return {
    addUser,
    minusIntegral,
    // findUser,
    user,
    setUser,
    // deleteUser,
    // fetchUsers,
  };
};

export default useUser;
