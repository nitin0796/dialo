"use client";

import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";

const UpdateWatch = () => {
  const params = useParams();
  return (
    <div className="px-4 md:px-12 bg-white py-20 lg:py-28">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-black text-center">
        Update Watch
      </h2>

      <UpdateForm watchId={params.watchId as string} />
    </div>
  );
};

export default UpdateWatch;
