/**
 * Central icon set — line icons drawn from the brand HTML files.
 * Usage: <Icon name="leaf" />
 */
const PATHS = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  cart: (<><path d="M3 4h2l2.5 12.5a1 1 0 001 .8h9.4a1 1 0 001-.78L21 8H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M20 6L9 17l-5-5" />,
  leaf: <path d="M12 3C7 6 4 11 4 15c0 3 2 5 5 5 5 0 8-4 8-9 0-3-1-6-5-8z" />,
  leafStem: (<><path d="M12 3C7 6 4 11 4 15c0 3 2 5 5 5 5 0 8-4 8-9 0-3-1-6-5-8z" /><path d="M12 8v10" /></>),
  sprout: (<><path d="M12 22V12" /><path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z" /><path d="M12 12c0 0 5-2 7-6-4 0-7 2-7 6z" /></>),
  herb: (<><path d="M12 21V9" /><path d="M12 9c-3-.5-4.5-3-4-6.5" /><path d="M12 12.5c3-.5 4.5-3 4-6.5" /><path d="M12 15.5c-2.5-.3-3.7-2.4-3.3-4.7" /><path d="M12 18c2.5-.3 3.7-2.4 3.3-4.7" /></>),
  molecule: (<><circle cx="6" cy="8" r="2" /><circle cx="17" cy="6" r="2" /><circle cx="15" cy="17" r="2" /><circle cx="6.5" cy="17" r="1.6" /><path d="M7.7 9.4l7.4-2.6M14.8 8l.5 7.2M13 17H8.3" /></>),
  drop: <path d="M12 2.5c-3.8 5.3-6.5 9-6.5 12A6.5 6.5 0 0 0 18.5 14.5c0-3-2.7-6.7-6.5-12z" />,
  jar: (<><path d="M8 9V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V9" /><rect x="6" y="9" width="12" height="11" rx="2" /><path d="M6 13.5h12" /></>),
  flask: <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />,
  pin: (<><path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></>),
  mail: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006.3 6.3l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />,
  truck: (<><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  dollar: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  xCircle: (<><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>),
  shield: (<><path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3z" /><path d="M9 12l2 2 4-4" /></>),
  shieldPlain: <path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3z" />,
  recycle: (<><path d="M17 2l4 4-4 4" /><path d="M21 6H8a4 4 0 0 0-4 4v1" /><path d="M7 22l-4-4 4-4" /><path d="M3 18h13a4 4 0 0 0 4-4v-1" /></>),
  root: (<><circle cx="12" cy="9" r="3" /><path d="M12 12v8" /><path d="M8 21h8" /><path d="M12 3v3" /></>),
  person: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>),
  gift: (<><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8V5a3 3 0 0 0-6 0v3M12 8V5a3 3 0 0 1 6 0v3" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></>),
  home: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>),
  bag: (<><path d="M6 2l1.5 3h9L18 2" /><path d="M3 6h18l-1.5 14a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2L3 6z" /></>),
  lock: (<><rect x="3" y="10" width="18" height="11" rx="1" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /><circle cx="12" cy="15" r="1.4" /></>),
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  globe: (<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
  tag: (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1.5" /></>),
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  sun: (<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>),
  hair: <path d="M9 3C9 3 7 7 7 12s2 9 2 9M12 3c0 0-1 4-1 9s1 9 1 9M15 3c0 0 2 4 2 9s-2 9-2 9" />,
  bottle: (<><path d="M9 3h6l1 8H8L9 3z" /><path d="M8 11c0 5 2 8 4 8s4-3 4-8" /></>),
  print: (<><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>),
  edit: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" /></>),
  trash: (<><path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /></>),
  eye: (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>),
  eyeOff: (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><path d="M1 1l22 22" /></>),
  box: (<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>),
  alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>),
  ban: (<><circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" /></>),
  logout: (<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>),
  external: (<><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>),
  upload: (<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>),
  users: (<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>),
  arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  facebook: <path d="M15 8h-2a2 2 0 00-2 2v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.4.3-1 1-1h2z" />,
  instagram: (<><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.4" /><circle cx="16.2" cy="7.8" r="0.6" fill="currentColor" /></>),
  tiktok: (<><path d="M15 4v10.8a3.6 3.6 0 11-3.1-3.57" /><path d="M15 4c.4 2.4 2.3 4.2 4.6 4.4" /></>),
  youtube: (<><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.3 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" /></>)
};

export default function Icon({ name, size, strokeWidth = 1.5, className, style }) {
  const content = PATHS[name];
  if (!content) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
