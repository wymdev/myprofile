"use client";

// Professional SVG Icons like VS Code / Cursor
export const Icons = {
  // File Icons
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <rect width="24" height="24" rx="2" fill="#3178C6" />
      <path
        d="M14.5 12V18H12.5V14H9V18H7V12H14.5ZM17 12C18.1 12 19 12.9 19 14V16C19 17.1 18.1 18 17 18H15V16H17V14H15V12H17Z"
        fill="white"
      />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <rect width="24" height="24" rx="2" fill="#F7DF1E" />
      <path
        d="M12 18L14 16.5C14.3 17.3 14.9 17.7 15.7 17.7C16.4 17.7 16.8 17.4 16.8 16.9C16.8 16.4 16.4 16.1 15.4 15.7C13.8 15.1 12.9 14.3 12.9 12.9C12.9 11.4 14.1 10.3 15.9 10.3C17.3 10.3 18.3 10.9 18.8 12L16.9 13.4C16.6 12.8 16.1 12.4 15.5 12.4C14.9 12.4 14.6 12.7 14.6 13.1C14.6 13.6 15 13.8 15.9 14.2C17.7 14.9 18.6 15.6 18.6 17.1C18.6 18.7 17.3 19.8 15.4 19.8C13.6 19.8 12.4 19 12 18ZM6 10.5H8V17.2C8 18.8 7.1 19.7 5.5 19.7C4.8 19.7 4.2 19.5 3.8 19.2L4.5 17.4C4.7 17.5 5 17.6 5.3 17.6C5.8 17.6 6 17.3 6 16.8V10.5Z"
        fill="#000"
      />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#61DAFB">
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <rect width="24" height="24" rx="2" fill="#264DE4" />
      <path d="M5 3L6.5 18.5L12 21L17.5 18.5L19 3H5ZM15.5 7H8.5L8.7 9H15.3L14.8 15L12 16L9.2 15L9 13H11L11.1 14L12 14.3L12.9 14L13 11H8.9L8.5 7H15.5Z" fill="white" />
    </svg>
  ),
  json: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#F5C518">
      <path d="M5 3H7C8.1 3 9 3.9 9 5V8C9 9.1 9.9 10 11 10V12C9.9 12 9 12.9 9 14V17C9 18.1 8.1 19 7 19H5V17H7V13.5C7 12.7 7.7 12 8.5 12C7.7 12 7 11.3 7 10.5V7H5V5H5M19 5V7H17V10.5C17 11.3 16.3 12 15.5 12C16.3 12 17 12.7 17 13.5V17H19V19H17C15.9 19 15 18.1 15 17V14C15 12.9 14.1 12 13 12V10C14.1 10 15 9.1 15 8V5C15 3.9 15.9 3 17 3H19V5Z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <defs>
        <linearGradient id="pyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path fill="url(#pyGrad1)" d="M11.9 2C7.4 2 7.8 4 7.8 4L7.8 6.1H12V7H5C5 7 2 6.7 2 11.2C2 15.7 4.6 15.5 4.6 15.5H6.3V13.3C6.3 13.3 6.2 10.7 8.9 10.7H12C12 10.7 14.4 10.8 14.4 8.4V4.5C14.4 4.5 14.7 2 11.9 2ZM9.1 3.5C9.6 3.5 10 3.9 10 4.4C10 4.9 9.6 5.3 9.1 5.3C8.6 5.3 8.2 4.9 8.2 4.4C8.2 3.9 8.6 3.5 9.1 3.5Z" />
      <path fill="url(#pyGrad2)" d="M12.1 22C16.6 22 16.2 20 16.2 20V17.9H12V17H19C19 17 22 17.3 22 12.8C22 8.3 19.4 8.5 19.4 8.5H17.7V10.7C17.7 10.7 17.8 13.3 15.1 13.3H12C12 13.3 9.6 13.2 9.6 15.6V19.5C9.6 19.5 9.3 22 12.1 22ZM14.9 20.5C14.4 20.5 14 20.1 14 19.6C14 19.1 14.4 18.7 14.9 18.7C15.4 18.7 15.8 19.1 15.8 19.6C15.8 20.1 15.4 20.5 14.9 20.5Z" />
    </svg>
  ),
  markdown: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#519ABA">
      <path d="M2 4H22V20H2V4ZM4 18H20V6H4V18ZM5 16V8H7L9 11L11 8H13V16H11V11L9 14L7 11V16H5ZM19 12H17V8H15V12H13L16 16L19 12Z" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#C09553">
      <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" />
    </svg>
  ),
  folderOpen: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#DCAD5E">
      <path d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" />
    </svg>
  ),

  // Activity Bar Icons
  files: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.5 0H8.5L7 1.5V6H2.5L1 7.5V22.5L2.5 24H14.5L16 22.5V18H20.5L22 16.5V4.5L17.5 0ZM17.5 2.1L19.9 4.5H17.5V2.1ZM14.5 22.5H2.5V7.5H7V16.5L8.5 18H14.5V22.5ZM8.5 16.5V1.5H16V6H20.5V16.5H8.5Z" transform="scale(0.9) translate(1.3, 1.3)" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M15.25 0C11.31 0 8.12 3.19 8.12 7.13C8.12 8.63 8.59 10.02 9.4 11.18L0 20.58L1.42 22L10.82 12.6C11.98 13.41 13.37 13.88 14.87 13.88C15.1 13.88 15.33 13.87 15.55 13.85L15.25 13.88C19.19 13.88 22.38 10.69 22.38 6.75C22.38 2.81 19.19 0 15.25 0ZM15.25 12.38C12.36 12.38 10.62 10.02 10.62 7.13C10.62 4.24 12.36 1.5 15.25 1.5C18.14 1.5 19.88 4.24 19.88 7.13C19.88 10.02 18.14 12.38 15.25 12.38Z" transform="scale(0.85) translate(2, 2)" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M21.007 8.222A3.738 3.738 0 0 0 17.007 4.222C16.1 4.222 15.258 4.506 14.562 4.998A5.953 5.953 0 0 0 12 4.002A5.955 5.955 0 0 0 9.438 4.998A3.738 3.738 0 0 0 6.993 4.222A3.738 3.738 0 0 0 3.253 7.962C3.253 8.522 3.371 9.055 3.58 9.539A5.953 5.953 0 0 0 6.007 16.002H6.007V21.002H18.007V16.002A5.953 5.953 0 0 0 20.42 9.539C20.629 9.055 20.747 8.522 20.747 7.962C20.747 8.049 21.007 8.222 21.007 8.222ZM12 6.002A3.965 3.965 0 0 1 15.472 8.922A3.725 3.725 0 0 0 17.007 6.222A1.738 1.738 0 1 1 17.007 9.698A3.965 3.965 0 0 1 12 14.002A3.965 3.965 0 0 1 6.993 9.698A1.738 1.738 0 1 1 6.993 6.222A3.725 3.725 0 0 0 8.528 8.922A3.965 3.965 0 0 1 12 6.002Z" />
    </svg>
  ),
  extensions: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M13.5 1.5L15 0H22.5L24 1.5V9L22.5 10.5H15L13.5 9V1.5ZM15 1.5V9H22.5V1.5H15ZM0 15L1.5 13.5H9L10.5 15V22.5L9 24H1.5L0 22.5V15ZM1.5 15V22.5H9V15H1.5ZM13.5 15L15 13.5H22.5L24 15V22.5L22.5 24H15L13.5 22.5V15ZM15 15V22.5H22.5V15H15ZM1.5 0L0 1.5V9L1.5 10.5H9L10.5 9V1.5L9 0H1.5ZM1.5 1.5H9V9H1.5V1.5Z" transform="scale(0.85) translate(2, 2)" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C14 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" />
    </svg>
  ),

  // UI Icons
  chevronRight: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
    </svg>
  ),
  splitHorizontal: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3 3H21V21H3V3ZM5 5V19H11V5H5ZM13 5V19H19V5H13Z" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" />
    </svg>
  ),

  // Status Bar Icons
  gitBranch: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M15 4C13.9 4 13 4.9 13 6C13 6.74 13.4 7.39 14 7.73V9.43C13.37 9.19 12.7 9 12 9C9.24 9 7 11.24 7 14V16.27C6.4 16.61 6 17.26 6 18C6 19.1 6.9 20 8 20C9.1 20 10 19.1 10 18C10 17.26 9.6 16.61 9 16.27V14C9 12.35 10.35 11 12 11C12.7 11 13.37 11.19 14 11.43V16.27C13.4 16.61 13 17.26 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 17.26 16.6 16.61 16 16.27V7.73C16.6 7.39 17 6.74 17 6C17 4.9 16.1 4 15 4Z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z" />
    </svg>
  ),

  // VS Code Logo
  vscode: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.583 2.177L7.32 10.696.45 5.697l-.45.612L6.9 11.75.001 17.19l.45.612 6.87-4.999 10.262 8.52L24 17.42V5.58l-6.417-3.403zM17 18.77l-8.5-7.02L17 4.73v14.04z" />
    </svg>
  ),
};

// File extension to icon mapping
export const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
      return Icons.typescript;
    case "js":
    case "jsx":
      return Icons.react;
    case "css":
    case "scss":
      return Icons.css;
    case "json":
      return Icons.json;
    case "py":
      return Icons.python;
    case "md":
      return Icons.markdown;
    default:
      return Icons.typescript;
  }
};

