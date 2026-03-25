import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: '#FBFBFA',
          card: '#FFFFFF',
          text: '#0B0C0D',
          muted: '#6B7280',
          accent: '#8B5E3C',
          border: 'rgba(11,12,13,0.06)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      aspectRatio: {
        '21/9': '21 / 9',
        '3/2': '3 / 2',
      },
    },
  },
  plugins: [],
} satisfies Config;
