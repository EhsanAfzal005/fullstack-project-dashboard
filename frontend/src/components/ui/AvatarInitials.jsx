import { getInitials, getColorIndex } from '../../utils/helpers';
import { AVATAR_COLORS } from '../../utils/constants';

export default function AvatarInitials({
  name,
  profilePicture,
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
    xl: 'h-24 w-24 text-3xl',
  };

  if (profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-slate-800 ${className}`}
      />
    );
  }

  const colorIndex = getColorIndex(name);
  const bgColor = AVATAR_COLORS[colorIndex];

  return (
    <div
      className={`
        ${sizes[size]} ${bgColor}
        rounded-full flex items-center justify-center
        font-semibold text-white
        ring-2 ring-white dark:ring-slate-800
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
}
