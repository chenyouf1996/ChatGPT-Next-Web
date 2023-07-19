const useKey = () => {
  const add = async (keyList: Array<any>) => {
    const res = await fetch(`/api/key/add`, {
      method: "POST",
      body: JSON.stringify({ keyList }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data.data;
  };

  return { add };
};

export default useKey;
