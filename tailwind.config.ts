import { theme } from "./src/styles/theme"
import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        accent: theme.colors.accent,
        secondary: theme.colors.secondary,
        background: theme.colors.background,
        text: theme.colors.text,
      },
      fontFamily: {
        heading: theme.fontFamily.heading,
        sans: theme.fontFamily.body,
        subheading: theme.fontFamily.subheading,
      },
      borderRadius: theme.borderRadius,
    },
  },
  plugins: [],
}

export default config
