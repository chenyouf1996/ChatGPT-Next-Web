import Users from "../../../../app/models/Users";
import dbConnect from "../../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { userName } = req.body;
    const user = await Users.findOne({ userName });
    const updatedUser = await Users.findOneAndUpdate(
      { userName },
      { $set: { integral: user.integral > 0 ? user.integral - 1 : 0 } },
      { new: true },
    );

    res.status(200).json({
      result: "success",
      message: "更新积分成功",
      data: {
        userName: updatedUser.userName,
        integral: updatedUser.integral,
        currentIntegral: user.integral,
      },
    });
  }
}
