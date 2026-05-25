"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q", e.target.value);

    const searchQuery = urlParams.toString();

    router.push(`/search?${searchQuery}`);
    try {
    } catch (error) {
      console.log("Error in search", error);
    }
  };

  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link
          href={"/"}
          className="hidden md:inline-block text-lg font-semibold"
        >
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={120}
            className="rounded-full object-contain w-full"
          />
        </Link>
        <div className="relative max-w-[300px] md:2-[400px]">
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            onChange={handleChange}
            className="h-9 relative pl-10 border-2 border-black/60 text-sm rounded-2xl w-full px-3 py-3 focus:outline-none bg-tra"
            placeholder="Search"
          />
        </div>

        <Link href={"/add-watches"}>
          <button className="bg-black text-white px-3 py-2 rounded-lg cursor-pointer">
            Add Watches
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
