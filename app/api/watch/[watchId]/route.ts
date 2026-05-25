import cloudinary from "@/utils/cloudinary";
import connectDB from "../../db/connectDB";
import WatchesModel from "../../models/watches.model";
import { NextRequest } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ watchId: string }> },
) => {
  await connectDB();
  const { watchId } = await params;

  try {
    const watch = await WatchesModel.findById(watchId);

    if (!watch) {
      return Response.json({ message: "Watch not found" }, { status: 404 });
    }

    return Response.json({ watch }, { status: 200 });
  } catch (error: any) {
    console.log("Error in watch details", error);

    return Response.json({ error: error.message }, { status: 400 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ watchId: string }> },
) => {
  try {
    await connectDB();
    const { watchId } = await params;

    if (!watchId) {
      return Response.json(
        { message: "Watch ID is required" },
        { status: 400 },
      );
    }

    const watch = await WatchesModel.findById(watchId);

    if (!watch) {
      return Response.json({ message: "Watch not found" }, { status: 404 });
    }

    const publicId =
      watch.imagePublicId || watch.image.split("/").pop()?.split(".")[0];

    if (publicId) {
      try {
        const cloudinaryResult = await cloudinary.uploader.destroy(
          `Dialo/${publicId}`,
        );
        console.log("Cloudinary Image Deleted:", cloudinaryResult);
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary deletion failed but continuing DB delete:",
          cloudinaryError,
        );
      }
    }

    await WatchesModel.findByIdAndDelete(watchId);

    return Response.json(
      { message: "Watch and its image deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error in watch delete API:", error);
    return Response.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
};
