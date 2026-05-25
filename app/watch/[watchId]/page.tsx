"use client";

import Product from "@/components/Product";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Watch {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const WatchDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    await axios
      .delete(`/api/watch/${params.watchId}`)
      .then(() => {
        toast.success("Watch deleted successfully");
        router.push("/");
      })
      .catch(() => {
        toast.error("Failed to delete watch");
      });
  };

  useEffect(() => {
    if (!params.watchId) return;

    setLoading(true);
    axios
      .get(`/api/watch/${params.watchId}`)
      .then((res) => {
        setWatch(res.data.watch);
      })
      .catch((err) => {
        console.error("Error fetching watch:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.watchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Watch not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 lg:px-12 bg-white min-h-screen pb-12 pt-4">
      {/* Back button */}
      <div className="max-w-7xl mx-auto">
        <button
          className="cursor-pointer text-xl py-4 md:py-6 hover:text-gray-600 transition-colors"
          onClick={() => router.back()}
        >
          &larr; Go back
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="w-full md:w-1/2">
            <Image
              src={watch.image}
              alt={watch.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover shadow-sm rounded-xl"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            {/* Header with dropdown */}
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 flex-1">
                {watch.name}
              </h1>

              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer text-2xl font-bold tracking-widest hover:text-gray-600 px-4"
                >
                  ...
                </button>

                {open && (
                  <div className="absolute bg-white shadow-lg rounded-md text-center min-w-[120px] right-[-18px] top-12 z-10 border border-gray-200">
                    <Link
                      href={`/watch/${watch._id}/update`}
                      className="block py-2 border-b border-gray-200 cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      Update
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="w-full text-center py-2 border-b border-gray-200 text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-md md:text-xl lg:text-2xl font-semibold text-gray-900">
              Rs. {watch.price.toLocaleString()}
            </h3>

            <Link href={watch.link} target="_blank" className="block">
              <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors text-base md:text-lg font-medium w-full md:w-auto">
                Contact Seller
              </button>
            </Link>

            <div className="space-y-4">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Click the button to contact the seller and check the latest
                price and availability.
              </p>
              <p className="text-lg md:text-base text-gray-700 leading-relaxed mt-4">
                {watch.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 md:mt-20">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-8 text-gray-900">
          You might be interested in these too
        </h2>
        <Product layout="horizontal" limit={6} />
      </div>
    </div>
  );
};

export default WatchDetailsPage;
