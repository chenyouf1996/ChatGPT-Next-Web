import useKey from "../hooks/useKey";
import { IconButton } from "./button";

const ManageKey = () => {
  const { add } = useKey();
  const cyfGlobal: any = globalThis;

  return (
    <IconButton
      text="插入key"
      onClick={() => {
        add(cyfGlobal.cyfKeyList);
      }}
    />
  );
};

export default ManageKey;
