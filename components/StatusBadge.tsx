interface StatusBadgeProps {
  status: "success" | "pending" | "failed" | "processing";
  label?: string;
}

const statusStyles = {
  success: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
};

export function StatusBadge({
  status,
  label,
}: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status]
      }`}
    >
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
