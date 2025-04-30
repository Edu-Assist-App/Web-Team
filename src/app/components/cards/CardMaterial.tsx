import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

type CardMaterial = {
  status: boolean | false;
  title: string | "Create your first study material now!";
  description: string | "Create your first study material now!";
  imageUrl: string | "/puzzle-icon.png";
};
export default function CardMaterial({
  status,
  title,
  description,
  imageUrl,
}: CardMaterial) {
  return (
    <div className="min-w-[calc(50%-8px)] sm:min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-16px)] snap-start">
      <Card className="relative overflow-hidden border border-gray-200 h-full">
        <div className="absolute top-2 left-2 rounded-full">
          <span
            className={`${
              status ? "bg-green-500 text-white" : "bg-gray-50 text-black"
            } rounded-md text-xs px-3 py-2}`}
          >
            {status ? "Ready" : "Not Generated"}
          </span>
        </div>
        <div className="p-6 pt-10 flex flex-col items-center text-center h-full">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <Image src={imageUrl} alt="" width={64} height={64} />
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="mt-auto">
            <button className="bg-[#3900B3] hover:bg-indigo-800 text-white rounded-full px-6">
              View
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
