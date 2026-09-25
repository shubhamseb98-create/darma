/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-derived brand colors
        brand: {
          // TRULY violet-indigo
          violet: '#6058A8',
          'violet-light': '#F1EFFF',
          'violet-hover': '#4E4694',
          'violet-soft': '#E6E3FA',
          
          // Silhouette royal plum / eggplant
          plum: '#2B133D',
          'plum-dark': '#1C0A29',
          'plum-deep': '#12051D',
          'plum-hover': '#3D1C56',
          
          // DERMA coral rose / terracotta crimson
          coral: '#C74B4A',
          'coral-light': '#FDF2F2',
          'coral-hover': '#B33E3D',
          'coral-soft': '#F9DCDC',
          rose: '#DE6361',
        },
        cream: {
          50: '#FCFBFE',
          100: '#F7F6FA',
          200: '#EFEFF6',
          300: '#E3E1EE',
          400: '#D2CFE4',
        },
        charcoal: {
          800: '#262433',
          900: '#1B1926',
          950: '#12111A',
        }
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
        heading: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(96, 88, 168, 0.25)' },
          '100%': { boxShadow: '0 0 30px rgba(199, 75, 74, 0.35)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { opacity: '0.35' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
};
