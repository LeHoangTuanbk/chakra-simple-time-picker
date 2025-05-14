import { useState } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";

export type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [time, setTime] = useState(value || "00:00");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    onChange(e.target.value);
  };

  const handleNow = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
    onChange(currentTime);
  };

  return (
    <Flex gap={2}>
      <Input
        value={time}
        onChange={handleTimeChange}
        type="time"
        width="120px"
        size="md"
      />
      <Button size="md" onClick={handleNow}>
        現在
      </Button>
    </Flex>
  );
};
