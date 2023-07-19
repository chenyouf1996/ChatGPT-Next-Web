import Users from "../../../app/models/Users";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const users = await Users.find({});
    const resUsers = users.map((userItem) => {
      const { userName, todayRank, totalRank } = userItem;
      return { userName, todayRank, totalRank };
    });
    
    res.status(200).json({
      result: "success",
      message: "获取所有用户成功",
      data: resUsers,
    });
  }
}
