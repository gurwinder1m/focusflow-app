import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ink: '#0B0D12',
        obsidian: '#11131A',
        frost: '#F7FAFC',
        ember: '#FF7A59',
        mint: '#42D392',
        cyber: '#58A6FF',
        violet: '#8B5CF6'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(88, 166, 255, 0.22)',
        soft: '0 18px 50px rgba(15, 23, 42, 0.12)'
      },
      backgroundImage: {
        'focus-grid':
          'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        'light-grid':
          'linear-gradient(rgba(15,23,42,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.07) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
