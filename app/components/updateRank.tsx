import { useState } from "react";
import { read, utils } from "xlsx";
import styles from "./rank.module.scss";
import useRank from "../hooks/useRank";
import { showToast } from "./ui-lib";

const UpdateRank = () => {
  const [rankList, setRankList] = useState<any>([]);
  const { update, reset } = useRank();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      const rankMap: any = {};

      jsonData.forEach((row: any) => {
        const userName = row["提交者（自动）"];
        const todayRank = row["今日关注数量：（必填）"];

        if (!rankMap[userName]) {
          rankMap[userName] = { userName, todayRank: todayRank };
        } else {
          rankMap[userName].todayRank += Number(todayRank);
        }
      });

      setRankList(Object.values(rankMap));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpdate = () => {
    update(rankList).then((res: any) => {
      console.log(res);
      showToast(`更新排行榜完成失败数${res?.failList?.length || 0}`);
    });
  };

  const handleReset = () => {
    reset().then(() => {
      showToast(`重置排行榜成功`);
    });
  };

  return (
    <div>
      <h2>上传排行榜数据</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <button disabled={!rankList.length} onClick={handleUpdate}>
        更新排行榜数据
      </button>
      <button style={{ marginLeft: "10px" }} onClick={handleReset}>
        重置总排行榜数据
      </button>
      <div className={styles["rank"]}>
        <table>
          <thead>
            <tr>
              <th>用户名</th>
              <th>今日排行榜数据</th>
            </tr>
          </thead>
          <tbody>
            {rankList.map((rankItem: any) => (
              <tr key={rankItem.userName}>
                <td>{rankItem.userName}</td>
                <td>{rankItem.todayRank}</td>
                <td>{rankItem.totalRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateRank;
