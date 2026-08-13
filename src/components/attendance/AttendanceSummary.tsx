import { Users, UserCheck, UserX, Clock, Home } from "lucide-react";

interface Props {
  present: number;
  absent: number;
  halfDay: number;
  wfh: number;
}

export default function AttendanceSummary({
  present,
  absent,
  halfDay,
  wfh,
}: Props) {
  // Total number of employees
  const totalEmployees = present + absent + halfDay + wfh;

  // Summary cards
  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,

      // Blue
      //border: "border-t-blue-500",
      //shadow: "shadow-[0_-4px_12px_rgba(59,130,246,0.20)]",
      iconBg: "bg-white",
      iconColor: "text-blue-600",
    },

    {
      title: "Present",
      value: present,
      icon: UserCheck,

      // Green
      border: "border-t-green-500",
      shadow: "shadow-[0_-4px_12px_rgba(34,197,94,0.20)]",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Absent",
      value: absent,
      icon: UserX,

      // Red
      border: "border-t-red-500",
      shadow: "shadow-[0_-4px_12px_rgba(239,68,68,0.20)]",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },

    {
      title: "Half Day",
      value: halfDay,
      icon: Clock,

      // Yellow
      border: "border-t-yellow-500",
      shadow: "shadow-[0_-4px_12px_rgba(234,179,8,0.22)]",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },

    {
      title: "Work From Home",
      value: wfh,
      icon: Home,

      // Blue
      border: "border-t-blue-500",
      shadow: "shadow-[0_-4px_12px_rgba(59,130,246,0.20)]",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              min-w-0
              rounded-xl
              border
              border-slate-200
              border-t-4
              ${card.border}
              bg-white
              p-5
              shadow-sm
              ${card.shadow}
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-md
            `}
          >
            <div className="flex items-start justify-between gap-3">
              {/* CARD CONTENT */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              {/* CARD ICON */}
              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${card.iconBg}
                  ${card.iconColor}
                `}
              >
                <Icon size={23} strokeWidth={2} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
