const useUser = () => {
  const addUser = async (userName: string, password: string, email: string) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, email }),
    });
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
  };

  const fetchUsers = async (id: string) => {
    const response = await fetch(`/api/user/${id}`);
    await response.json();
  };

  return { addUser, deleteUser, fetchUsers };
};

export default useUser;
