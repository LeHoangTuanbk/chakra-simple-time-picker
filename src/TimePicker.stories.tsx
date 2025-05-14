import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./time-picker";

const meta = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "12:30",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const Empty: Story = {
  args: {
    value: "",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const WithCallback: Story = {
  args: {
    value: "09:15",
    onChange: (value) => console.log("Time changed to:", value),
  },
};
