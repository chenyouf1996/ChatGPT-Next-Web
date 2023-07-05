import Users from "../../../app/models/Users";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { userName, password, email } = req.body;
    const users = new Users({ userName, password, email, integral: 0 });
    await users.save();
    res
      .status(201)
      .json({ result: "success", message: "创建用户成功", data: { userName } });
  }
}
