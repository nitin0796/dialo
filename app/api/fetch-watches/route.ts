import connectDB from "../db/connectDB";
import WatchesModel from "../models/watches.model";

export const GET = async (request: Request) => {
  await connectDB();

  try {
    const watch = await WatchesModel.find({}).sort({ createdAt: -1 });

    return Response.json({ watch }, { status: 200 });
  } catch (error: any) {
    console.log("Error fetching watches");

    return Response.json({message: error.message},{ status: 400 });
  }
};
