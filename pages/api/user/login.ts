import Users from "@/app/models/Users";
import { base64Encode } from "@/app/utils/tools";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { userName, password } = req.body;

    // 在数据库中查找用户信息
    const user = await Users.findOne({ userName, password });
    const token = base64Encode(userName + Date.now());

    if (user) {
      // 用户验证成功，创建会话
      res.status(200).json({
        result: "success",
        message: "登录成功",
        data: token,
      });
    } else {
      res.status(401).json({ result: "success", message: "用户未注册" });
    }
  }
}
