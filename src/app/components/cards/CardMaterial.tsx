"use client";

import React, { useCallback } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type CardMaterial = {
  status?: boolean;
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
};

export default function CardMaterial({
  status = false,
  title = "Create your first study material now!",
  description = "Create your first study material now!",
  imageUrl = "/puzzle-icon.png",
  url = "/",
}: CardMaterial) {
  const router = useRouter();
  const params = useParams();

  // Memoize the navigation function
  const goTo = useCallback(() => {
    router.push(`/materials/${params.id}/${url}`);
  }, [router, params.id, url]);

  return (
    <div className="min-w-[calc(50%-8px)] sm:min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-16px)] snap-start">
      <Card className="relative overflow-hidden border border-gray-200 h-full">
        <div className="absolute top-2 left-2 rounded-full">
          <span
            className={`${
              status ? "bg-green-500" : "bg-gray-50"
            } text-xs px-3 py-2 rounded-md ${
              status ? "text-white" : "text-black"
            }`}
          >
            {status ? "Ready" : "Not Generated"}
          </span>
        </div>
        <div className="p-6 pt-10 flex flex-col items-center text-center h-full">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <Image
              src={imageUrl}
              alt=""
              width={64}
              height={64}
              priority // Add priority for above-the-fold images
            />
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="mt-auto">
            <button
              onClick={goTo}
              className="bg-[#3900B3] hover:bg-indigo-800 text-white rounded-full px-6 py-2 transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
