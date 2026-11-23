import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#005f49',
        'primary-container': '#0d7a5f',
        'on-primary': '#ffffff',
        'on-primary-container': '#a8ffdf',
        'primary-fixed': '#98f4d3',
        'primary-fixed-dim': '#7cd8b8',
        'on-primary-fixed': '#002117',
        'on-primary-fixed-variant': '#00513e',

        'secondary': '#32647e',
        'secondary-container': '#b0e0ff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#32647f',
        'secondary-fixed': '#c4e7ff',
        'secondary-fixed-dim': '#9ccdeb',
        'on-secondary-fixed': '#001e2c',
        'on-secondary-fixed-variant': '#144c65',

        'tertiary': '#005886',
        'tertiary-container': '#0071ac',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#e1efff',
        'tertiary-fixed': '#cce5ff',
        'tertiary-fixed-dim': '#93ccff',
        'on-tertiary-fixed': '#001d31',
        'on-tertiary-fixed-variant': '#004b73',

        'background': '#f9f9ff',
        'on-background': '#111c2d',
        'surface': '#f9f9ff',
        'surface-dim': '#cfdaf2',
        'surface-bright': '#f9f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f0f3ff',
        'surface-container': '#e7eeff',
        'surface-container-high': '#dee8ff',
        'surface-container-highest': '#d8e3fb',
        'surface-variant': '#d8e3fb',
        'on-surface': '#111c2d',
        'on-surface-variant': '#3e4944',

        'inverse-surface': '#263143',
        'inverse-on-surface': '#ecf1ff',
        'inverse-primary': '#7cd8b8',
        'surface-tint': '#006c53',

        'outline': '#6e7a74',
        'outline-variant': '#bdc9c2',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 95, 73, 0.08)',
        'glass-hover': '0 20px 35px -8px rgba(0, 95, 73, 0.12), 0 10px 16px -6px rgba(50, 100, 126, 0.08)',
        'card-lift': '0 12px 28px -6px rgba(17, 28, 45, 0.09), 0 6px 12px -4px rgba(17, 28, 45, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
