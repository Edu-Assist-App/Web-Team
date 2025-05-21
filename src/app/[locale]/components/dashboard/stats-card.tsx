export interface StatsCardProps {
  value: string;
  label: string;
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className=" bg-gradient-to-b from-white to-[#fbf7ff] rounded-[24px] p-6 flex items-center gap-4">
      <div className="min-w-16 min-h-16 max-w-16 max-h-16 rounded-full border-solid border-4 border-purple-400 bg-white flex items-center justify-center text-purple-700 font-bold text-xl">
        {value}
      </div>
      <div>
        <p className="text-gray-900">{label}</p>
      </div>
    </div>
  );
}
