import { css, type CSSResult } from 'lit';

export const themeStyles: CSSResult = css`
  :host {
    --picker-color-text: #111827;
    --picker-color-muted: #6b7280;
    --picker-color-border: #e5e7eb;
    --picker-color-surface: #ffffff;
    --picker-color-surface-alt: #f9fafb;
    --picker-color-primary: #2563eb;
    --picker-color-danger: #dc2626;
    --picker-radius: 12px;
    --picker-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    color: var(--picker-color-text);
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

