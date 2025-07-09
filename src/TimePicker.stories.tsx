import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./time-picker";
import { Locale } from "./locales";

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
    locale: { 
      control: "select",
      options: ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"] as Locale[]
    },
    width: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
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

export const Vietnamese: Story = {
  args: {
    value: "09:15",
    locale: "vi",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const Spanish: Story = {
  args: {
    value: "14:30",
    locale: "es",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const Japanese: Story = {
  args: {
    value: "18:45",
    locale: "ja",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const CustomWidth: Story = {
  args: {
    value: "11:00",
    width: "300px",
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const Disabled: Story = {
  args: {
    value: "16:20",
    disabled: true,
    onChange: (value) => console.log("Time changed to:", value),
  },
};

export const ReadOnly: Story = {
  args: {
    value: "08:30",
    isReadOnly: true,
    onChange: (value) => console.log("Time changed to:", value),
  },
};
