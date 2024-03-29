// define sizes in the app for rem
export const size = {
  "4xs": 0.5,
  xxxs: 0.8,
  xxs: 1.0,
  xs: 1.4,
  s: 1.6,
  m: 2.0,
  l: 2.4,
  xl: 3.2,
  xxl: 3.6,
  "2xxl": 7.2,
  "3xxl": 10.8,
  "4xxl": 14.4,
  "8xxl": 28.8,
}

// define sizes in px
export const px = {
  xxxs: 1,
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  "2xxl": 36,
  "3xxl": 10.8,
  "4xxl": 14.4,
  "8xxl": 28.8,
}

// define the theme object
const theme = {
  lightTheme: {
    colors: {
      primary: "#000000",
      secondary: "#6B6A6A",
      reverse: "#FFFFFF",
      gray100: "#EBEBEB",
      gray300: "#CCCCCC",
      gray400: "#A2A2A2",
      gray600: "#434343",
      gray900: "#1C1C1C",
      red: "#B60101",
      green: "#5A9421",
      orange: "#EC9006",
      foreground: "#000000",
      background: "#F6F6F6",
      white: "#FFFFFF",
    },
    size: size,
    px: px,
  },

  darkTheme: {
    colors: {
      foreground: "#F6F6F6",
      background: "#000000",
    },
    size: size,
    px: px,
  },
}

export default theme
