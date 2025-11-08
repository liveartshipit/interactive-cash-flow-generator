module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214, 16%, 90%)",
        input: "hsl(214, 16%, 90%)",
        ring: "hsl(188, 78%, 42%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222, 15%, 15%)",
        primary: {
          DEFAULT: "hsl(188, 78%, 42%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(188, 60%, 32%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        tertiary: {
          DEFAULT: "hsl(15, 85%, 62%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(222, 15%, 15%)",
        },
        success: {
          DEFAULT: "hsl(145, 55%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(35, 90%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(210, 20%, 98%)",
          foreground: "hsl(220, 9%, 46%)",
        },
        accent: {
          DEFAULT: "hsl(210, 20%, 98%)",
          foreground: "hsl(222, 15%, 15%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222, 15%, 15%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222, 15%, 15%)",
        },
        gray: {
          50: "hsl(210, 20%, 98%)",
          100: "hsl(210, 21%, 95%)",
          200: "hsl(214, 16%, 90%)",
          300: "hsl(216, 12%, 84%)",
          400: "hsl(218, 11%, 65%)",
          500: "hsl(220, 9%, 46%)",
          600: "hsl(215, 14%, 34%)",
          700: "hsl(221, 15%, 23%)",
          800: "hsl(229, 21%, 16%)",
          900: "hsl(231, 28%, 10%)",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(188, 78%, 42%), hsl(188, 68%, 36%))',
        'gradient-2': 'linear-gradient(120deg, hsl(15, 85%, 62%), hsl(188, 78%, 42%))',
        'button-border-gradient': 'linear-gradient(90deg, hsl(188, 78%, 42%) 0%, hsl(15, 85%, 62%) 100%)',
      },
    },
  },
  plugins: [],
}
