"use client";

import { updateWatch } from "@/utils/updateWatch";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Watch {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const UpdateForm = ({ watchId }: { watchId: string }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [watch, setWatch] = useState<Watch | null>(null);

  const router = useRouter();

  async function clientAddWatch(formData: FormData) {
    const { error, success } = await updateWatch(formData, watchId);

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
        toast.error("Image greater than 1mb is not allowed");
      } else {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/api/watch/${watchId}`)
      .then((res) => {
        setWatch(res.data.watch);
      })
      .catch((err) => toast.error(err));
  }, []);

  useEffect(() => {
    if (watch) {
      setImageUrl(watch.image);
    }
  }, [watch]);

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
          defaultValue={watch?.image}
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
          defaultValue={watch?.name}
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
          defaultValue={watch?.price}
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
          defaultValue={watch?.link}
          placeholder="Enter Watch Link"
          className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          defaultValue={watch?.description}
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

export default UpdateForm;
