import Users from "../../../app/models/Users";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "PUT") {
    const { userName } = req.query;
    const user = await Users.findOne({ userName });

    res.status(200).json({
      result: "success",
      message: "查找用户成功",
      data: {
        userName: user.userName,
        integral: user.integral,
      },
    });
  }
}
