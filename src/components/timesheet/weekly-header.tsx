type WeeklyHeaderProps = {
  weekRange: string;
  totalHours: number;
  expectedHours: number;
  progressPercentage: number;
};

export function WeeklyHeader({
  weekRange,
  totalHours,
  expectedHours,
  progressPercentage,
}: WeeklyHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">This week&apos;s timesheet</h1>
        <p className="mt-2 text-sm text-slate-500">{weekRange}</p>
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Progress</span>
          <span className="text-sm font-semibold text-slate-900">
            {totalHours}/{expectedHours} hrs
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${progressPercentage}%` }} />
        </div>
        <p className="mt-3 text-right text-sm font-medium text-blue-700">{progressPercentage}%</p>
      </div>
    </div>
  );
}
