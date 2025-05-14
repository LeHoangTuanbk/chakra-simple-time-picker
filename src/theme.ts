import { createSystem, defaultConfig } from "@chakra-ui/react";

const fonts = {
  heading: { value: `'Noto Sans JP', sans-serif` },
  body: { value: `'Noto Sans JP', sans-serif` },
};

const colors = {
  common: {
    white: { value: "#ffffff" },
    teal: { value: "#38B2AC" },
    primary: {
      base: { value: "#60A5FA" },
      hover: { value: "#3B82F6" },
    },
    red: {
      base: { value: "#FC8181" },
      hover: { value: "#F56565" },
    },
  },
  background: {
    primary: { value: "#F7FAFC" },
  },
  text: {
    primary: { value: "#171923" },
    secondary: { value: "#718096" },
    tertiary: { value: "#4A5568" },
    placeholder: { value: "#A0AEC0" },
    danger: { value: "#F56565" },
  },
  gray: {
    50: { value: "#F7FAFC" },
    100: { value: "#EDF2F7" },
    200: { value: "#E2E8F0" },
    300: { value: "#CBD5E0" },
    400: { value: "#A0AEC0" },
    500: { value: "#718096" },
    600: { value: "#4A5568" },
    900: { value: "#171923" },
  },
  border: {
    primary: { value: "#E2E8F0" },
  },
};

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts,
      colors,
    },
  },
});
