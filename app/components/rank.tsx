import { useEffect, useState } from "react";
import styles from "./rank.module.scss";
import useUser from "../hooks/useUser";

const Rank = () => {
  const { getAllUser } = useUser();
  const [allUser, setAllUser] = useState<
    Array<{ userName: string; todayRank: number; totalRank: number }>
  >([]);

  useEffect(() => {
    getAllUser().then((users) => {
      setAllUser(users);
    });
  }, []);

  return (
    <div className={styles["rank"]}>
      <h1>rank</h1>
      <table>
        <thead>
          <tr>
            <th>用户名</th>
            <th>今日排行</th>
            <th>总排行</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((userItem) => (
            <tr key={userItem.userName}>
              <td>{userItem.userName}</td>
              <td>{userItem.todayRank}</td>
              <td>{userItem.totalRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;
