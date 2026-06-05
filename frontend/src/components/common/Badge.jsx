import { STATUS_COLORS } from '../../utils/constants';

export default function Badge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.Pending;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium
        ${colors.bg} ${colors.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
      {status}
    </span>
  );
}
