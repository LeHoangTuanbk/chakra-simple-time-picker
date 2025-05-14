import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react";
import React from "react";
import { theme } from "../src/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      const Story = story;
      return (
        <ChakraProvider value={theme}>
          <Story />
        </ChakraProvider>
      );
    },
  ],
};

export default preview;
