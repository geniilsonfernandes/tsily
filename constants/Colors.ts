/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const backgroundDark = {
  100: "#151718",
};

export const Colors = {
  light: {
    text: "#000300",
    "text.1": "#2D2E2F",
    "text.2": "#5A595A",
    "text.3": "#868686",
    "text.4": "#B2B2B2",
    "text.5": "#DEDEDE",

    background: "#FCFDFC",
    "background.1": "#F2F2F2",
    "background.2": "#E6E6E6",
    "background.3": "#DBDBDB",
    "background.4": "#D0D0D0",
    "background.5": "#C4C4C4",

    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    danger: "#F96868",
  },
  dark: {
    text: "#ECEDEE",
    "text.1": "#A9A8A8",
    "text.2": "#807E80",
    "text.3": "#545456",
    "text.4": "#2A2D2D",
    "text.5": "#000300",

    background: "#2A2D2D",
    "background.1": "#504F51",
    "background.2": "#767575",
    "background.3": "#9A9A9A",
    "background.4": "#BFBFBF",
    "background.5": "#E4E4E4",

    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    danger: "#F96868",
  },
};
