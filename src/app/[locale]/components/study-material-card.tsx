import { Button } from "@/app/[locale]/components/ui/button";
import {
  generateLearningPathOutline,
  getLearningPathByCourseId,
} from "@/app/Services/api/learningpath";
import { LoaderCircle, MoreVerticalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface StudyMaterialCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export function StudyMaterialCard({
  id,
  title,
  description,
  image,
}: StudyMaterialCardProps) {
  const t = useTranslations("Dashboard");
  const [viewTxt, setViewText] = useState(t("studyMaterials.view"));

  const viewhandler = async () => {
    // Handle view action, e.g., navigate to detail page
    console.log(`Viewing study material with ID: ${id}`);
    const data = await getLearningPathByCourseId(id);
    console.log("Learning Path Data:", data);
    if (data.id) {
      window.location.href = `/materials/${data.id}`;
    } else {
      setViewText("Generating ...");
      const data = await generateLearningPathOutline(id);
      console.log("Generated Learning Path Data:", data);
    }
  };

  // Helper to truncate long text
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Generate unique HSL color and shape variation from title
  const hue = (title.charCodeAt(0) * 37 + title.length * 19) % 360;
  const shapeId = title.length % 3; // Choose a shape style
  const initials = title.slice(0, 2).toUpperCase();

  const renderDynamicImage = () => {
    return (
      <div
        className="w-full h-[194.64px] rounded-lg relative overflow-hidden flex items-center justify-center text-white font-bold text-3xl"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${
            (hue + 45) % 360
          }, 70%, 40%))`,
        }}
      >
        {/* Initials */}
        <span className="z-10">{initials}</span>

        {/* Abstract Shape Layer */}
        {shapeId === 0 && (
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-6 left-6 rotate-12" />
        )}
        {shapeId === 1 && (
          <div
            className="absolute w-32 h-32 bg-white opacity-10 rotate-45 top-[-20px] right-[-20px]"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        )}
        {shapeId === 2 && (
          <div className="absolute w-[120px] h-[60px] bg-white opacity-10 bottom-4 left-4 rotate-[25deg] rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start gap-[13.24px] p-1 rounded-[10.39px] sm:w-full">
      <div className="relative w-full">
        {image ? (
          <div
            className="w-full h-[194.64px] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          renderDynamicImage()
        )}
        <Button
          variant="outline"
          size="icon"
          className="p-1.5 absolute top-2 right-2 bg-[#f9f9f9] rounded-[28px] border border-solid border-[#00000003]"
        >
          <MoreVerticalIcon />
        </Button>
      </div>

      <div className="flex flex-col items-start gap-[9.93px] p-0 w-full">
        <div className="flex flex-col items-start justify-center gap-[5.56px] w-full">
          <h4 className="font-['Poppins',Helvetica] font-medium text-[#000000d4] text-base w-full">
            {title}
          </h4>
          <p className="font-['Poppins',Helvetica] font-normal text-[#000000b2] text-[12px] w-full">
            {truncate(description, 100)}
          </p>
        </div>
      </div>
      {/* <div>id:{id}</div> */}

      <Button
        onClick={() => {
          viewhandler();
        }}
        className="px-6 py-2 bg-[#3800b3] rounded-[99px] text-white font-['Poppins',Helvetica] font-medium text-xs"
      >
        <span className="sr-only animate-spin">
          <LoaderCircle />
        </span>
        {viewTxt}
      </Button>
    </div>
  );
}
