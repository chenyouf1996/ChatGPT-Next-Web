import Users from "../../../../app/models/Users";
import dbConnect from "../../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { rankList } = req.body;
    const failList = [];
    for (let index = 0; index < rankList.length; index++) {
      const rankItem = rankList[index];
      const { userName, todayRank } = rankItem;
      const filter = { userName };
      const update = { $set: { todayRank }, $inc: { totalRank: todayRank } };
      const options = { upsert: true };
      try {
        await Users.findOneAndUpdate(filter, update, options);
      } catch (error) {
        failList.push(userName);
      }
    }

    res.status(200).json({
      result: "success",
      message: "更新排行榜成功",
      data: { failList },
    });
  }
}
