export interface StatsCardProps {
  value: string
  label: string
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
        {value}
      </div>
      <div>
        <p className="text-gray-700">{label}</p>
      </div>
    </div>
  )
}
