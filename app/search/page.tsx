"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Watch {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const SearchPage = () => {
  const [watch, setWatch] = useState<Watch[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlParams = searchParams.get("q");

    if (urlParams) {
      const res = axios.get(`api/search?q=${urlParams}`).then((res) => {
        setWatch(res.data.watch);
      });
    }
  }, [searchParams]);
  return (
    <div id="product" className="bg-white text-black">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {watch.map((el: Watch, key) => (
            <Link href={`/watch/${el._id}`} key={key} className="block group">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 relative overflow-hidden shadow-2xs">
                <Image
                  src={el.image}
                  alt={el.name}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-md object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center px-2">
                <h3 className="text-lg md:text-xl font-medium mb-1 group-hover:text-black/80 transition-colors">
                  {el.name}
                </h3>
                <p className="text-base md:text-lg text-gray-800 font-semibold">
                  Rs {el.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
