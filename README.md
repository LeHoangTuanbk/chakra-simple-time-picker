# Chakra Time Picker

A customizable time picker component for React using Chakra UI.

## Installation

```bash
npm install chakra-time-picker
# or
yarn add chakra-time-picker
```

## Requirements

This component requires the following peer dependencies:

- React 17 or higher
- Chakra UI 3.0 or higher
- @emotion/react 11.0 or higher
- Heroicons 2.0 or higher

## Usage

```jsx
import { TimePicker } from "chakra-time-picker";
import { useState } from "react";

function App() {
  const [time, setTime] = useState("12:00");

  return (
    <div>
      <h1>Time Picker Example</h1>
      <TimePicker value={time} onChange={(newTime) => setTime(newTime)} />
      <p>Selected time: {time}</p>
    </div>
  );
}
```

## Features

- 24-hour time format
- Hour and minute selection
- "Now" button to quickly set current time
- Fully customizable with Chakra UI theme
- TypeScript support

## Props

| Prop     | Type     | Description                                            |
| -------- | -------- | ------------------------------------------------------ |
| value    | string   | The current time value in format "HH:MM"               |
| onChange | function | Callback function that is called when the time changes |

## License

MIT
