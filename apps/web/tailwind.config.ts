import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Perplexity Finance colors
        primary: {
          DEFAULT: "#0e86d4", // Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#AF403B", // Red
          foreground: "#E8E8E6",
        },
        
        // Background colors
        background: {
          DEFAULT: "#191A1A",
          main: "#191A1A",
          card: "#1F2121",
          hover: "#2A2B2B",
          search: "#1A1B1A",
        },
        
        // Text colors
        text: {
          primary: "#E8E8E6",
          secondary: "#B3B3B1",
          muted: "#7A7B7C",
        },
        
        // Border colors  
        border: {
          DEFAULT: "#2A2B2B",
          hover: "#0e86d4",
          search: "#2F3130",
        },
        
        // Financial colors
        financial: {
          positive: "#00ff88",
          negative: "#ff4444",
          neutral: "#E8E8E6",
        },
        
        // Chart colors
        chart: {
          positive: "#00FFC7",
          negative: "#FF3B30",
        },
        
        // Legacy/compatibility colors
        "page-bg": "#191A1A",
        "card-bg": "#1F2121", 
        "primary-blue": "#0e86d4",
        "primary-offset": "#21393C",
        "text-primary": "#E8E8E6",
        
        // Component colors (shadcn compatibility)
        foreground: "#E8E8E6",
        input: "#2A2B2B",
        ring: "#0e86d4",
        destructive: {
          DEFAULT: "#FF3B30",
          foreground: "#E8E8E6",
        },
        success: {
          DEFAULT: "#00ff88",
          foreground: "#191A1A",
        },
        warning: {
          DEFAULT: "#ffbb00",
          foreground: "#191A1A",
        },
        muted: {
          DEFAULT: "#1F2121",
          foreground: "#B3B3B1",
        },
        accent: {
          DEFAULT: "#0e86d4",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#1F2121",
          foreground: "#E8E8E6",
        },
        card: {
          DEFAULT: "#1F2121",
          foreground: "#E8E8E6",
        },
        
        // Dark mode specific
        dark: {
          primary: "#191A1A",
          secondary: "#1F2121",
          tertiary: "#2A2B2B",
          border: "#2A2B2B",
        },
        
        // Extended color palette
        blue: {
          400: "#0e86d4",
          500: "#0e86d4",
          600: "#0c6fb5",
        },
        gray: {
          300: "#E8E8E6",
          400: "#B3B3B1",
          500: "#7A7B7C",
          600: "#5A5B5C",
          700: "#3A3B3C",
          800: "#2A2B2B",
        },
      },
      
      // Layout dimensions
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "page": "24px",
        "section": "20px",
        "card": "16px",
        "gap": "24px",
      },
      
      maxWidth: {
        "layout": "1280px",
        "content": "860px",
        "sidebar": "320px",
      },
      
      height: {
        "navbar": "64px",
        "searchbar": "64px",
        "ticker": "120px",
        "card-sm": "160px",
        "card-md": "240px",
        "card-lg": "320px",
      },
      
      // Border radius
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      
      // Z-index layers
      zIndex: {
        dropdown: "50",
        sticky: "40",
        modal: "100",
        popover: "200",
        tooltip: "300",
      },
      
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "SF Mono",
          "Monaco",
          "Inconsolata",
          "Roboto Mono",
          "monospace",
        ],
      },
      fontSize: {
        financial: [
          "0.875rem",
          { lineHeight: "1.25rem", letterSpacing: "0.01em" },
        ],
        metric: ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        price: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px #0e86d4" },
          "50%": {
            boxShadow:
              "0 0 20px #0e86d4, 0 0 30px #0e86d4",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      boxShadow: {
        financial:
          "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px rgba(14, 134, 212, 0.3)",
        card: "0 2px 8px rgba(0, 0, 0, 0.3)",
        hover: "0 4px 16px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;