import Users from "../../../../app/models/Users";
import dbConnect from "../../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const update = { $set: { todayRank: 0 } };
    await Users.updateMany({}, update);

    res.status(200).json({
      result: "success",
      message: "重置总排行榜成功",
      data: {},
    });
  }
}
