import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: linear-gradient(180deg,#07070a,#050507);
    --muted: #9aa7b2;
    --text: #e6eef6;
    --accent: #8b7cff;
    /* panels */
    --panel-bg: #0a0a0c;
    --sidebar-bg: #0e0f11;
    --chat-bg: linear-gradient(180deg,#050506,#0b0b0d);
    /* bubbles */
    --bubble-user: linear-gradient(90deg,#8b7cff,#6f58ff);
    --bubble-user-text: #0b0b0f;
    --bubble-assistant: rgba(255,255,255,0.03);
    --bubble-assistant-text: #d9e6ee;
    --input-bg: rgba(255,255,255,0.02);
    --send-bg: linear-gradient(90deg,#6f58ff,#5a46d9);
    /* New conversation button gradient */
    --new-btn-start: #c8ffd6; /* light green */
    --new-btn-end: #98d8ff;   /* light cyan */
    --new-btn-text: #053036;  /* dark text for contrast */
  }
  *{box-sizing:border-box}
  html,body,#root{height:100%;}
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    background: var(--bg);
    color:var(--text);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  /* make default links unobtrusive */
  a{color:var(--accent)}
`;

export default GlobalStyle;
