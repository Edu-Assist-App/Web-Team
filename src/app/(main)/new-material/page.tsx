import { NewMaterialForm } from "../../../components/new-material/new-material-form"

export default function NewMaterialPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 mb-8 flex items-center gap-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <img src="/puzzle-icon.png" alt="Puzzle Icon" className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Start Building Your Study Material</h1>
          <p className="text-gray-600">Turn Your Ideas Into Structured Courses in Minutes</p>
        </div>
      </div>

      {/* Form Section */}
      <NewMaterialForm />
    </div>
  )
}
