export function Label({ keyValue, value }: { keyValue: string; value: any }) {
  return (
    <div className="flex gap-2">
      <span>{keyValue}:</span>
      <span>{value}</span>
    </div>
  );
}
export function IconLabel({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: any;
}) {
  return (
    <div className="flex gap-2">
      <span>{value}</span>
      {icon}
    </div>
  );
}
