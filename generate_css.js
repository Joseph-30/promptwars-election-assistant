const fs = require('fs');

const html = fs.readFileSync('downloaded_screen.html', 'utf8');
const scriptMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*</);

if (!scriptMatch) {
  console.error("Could not find tailwind config");
  process.exit(1);
}

const configStr = scriptMatch[1];
const config = eval(`(${configStr})`);
const theme = config.theme.extend;

let css = `@import "tailwindcss";

@theme inline {
`;

// Colors
for (const [key, value] of Object.entries(theme.colors || {})) {
  css += `  --color-${key}: ${value};\n`;
}

css += '\n';

// BorderRadius
for (const [key, value] of Object.entries(theme.borderRadius || {})) {
  const name = key === 'DEFAULT' ? 'radius' : `radius-${key}`;
  css += `  --${name}: ${value};\n`;
}

css += '\n';

// Spacing
for (const [key, value] of Object.entries(theme.spacing || {})) {
  css += `  --spacing-${key}: ${value};\n`;
}

css += '\n';

// FontFamily
for (const [key, value] of Object.entries(theme.fontFamily || {})) {
  css += `  --font-${key}: ${value[0]}, sans-serif;\n`;
}

css += '\n';

// FontSize
for (const [key, value] of Object.entries(theme.fontSize || {})) {
  const size = value[0];
  const opts = value[1];
  css += `  --text-${key}: ${size};\n`;
  if (opts.lineHeight) css += `  --text-${key}--line-height: ${opts.lineHeight};\n`;
  if (opts.letterSpacing) css += `  --text-${key}--letter-spacing: ${opts.letterSpacing};\n`;
  if (opts.fontWeight) css += `  --text-${key}--font-weight: ${opts.fontWeight};\n`;
}

css += `
  --shadow-quiz-card: 0 4px 20px rgba(15, 76, 129, 0.08);
}

@layer base {
  body {
    background-color: var(--color-surface);
    color: var(--color-on-surface);
  }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log("globals.css updated successfully.");
