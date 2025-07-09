import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Text, Button } from '@chakra-ui/react';
import { TimePicker } from './time-picker';

const TimePickerDemo = () => {
  const [time1, setTime1] = useState('21:55');
  const [time2, setTime2] = useState('09:05');
  const [time3, setTime3] = useState('00:00');

  return (
    <ChakraProvider>
      <Box p={8} maxW="400px" mx="auto">
        <VStack spacing={6}>
          <Box>
            <Text mb={2} fontWeight="bold">Test Time: 21:55</Text>
            <TimePicker 
              value={time1} 
              onChange={setTime1} 
              placeholder="Select time"
            />
            <Text mt={2} fontSize="sm" color="gray.600">
              Should scroll to hour 21, minute 55 when opened
            </Text>
          </Box>

          <Box>
            <Text mb={2} fontWeight="bold">Test Time: 09:05</Text>
            <TimePicker 
              value={time2} 
              onChange={setTime2} 
              placeholder="Select time"
            />
            <Text mt={2} fontSize="sm" color="gray.600">
              Should scroll to hour 09, minute 05 when opened
            </Text>
          </Box>

          <Box>
            <Text mb={2} fontWeight="bold">Test Time: 00:00</Text>
            <TimePicker 
              value={time3} 
              onChange={setTime3} 
              placeholder="Select time"
            />
            <Text mt={2} fontSize="sm" color="gray.600">
              Should scroll to hour 00, minute 00 when opened
            </Text>
          </Box>

          <Button onClick={() => {
            setTime1('15:30');
            setTime2('18:45');
            setTime3('12:15');
          }}>
            Change Times
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default TimePickerDemo;