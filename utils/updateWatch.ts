"use server";

import connectDB from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import WatchesModel from "@/app/api/models/watches.model";

export const updateWatch = async (formData: FormData, id: string) => {
  try {
    await connectDB();

    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!name || !price || !link || !description) {
      console.log("All field are required");

      return {
        error: "All field are required",
      };
    }

    await connectDB();

    const watch = await WatchesModel.findById(id);

    if (!watch) {
      return {
        error: "Watch not found",
      };
    }

    if (image.size === 0) {
      await WatchesModel.findByIdAndUpdate(id, {
        name,
        price,
        link,
        description,
      });

      return {
        success: "Watch updated Successfully",
      };
    } else {
      const parts = watch.image.split("/");
      const fileName = parts[parts.length - 1].split(".")[0];
      const imagePublicId = fileName.split("-")[0];

      await cloudinary.uploader
        .destroy(`Dialo/${imagePublicId}`)
        .then((result) => {
          console.log("Image deleted successfully", result);
        })
        .catch((error) => {
          console.log(error);
        });
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
      await WatchesModel.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        name,
        price,
        link,
        description,
      });

      return { success: "Watch updated Successfully" };
    }
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
};
