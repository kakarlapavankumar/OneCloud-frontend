import type { LeaveRequest, LeaveStatus } from "../../types/leave";

interface LeaveApprovalProps {
  leave: LeaveRequest;

  onStatusChange: (id: string, status: LeaveStatus) => void;
}

const LeaveApproval = ({ leave, onStatusChange }: LeaveApprovalProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onStatusChange(leave.id, "Approved")}
        disabled={leave.status === "Approved"}
        className="
          rounded-md bg-green-50
          px-3 py-2
          text-xs font-semibold
          text-green-700
          transition
          hover:bg-green-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Approve
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(leave.id, "Rejected")}
        disabled={leave.status === "Rejected"}
        className="
          rounded-md bg-red-50
          px-3 py-2
          text-xs font-semibold
          text-red-700
          transition
          hover:bg-red-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Reject
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(leave.id, "Cancelled")}
        disabled={leave.status === "Cancelled"}
        className="
          rounded-md bg-slate-100
          px-3 py-2
          text-xs font-semibold
          text-slate-600
          transition
          hover:bg-slate-200
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Cancel
      </button>
    </div>
  );
};

export default LeaveApproval;
