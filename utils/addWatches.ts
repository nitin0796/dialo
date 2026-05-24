"use server";

import connectDB from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import WatchesModel from "@/app/api/models/watches.model";

export const addWatches = async (formData: FormData) => {
  try {
    await connectDB();

    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!image || !name || !price || !link || !description) {
      console.log("All field are required");

      return {
        error: "All field are required",
      };
    }

    await connectDB();

    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageResponse = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "Dialo",
            },
            async (error, result) => {
              if (error) {
                return reject(error.message);
              }
              return resolve(result as { secure_url: string });
            },
          )
          .end(buffer);
      },
    );

    console.log("Image Response: ", imageResponse);

    // store in DB
    await WatchesModel.create({
      image: imageResponse.secure_url,
      name,
      price,
      link,
      description,
    });

    return { success: "Watch added Successfully" };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
};
