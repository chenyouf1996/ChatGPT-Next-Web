const useRank = () => {
  const update = async (rankList: Array<any>) => {
    const res = await fetch(`/api/user/rank/update`, {
      method: "POST",
      body: JSON.stringify({ rankList }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data.data;
  };

  const reset = async () => {
    const res = await fetch(`/api/user/rank/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data.data;
  };

  return { update, reset };
};

export default useRank;
