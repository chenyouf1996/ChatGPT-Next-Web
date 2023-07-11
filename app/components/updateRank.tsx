import { useState } from "react";
import { read, utils } from "xlsx";
import styles from "./rank.module.scss";

const UpdateRank = () => {
  const [rankList, setRankList] = useState<any>([]);

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
          rankMap[userName].rank += Number(todayRank);
        }
      });

      setRankList(Object.values(rankMap));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Excel Upload Demo</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <div className={styles["rank"]}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
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
