import Keys from "../../../app/models/Keys";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    const { keyList } = req.body;

    for (let index = 0; index < keyList.length; index++) {
      const keyItem = keyList[index];
      const filter = { key: keyItem.key }; // 根据name字段进行匹配
      const update = { $set: keyItem }; // 更新为整个文档

      await Keys.updateOne(filter, update, { upsert: true });
    }

    res.status(200).json({
      result: "success",
      message: "插入key成功",
      data: {},
    });
  }
}
