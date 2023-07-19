import Keys from "../../../app/models/Keys";
import dbConnect from "../../../app/db";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === "POST") {
    // const { keyList } = req.body;

    const data = await Keys.aggregate([{ $sample: { size: 1 } }]);

    res.status(200).json({
      result: "success",
      message: "",
      data: data?.[0]?.key || "",
    });
  }
}
