import { NextRequest } from "next/server";
import connectDB from "@/app/api/db/connectDB";
import WatchesModel from "../models/watches.model";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q");

    const watch = await WatchesModel.find({
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    }).sort({ createdAt: -1 });

    return Response.json(
      {
        watch,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("Error in search:", error);

    return Response.json(
      {
        message: error.message,
      },
      { status: 400 },
    );
  }
};
