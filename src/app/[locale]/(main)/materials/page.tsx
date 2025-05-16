import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import { NewMaterialForm } from "../../components/new-material/new-material-form";

export default function NewMaterialPage() {
  const cardContent = {
    title: "Start Building Your Study Material",
    description: "Turn Your Ideas Into Structured Courses in Minutes",
    imageUrl: "/puzzle.svg",
    haveProgress: false,
    chapters: 3,
    progress: 0,
  };
  return (
    <div className="container w-[70%] mx-auto p-12 max-w-4xl flex flex-col gap-6">
      {/* Header Section */}
      <CtaCard {...cardContent} />

      {/* Form Section */}
      <NewMaterialForm />
    </div>
  );
}
