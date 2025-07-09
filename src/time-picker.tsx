import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { Locale, getLocale } from "./locales";

export type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  locale?: Locale;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  isReadOnly?: boolean;
};

export const TimePicker = ({
  value,
  onChange,
  locale = "en",
  width = "200px",
  placeholder,
  disabled = false,
  isReadOnly = false,
}: TimePickerProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedTime, setSelectedTime] = useState(value || "");
  const [hours, minutes] = selectedTime
    ? selectedTime.split(":").map(Number)
    : [0, 0];
  const localeData = getLocale(locale);
  const displayPlaceholder =
    placeholder || localeData.placeholder || "Select time";
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedTime(value || "");
  }, [value]);

  useEffect(() => {
    if (open && selectedTime) {
      const [h, m] = selectedTime.split(":").map(Number);

      if (hoursRef.current) {
        const hourElement = hoursRef.current.children[h] as HTMLElement;
        if (hourElement) {
          hourElement.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }

      if (minutesRef.current) {
        const minuteElement = minutesRef.current.children[m] as HTMLElement;
        if (minuteElement) {
          minuteElement.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    }
  }, [open, selectedTime]);

  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);

  const handleTimeSelect = (type: "hour" | "minute", value: number) => {
    let [h, m] = selectedTime ? selectedTime.split(":").map(Number) : [0, 0];

    if (type === "hour") h = value;
    if (type === "minute") m = value;

    const newTime = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}`;
    setSelectedTime(newTime);
  };

  const handleNow = () => {
    const now = new Date();
    const timeNow = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    setSelectedTime(timeNow);
  };

  const handleOk = () => {
    onChange(selectedTime || "00:00");
    onClose();
  };

  return (
    <Box position="relative">
      <Box
        onClick={disabled || isReadOnly ? undefined : onOpen}
        display="flex"
        alignItems="center"
        borderWidth="1.5px"
        borderColor={disabled ? "gray.300" : "gray.200"}
        width={width}
        height="40px"
        bg={disabled ? "gray.100" : "white"}
        cursor={disabled || isReadOnly ? "not-allowed" : "pointer"}
        borderRadius="md"
        opacity={disabled ? 0.6 : 1}
        _hover={disabled || isReadOnly ? {} : { borderColor: "#40a9ff" }}
        _focus={
          disabled || isReadOnly
            ? {}
            : {
                borderColor: "#1890ff",
                boxShadow: "0 0 0 2px rgba(24,144,255,0.2)",
              }
        }
      >
        <Box
          flex="1"
          textAlign="center"
          fontWeight="normal"
          padding="0 10px"
          color={disabled ? "gray.500" : "inherit"}
        >
          {selectedTime || displayPlaceholder}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="40px"
          bg={disabled ? "gray.100" : "white"}
          color={disabled ? "gray.400" : "gray.500"}
        >
          <ClockIcon />
        </Box>
      </Box>

      {open && !disabled && !isReadOnly && (
        <Box
          position="absolute"
          top="calc(100% + 4px)"
          left="0"
          zIndex={1000}
          width="280px"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)"
          borderRadius="md"
          bg="white"
        >
          <Flex>
            {/* Hours Column */}
            <Box
              ref={hoursRef}
              width="50%"
              height="220px"
              overflowY="auto"
              borderRight="1px solid"
              borderColor="gray.200"
              css={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-blackAlpha-300)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "var(--chakra-colors-blackAlpha-400)",
                },
                scrollbarWidth: "thin",
                scrollbarColor:
                  "var(--chakra-colors-blackAlpha-300) transparent",
              }}
            >
              {hoursArray.map((hour) => (
                <Center
                  key={`hour-${hour}`}
                  height="32px"
                  bg={hours === hour ? "#1890ff" : "transparent"}
                  color={hours === hour ? "white" : "inherit"}
                  _hover={{
                    background: hours === hour ? "#1890ff" : "rgba(0,0,0,0.04)",
                  }}
                  cursor="pointer"
                  onClick={() => handleTimeSelect("hour", hour)}
                >
                  <Text fontSize="md">{String(hour).padStart(2, "0")}</Text>
                </Center>
              ))}
            </Box>

            {/* Minutes Column */}
            <Box
              ref={minutesRef}
              width="50%"
              height="220px"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-blackAlpha-300)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "var(--chakra-colors-blackAlpha-400)",
                },
                scrollbarWidth: "thin",
                scrollbarColor:
                  "var(--chakra-colors-blackAlpha-300) transparent",
              }}
            >
              {minutesArray.map((minute) => (
                <Center
                  key={`minute-${minute}`}
                  height="32px"
                  bg={minutes === minute ? "#1890ff" : "transparent"}
                  color={minutes === minute ? "white" : "inherit"}
                  _hover={{
                    background:
                      minutes === minute ? "#1890ff" : "rgba(0,0,0,0.04)",
                  }}
                  cursor="pointer"
                  onClick={() => handleTimeSelect("minute", minute)}
                >
                  <Text fontSize="md">{String(minute).padStart(2, "0")}</Text>
                </Center>
              ))}
            </Box>
          </Flex>

          <Flex
            justify="space-between"
            p={2}
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Button
              variant="ghost"
              color="#1890ff"
              _hover={{ color: "#40a9ff" }}
              onClick={handleNow}
              fontWeight="normal"
              fontSize="sm"
            >
              {localeData.now}
            </Button>
            <Button
              bg="#1890ff"
              color="white"
              _hover={{ bg: "#40a9ff" }}
              size="sm"
              onClick={handleOk}
              borderRadius="sm"
              fontWeight="normal"
              px={4}
            >
              {localeData.ok}
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

// Simple clock icon component
const ClockIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="64 64 896 896"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
  </svg>
);
