import type { LeaveRequest } from "../../types/leave";

interface LeaveSummaryProps {
  leaveRequests: LeaveRequest[];
}

const LeaveSummary = ({ leaveRequests }: LeaveSummaryProps) => {
  const totalRequests = leaveRequests.length;

  const pendingRequests = leaveRequests.filter(
    (leave) => leave.status === "Pending",
  ).length;

  const approvedRequests = leaveRequests.filter(
    (leave) => leave.status === "Approved",
  ).length;

  const rejectedRequests = leaveRequests.filter(
    (leave) => leave.status === "Rejected",
  ).length;

  const approvedDays = leaveRequests
    .filter((leave) => leave.status === "Approved")
    .reduce((total, leave) => total + leave.totalDays, 0);

  const cards = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: "📋",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingRequests,
      icon: "⏳",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Approved",
      value: approvedRequests,
      icon: "✓",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Rejected",
      value: rejectedRequests,
      icon: "✕",
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Approved Days",
      value: approvedDays,
      icon: "📅",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.bg} ${card.iconColor} text-lg`}
            >
              {card.icon}
            </div>

            <div>
              <p className="text-sm text-slate-500">{card.title}</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {card.value}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveSummary;
