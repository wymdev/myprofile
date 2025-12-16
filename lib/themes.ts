export interface Theme {
  id: string;
  name: string;
  colors: {
    editorBg: string;
    editorFg: string;
    sidebarBg: string;
    activitybarBg: string;
    titlebarBg: string;
    tabActiveBg: string;
    tabInactiveBg: string;
    borderColor: string;
    borderSubtle: string;
    selectionBg: string;
    listHover: string;
    listActive: string;
    accent: string;
    accentFg: string;
    statusbarBg: string;
    statusbarFg: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    syntaxKeyword: string;
    syntaxString: string;
    syntaxNumber: string;
    syntaxFunction: string;
    syntaxVariable: string;
    syntaxType: string;
    syntaxComment: string;
    terminalBg: string;
    terminalFg: string;
    terminalGreen: string;
    terminalRed: string;
    terminalYellow: string;
    terminalBlue: string;
  };
}

export const themes: Theme[] = [
  {
    id: "dark-default",
    name: "Dark+ (Default)",
    colors: {
      editorBg: "#1e1e1e",
      editorFg: "#d4d4d4",
      sidebarBg: "#252526",
      activitybarBg: "#333333",
      titlebarBg: "#323233",
      tabActiveBg: "#1e1e1e",
      tabInactiveBg: "#2d2d2d",
      borderColor: "#3c3c3c",
      borderSubtle: "#2d2d2d",
      selectionBg: "#264f78",
      listHover: "#2a2d2e",
      listActive: "#37373d",
      accent: "#0078d4",
      accentFg: "#ffffff",
      statusbarBg: "#007acc",
      statusbarFg: "#ffffff",
      textPrimary: "#cccccc",
      textSecondary: "#858585",
      textMuted: "#6e6e6e",
      syntaxKeyword: "#569cd6",
      syntaxString: "#ce9178",
      syntaxNumber: "#b5cea8",
      syntaxFunction: "#dcdcaa",
      syntaxVariable: "#9cdcfe",
      syntaxType: "#4ec9b0",
      syntaxComment: "#6a9955",
      terminalBg: "#1e1e1e",
      terminalFg: "#cccccc",
      terminalGreen: "#4ec9b0",
      terminalRed: "#f14c4c",
      terminalYellow: "#dcdcaa",
      terminalBlue: "#569cd6",
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      editorBg: "#272822",
      editorFg: "#f8f8f2",
      sidebarBg: "#1e1f1c",
      activitybarBg: "#1e1f1c",
      titlebarBg: "#1e1f1c",
      tabActiveBg: "#272822",
      tabInactiveBg: "#1e1f1c",
      borderColor: "#3b3a32",
      borderSubtle: "#3b3a32",
      selectionBg: "#49483e",
      listHover: "#3e3d32",
      listActive: "#49483e",
      accent: "#a6e22e",
      accentFg: "#272822",
      statusbarBg: "#a6e22e",
      statusbarFg: "#272822",
      textPrimary: "#f8f8f2",
      textSecondary: "#a59f85",
      textMuted: "#75715e",
      syntaxKeyword: "#f92672",
      syntaxString: "#e6db74",
      syntaxNumber: "#ae81ff",
      syntaxFunction: "#a6e22e",
      syntaxVariable: "#f8f8f2",
      syntaxType: "#66d9ef",
      syntaxComment: "#75715e",
      terminalBg: "#272822",
      terminalFg: "#f8f8f2",
      terminalGreen: "#a6e22e",
      terminalRed: "#f92672",
      terminalYellow: "#e6db74",
      terminalBlue: "#66d9ef",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      editorBg: "#282a36",
      editorFg: "#f8f8f2",
      sidebarBg: "#21222c",
      activitybarBg: "#21222c",
      titlebarBg: "#21222c",
      tabActiveBg: "#282a36",
      tabInactiveBg: "#21222c",
      borderColor: "#44475a",
      borderSubtle: "#44475a",
      selectionBg: "#44475a",
      listHover: "#343746",
      listActive: "#44475a",
      accent: "#bd93f9",
      accentFg: "#282a36",
      statusbarBg: "#bd93f9",
      statusbarFg: "#282a36",
      textPrimary: "#f8f8f2",
      textSecondary: "#bfbfbf",
      textMuted: "#6272a4",
      syntaxKeyword: "#ff79c6",
      syntaxString: "#f1fa8c",
      syntaxNumber: "#bd93f9",
      syntaxFunction: "#50fa7b",
      syntaxVariable: "#f8f8f2",
      syntaxType: "#8be9fd",
      syntaxComment: "#6272a4",
      terminalBg: "#282a36",
      terminalFg: "#f8f8f2",
      terminalGreen: "#50fa7b",
      terminalRed: "#ff5555",
      terminalYellow: "#f1fa8c",
      terminalBlue: "#8be9fd",
    },
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    colors: {
      editorBg: "#0d1117",
      editorFg: "#c9d1d9",
      sidebarBg: "#010409",
      activitybarBg: "#010409",
      titlebarBg: "#010409",
      tabActiveBg: "#0d1117",
      tabInactiveBg: "#010409",
      borderColor: "#30363d",
      borderSubtle: "#21262d",
      selectionBg: "#264f78",
      listHover: "#161b22",
      listActive: "#1f2428",
      accent: "#58a6ff",
      accentFg: "#ffffff",
      statusbarBg: "#58a6ff",
      statusbarFg: "#ffffff",
      textPrimary: "#c9d1d9",
      textSecondary: "#8b949e",
      textMuted: "#6e7681",
      syntaxKeyword: "#ff7b72",
      syntaxString: "#a5d6ff",
      syntaxNumber: "#79c0ff",
      syntaxFunction: "#d2a8ff",
      syntaxVariable: "#ffa657",
      syntaxType: "#7ee787",
      syntaxComment: "#8b949e",
      terminalBg: "#0d1117",
      terminalFg: "#c9d1d9",
      terminalGreen: "#7ee787",
      terminalRed: "#ff7b72",
      terminalYellow: "#ffa657",
      terminalBlue: "#79c0ff",
    },
  },
  {
    id: "one-dark",
    name: "One Dark Pro",
    colors: {
      editorBg: "#282c34",
      editorFg: "#abb2bf",
      sidebarBg: "#21252b",
      activitybarBg: "#21252b",
      titlebarBg: "#21252b",
      tabActiveBg: "#282c34",
      tabInactiveBg: "#21252b",
      borderColor: "#3e4451",
      borderSubtle: "#3e4451",
      selectionBg: "#3e4451",
      listHover: "#2c313a",
      listActive: "#3e4451",
      accent: "#61afef",
      accentFg: "#282c34",
      statusbarBg: "#61afef",
      statusbarFg: "#282c34",
      textPrimary: "#abb2bf",
      textSecondary: "#828997",
      textMuted: "#5c6370",
      syntaxKeyword: "#c678dd",
      syntaxString: "#98c379",
      syntaxNumber: "#d19a66",
      syntaxFunction: "#61afef",
      syntaxVariable: "#e06c75",
      syntaxType: "#e5c07b",
      syntaxComment: "#5c6370",
      terminalBg: "#282c34",
      terminalFg: "#abb2bf",
      terminalGreen: "#98c379",
      terminalRed: "#e06c75",
      terminalYellow: "#e5c07b",
      terminalBlue: "#61afef",
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      editorBg: "#2e3440",
      editorFg: "#d8dee9",
      sidebarBg: "#2e3440",
      activitybarBg: "#2e3440",
      titlebarBg: "#2e3440",
      tabActiveBg: "#3b4252",
      tabInactiveBg: "#2e3440",
      borderColor: "#4c566a",
      borderSubtle: "#3b4252",
      selectionBg: "#434c5e",
      listHover: "#3b4252",
      listActive: "#434c5e",
      accent: "#88c0d0",
      accentFg: "#2e3440",
      statusbarBg: "#88c0d0",
      statusbarFg: "#2e3440",
      textPrimary: "#eceff4",
      textSecondary: "#d8dee9",
      textMuted: "#616e88",
      syntaxKeyword: "#81a1c1",
      syntaxString: "#a3be8c",
      syntaxNumber: "#b48ead",
      syntaxFunction: "#88c0d0",
      syntaxVariable: "#d8dee9",
      syntaxType: "#8fbcbb",
      syntaxComment: "#616e88",
      terminalBg: "#2e3440",
      terminalFg: "#d8dee9",
      terminalGreen: "#a3be8c",
      terminalRed: "#bf616a",
      terminalYellow: "#ebcb8b",
      terminalBlue: "#81a1c1",
    },
  },
  {
    id: "light",
    name: "Light+ (Default)",
    colors: {
      editorBg: "#ffffff",
      editorFg: "#333333",
      sidebarBg: "#f3f3f3",
      activitybarBg: "#2c2c2c",
      titlebarBg: "#dddddd",
      tabActiveBg: "#ffffff",
      tabInactiveBg: "#ececec",
      borderColor: "#e0e0e0",
      borderSubtle: "#e5e5e5",
      selectionBg: "#add6ff",
      listHover: "#e8e8e8",
      listActive: "#e4e6f1",
      accent: "#0066b8",
      accentFg: "#ffffff",
      statusbarBg: "#007acc",
      statusbarFg: "#ffffff",
      textPrimary: "#333333",
      textSecondary: "#616161",
      textMuted: "#999999",
      syntaxKeyword: "#0000ff",
      syntaxString: "#a31515",
      syntaxNumber: "#098658",
      syntaxFunction: "#795e26",
      syntaxVariable: "#001080",
      syntaxType: "#267f99",
      syntaxComment: "#008000",
      terminalBg: "#ffffff",
      terminalFg: "#333333",
      terminalGreen: "#008000",
      terminalRed: "#cd3131",
      terminalYellow: "#795e26",
      terminalBlue: "#0066b8",
    },
  },
];

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const c = theme.colors;
  
  root.style.setProperty("--editor-bg", c.editorBg);
  root.style.setProperty("--editor-fg", c.editorFg);
  root.style.setProperty("--sidebar-bg", c.sidebarBg);
  root.style.setProperty("--activitybar-bg", c.activitybarBg);
  root.style.setProperty("--titlebar-bg", c.titlebarBg);
  root.style.setProperty("--tab-active-bg", c.tabActiveBg);
  root.style.setProperty("--tab-inactive-bg", c.tabInactiveBg);
  root.style.setProperty("--border-color", c.borderColor);
  root.style.setProperty("--border-subtle", c.borderSubtle);
  root.style.setProperty("--selection-bg", c.selectionBg);
  root.style.setProperty("--list-hover", c.listHover);
  root.style.setProperty("--list-active", c.listActive);
  root.style.setProperty("--accent", c.accent);
  root.style.setProperty("--accent-fg", c.accentFg);
  root.style.setProperty("--statusbar-bg", c.statusbarBg);
  root.style.setProperty("--statusbar-fg", c.statusbarFg);
  root.style.setProperty("--text-primary", c.textPrimary);
  root.style.setProperty("--text-secondary", c.textSecondary);
  root.style.setProperty("--text-muted", c.textMuted);
  root.style.setProperty("--syntax-keyword", c.syntaxKeyword);
  root.style.setProperty("--syntax-string", c.syntaxString);
  root.style.setProperty("--syntax-number", c.syntaxNumber);
  root.style.setProperty("--syntax-function", c.syntaxFunction);
  root.style.setProperty("--syntax-variable", c.syntaxVariable);
  root.style.setProperty("--syntax-type", c.syntaxType);
  root.style.setProperty("--syntax-comment", c.syntaxComment);
  root.style.setProperty("--terminal-bg", c.terminalBg);
  root.style.setProperty("--terminal-fg", c.terminalFg);
  root.style.setProperty("--terminal-green", c.terminalGreen);
  root.style.setProperty("--terminal-red", c.terminalRed);
  root.style.setProperty("--terminal-yellow", c.terminalYellow);
  root.style.setProperty("--terminal-blue", c.terminalBlue);
}

