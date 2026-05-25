"use client";

import { addWatches } from "@/utils/addWatches";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  async function clientAddWatch(formData: FormData) {
    const { error, success } = await addWatches(formData);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);

      router.push("/");

      setImageUrl("");
    }
  }

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1MB is not allowed");
      } else {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  return (
    <form
      action={clientAddWatch}
      className="w-full max-w-3xl mx-auto space-y-6 flex flex-col p-4 border rounded-lg border-gray-300 bg-white text-black"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Preview"
          width={100}
          height={100}
          className="w-full max-h-80 object-cover rounded-lg"
          priority
        />
      )}
      <div className="flex flex-col gap-4 w-full">
        <label htmlFor="image">Watch Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handlePreview}
          id="image"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
          placeholder="Choose Image"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Watch Name"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter Watch Price"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          name="link"
          id="link"
          placeholder="Enter Watch Link"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter Watch Description"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500 bg-black text-white cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
