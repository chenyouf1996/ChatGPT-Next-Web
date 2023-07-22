import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./rank.module.scss";
import useUser from "../hooks/useUser";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import { Path } from "../constant";

const Rank = () => {
  const { getAllUser } = useUser();
  const navigate = useNavigate();
  const [rankType, setRankType] = useState("today"); // today or week
  const [allUser, setAllUser] = useState<
    Array<{ userName: string; todayRank: number; totalRank: number }>
  >([]);

  const goHome = () => navigate(Path.Home);

  useEffect(() => {
    getAllUser().then((users) => {
      setAllUser(
        [...users].sort(
          (prev: any, cur: any) => cur.todayRank - prev.todayRank,
        ),
      );
    });
  }, []);

  // useEffect(() => {
  //   if (rankType === "today") {
  //     setAllUser(
  //       [...allUser].sort(
  //         (prev: any, cur: any) => cur.todayRank - prev.todayRank,
  //       ),
  //     );
  //   } else {
  //     setAllUser(
  //       [...allUser].sort(
  //         (prev: any, cur: any) => cur.totalRank - prev.totalRank,
  //       ),
  //     );
  //   }
  // }, [rankType]);

  const changeRank = (type: string) => {
    setRankType(type === "today" ? "week" : "today");
  };

  const todayRankAward: any = {
    1: "100积分",
    2: "50积分",
    3: "25积分",
  };

  // const weekRankAward: any = {
  //   1: "300积分",
  //   2: "200积分",
  //   3: "100积分",
  // };

  return (
    <div className={styles["rank"]}>
      <div className={styles["rank-title"]}>
        <div className={styles["row-end"]}>
          <span className="title">排行榜</span>
          {/* <IconButton
            text={rankType === "today" ? "切换周榜" : "切换日榜"}
            onClick={() => changeRank(rankType)}
          /> */}
        </div>
        <IconButton
          icon={<CloseIcon />}
          className={"password-eye"}
          bordered
          onClick={goHome}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>排名</th>
            <th>用户名</th>
            <th>今日完成量</th>
            <th>每日激励</th>
            {/* <th>周完成量</th>
            <th>每周激励</th> */}
          </tr>
        </thead>
        <tbody>
          {allUser.map((userItem, index) => (
            <tr key={userItem.userName}>
              <td className={styles["index"]}>{index + 1}</td>
              <td>{userItem.userName}</td>
              <td>{userItem.todayRank || 0}</td>
              <td>{todayRankAward[index + 1]}</td>
              {/* <td>{userItem.totalRank}</td>
              <td>{weekRankAward[index + 1]}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rank;
