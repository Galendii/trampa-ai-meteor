/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./client/**/*.html",
    "./client/**/*.{js,jsx,ts,tsx}",
    "./imports/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic semantic tokens (light/dark switchable)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(158, 40%, 95%)",
          100: "hsl(158, 50%, 90%)",
          200: "hsl(158, 55%, 80%)",
          300: "hsl(158, 60%, 70%)",
          400: "hsl(158, 64%, 60%)",
          500: "hsl(158, 64%, 47%)",
          600: "hsl(158, 70%, 38%)",
          700: "hsl(158, 75%, 28%)",
          800: "hsl(158, 80%, 20%)",
          900: "hsl(158, 85%, 15%)",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(220, 100%, 97%)",
          100: "hsl(220, 95%, 90%)",
          200: "hsl(220, 90%, 82%)",
          300: "hsl(220, 85%, 74%)",
          400: "hsl(220, 80%, 66%)",
          500: "hsl(220, 75%, 58%)",
          600: "hsl(220, 70%, 50%)",
          700: "hsl(220, 65%, 40%)",
          800: "hsl(220, 60%, 32%)",
          900: "hsl(220, 55%, 24%)",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(24, 100%, 95%)",
          100: "hsl(24, 95%, 88%)",
          200: "hsl(24, 90%, 76%)",
          300: "hsl(24, 85%, 66%)",
          400: "hsl(24, 80%, 58%)",
          500: "hsl(24, 75%, 50%)",
          600: "hsl(24, 70%, 42%)",
          700: "hsl(24, 65%, 34%)",
          800: "hsl(24, 60%, 28%)",
          900: "hsl(24, 55%, 22%)",
        },

        neutral: {
          50: "hsl(240, 20%, 98%)",
          100: "hsl(240, 15%, 95%)",
          200: "hsl(240, 10%, 90%)",
          300: "hsl(240, 8%, 80%)",
          400: "hsl(240, 6%, 65%)",
          500: "hsl(240, 5%, 50%)",
          600: "hsl(240, 5%, 40%)",
          700: "hsl(240, 5%, 30%)",
          800: "hsl(240, 5%, 20%)",
          900: "hsl(240, 5%, 10%)",
        },

        success: {
          DEFAULT: "hsl(142, 71%, 45%)",
          foreground: "hsl(138, 76%, 97%)",
        },
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)",
          foreground: "hsl(45, 100%, 95%)",
        },
        danger: {
          DEFAULT: "hsl(0, 80%, 60%)",
          foreground: "hsl(0, 100%, 97%)",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        soft: "0 2px 12px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 20px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
