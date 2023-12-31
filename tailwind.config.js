/** @type {import('tailwindcss').Config} */
const accent = "accent";
export default {
  theme: {
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"calt", "dlig", "tnum", "ccmp", "ss02"',
        },
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      accent: "var(--ghost-accent-color, #134B6A)",
      white: "#fff",
      black: "#0a0b0c",
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.text.DEFAULT"),
            "--tw-prose-headings": theme(`colors.accent.DEFAULT`),
            "--tw-prose-lead": theme("colors.text.DEFAULT"),
            "--tw-prose-links": theme(`colors.accent`),
            "--tw-prose-bold": theme(`colors.accent.DEFAULT`),
            "--tw-prose-counters": theme(`colors.accent.DEFAULT`),
            "--tw-prose-bullets": theme(`colors.accent.DEFAULT`),
            "--tw-prose-hr": theme(`colors.accent.DEFAULT`),
            "--tw-prose-quotes": theme(`colors.accent.DEFAULT`),
            "--tw-prose-quote-borders": theme(`colors.accent`),
            "--tw-prose-captions": theme(`colors.accent.DEFAULT`),
            "--tw-prose-code": theme(`colors.accent.DEFAULT`),
            "--tw-prose-pre-code": theme(`colors.accent.DEFAULT`),
            "--tw-prose-pre-bg": theme(`colors.base.DEFAULT`),
            "--tw-prose-th-borders": theme(`colors.accent.DEFAULT`),
            "--tw-prose-td-borders": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-body": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-links": theme("colors.accent"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-bullets": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-hr": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-quotes": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-quote-borders": theme(`colors.accent`),
            "--tw-prose-invert-captions": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme(`colors.accent.DEFAULT`),
            "--tw-prose-invert-td-borders": theme(`colors.accent.DEFAULT`),
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "latte",
    }),
    require("@tailwindcss/container-queries"),
  ],
  content: ["./*.hbs", "./**/*.hbs"],
};
