"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Watch {
  _id: string;
  image: string;
  name: string;
  price: number;
}

interface ProductProps {
  layout?: "grid" | "horizontal";
  limit?: number;
}

const Product = ({ layout = "grid", limit }: ProductProps) => {
  const [watch, setWatch] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/fetch-watches");

        const watches = limit
          ? response.data.watch.slice(0, limit)
          : response.data.watch;

        setWatch(watches || []);
      } catch (err: any) {
        console.error("Error fetching watches:", err);
        setError("Failed to load watches");
      } finally {
        setLoading(false);
      }
    };

    fetchWatches();
  }, [limit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (watch.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-xl text-gray-600">No watches found</p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div id="product" className="bg-white text-black py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {watch.map((el: Watch) => (
              <ProductCard key={el._id} watch={el} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide scroll-snap-x -mx-4 px-4">
      <div className="flex gap-6 pb-4">
        {watch.map((el: Watch) => (
          <div
            key={el._id}
            className="flex-shrink-0 w-[280px] sm:w-[320px] scroll-snap-item"
          >
            <ProductCard watch={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ watch }: { watch: Watch }) => {
  return (
    <Link href={`/watch/${watch._id}`} className="block group">
      <div className="bg-gray-50 rounded-md p-4 md:p-6 mb-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Image
          src={watch.image}
          alt={watch.name}
          width={400}
          height={400}
          className="w-full h-auto rounded-md object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="text-center px-2">
        <h3 className="text-lg md:text-xl font-medium mb-1 group-hover:text-black/80 transition-colors line-clamp-1">
          {watch.name}
        </h3>
        <p className="text-base md:text-lg text-gray-800 font-semibold">
          Rs {watch.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default Product;
