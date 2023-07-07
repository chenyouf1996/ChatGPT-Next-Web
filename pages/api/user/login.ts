import CryptoJs from "crypto-js";
import Users from "@/app/models/Users";
import dbConnect from "../../../app/db";

// 密钥，用于加密和解密Token
const SECRET_KEY = "cyf-chatgpt";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { token } = req.body;

    if (token) {
      const decryptedPayload = CryptoJs.AES.decrypt(token, SECRET_KEY).toString(
        CryptoJs.enc.Utf8,
      );
      const userInfo = JSON.parse(decryptedPayload || "{}");
      const { userName, password } = userInfo;
      const user = await Users.findOne({ userName, password });
      if (user) {
        res.status(200).json({
          result: "success",
          message: "登录成功",
          data: { userName: user.userName, integral: user.integral },
        });
      } else {
        res.status(401).json({ result: "fali", message: "登录过期" });
      }
    } else {
      // 在数据库中查找用户信息
      const { userName, password } = req.body;
      const user = await Users.findOne({ userName, password });
      if (user) {
        // 用户验证成功，生成token
        const payloadString = JSON.stringify({ userName, password });
        const token = CryptoJs.AES.encrypt(
          payloadString,
          SECRET_KEY,
        ).toString();
        res.status(200).json({
          result: "success",
          message: "登录成功",
          data: { token, userName: user.userName, integral: user.integral },
        });
      } else {
        res.status(401).json({ result: "fail", message: "用户未注册" });
      }
    }
  }
}
