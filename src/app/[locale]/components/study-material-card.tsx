import { Button } from "@/app/[locale]/components/ui/button";
import { MoreVerticalIcon, OptionIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface StudyMaterialCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function StudyMaterialCard({
  id,
  title,
  description,
  image,
}: StudyMaterialCardProps) {
  const t = useTranslations("Dashboard"); // Using Resource translations from your JSON
  return (
    <div className="flex flex-col items-start gap-[13.24px] p-1 rounded-[10.39px]">
      <div className="relative w-full">
        <div
          className="w-full h-[194.64px] rounded-lg bg-cover bg-left-bottom-0 bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
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
            {description}
          </p>
        </div>
      </div>

      <Button className="px-6 py-2 bg-[#3800b3] rounded-[99px] text-white font-['Poppins',Helvetica] font-medium text-xs">
        {t("studyMaterials.view")}
      </Button>
    </div>
  );
}
