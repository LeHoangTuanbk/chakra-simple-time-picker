# Chakra Time Picker

A beautiful and customizable time picker component for React using Chakra UI v3. Inspired by Ant Design's aesthetics with a modern, clean interface.

![Chakra Time Picker Demo](./src//docs/images/demo.png)

# Motivation

I'm a big fan of Chakra UI and its convenient style props. In several projects, we needed a time picker component for selecting time of day, but Chakra UI v3 doesn't include one yet. After using Ant Design's time picker as a workaround (which wasn't ideal for our Chakra-based projects), I decided to build my own using Chakra UI's pre-built components. I published this to npm registry primarily for my own future use - making it easy to reuse across projects.

## Installation

```bash
npm install chakra-ui-simple-time-picker
# or
yarn add chakra-ui-simple-time-picker
# or
pnpm add chakra-ui-simple-time-picker
```

## Requirements

This component requires the following peer dependencies:

- React 17 or higher
- Chakra UI 3.0 or higher
- @emotion/react 11.0 or higher
- @emotion/styled 11.0 or higher
- framer-motion 12.0 or higher

## Usage

### Basic Usage

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

### With ChakraProvider

```jsx
import { ChakraProvider } from "@chakra-ui/react";
import { TimePicker } from "chakra-time-picker";
import { useState } from "react";

function App() {
  const [time, setTime] = useState("12:00");

  return (
    <ChakraProvider>
      <div>
        <h1>Time Picker Example</h1>
        <TimePicker value={time} onChange={(newTime) => setTime(newTime)} />
        <p>Selected time: {time}</p>
      </div>
    </ChakraProvider>
  );
}
```

## Features

- **Modern Interface**: Clean, intuitive design inspired by Ant Design
- **24-hour time format**: Shows hours (00-23) and minutes (00-59)
- **Two-column selection**: Easy selection of hours and minutes
- **Internationalization (i18n)**: Support for 8 languages (English, Vietnamese, Spanish, French, German, Japanese, Korean, Chinese)
- **Custom Styling**: Fully customizable with Chakra UI theme
- **TypeScript Support**: Full TypeScript support with type definitions
- **Keyboard Accessibility**: Accessible via keyboard navigation
- **"Now" Button**: Quickly set current time
- **Smooth Animations**: Clean, polished UI transitions
- **Comprehensive Testing**: Full test coverage with React Testing Library

## Component Design

The time picker consists of:

1. **Input field**: Displays the selected time and opens the dropdown when clicked
2. **Hours column**: Displays hours from 00-23
3. **Minutes column**: Displays minutes from 00-59
4. **Action buttons**:
   - "Now" - Sets the time to current time
   - "OK" - Confirms the selection and closes the dropdown

## Props

| Prop        | Type     | Required | Default        | Description                                     |
| ----------- | -------- | -------- | -------------- | ----------------------------------------------- |
| value       | string   | Yes      | "00:00"        | The current time value in "HH:MM" format        |
| onChange    | function | Yes      | -              | Callback function called when time changes      |
| locale      | Locale   | No       | "en"           | Language locale for button text and placeholder |
| width       | string   | No       | "200px"        | Width of the time picker input                  |
| placeholder | string   | No       | Auto-localized | Placeholder text when no time is selected       |
| disabled    | boolean  | No       | false          | Disables the time picker when true              |
| isReadOnly  | boolean  | No       | false          | Makes the time picker read-only when true       |

## Internationalization

The TimePicker supports 8 languages out of the box:

- **English (en)**: "Now", "OK", "Select time"
- **Vietnamese (vi)**: "Hiện tại", "Xác nhận", "Chọn thời gian"
- **Spanish (es)**: "Ahora", "Aceptar", "Seleccionar hora"
- **French (fr)**: "Maintenant", "OK", "Sélectionner l'heure"
- **German (de)**: "Jetzt", "OK", "Zeit auswählen"
- **Japanese (ja)**: "現在", "OK", "時間を選択"
- **Korean (ko)**: "지금", "확인", "시간 선택"
- **Chinese (zh)**: "现在", "确定", "选择时间"

### Usage with Locales

```jsx
// Vietnamese
<TimePicker
  value={time}
  onChange={setTime}
  locale="vi"
/>

// Spanish
<TimePicker
  value={time}
  onChange={setTime}
  locale="es"
/>

// Custom placeholder overrides locale
<TimePicker
  value={time}
  onChange={setTime}
  locale="ja"
  placeholder="カスタム時間"
/>
```

## Customization

You can customize the TimePicker by adding Chakra UI props to the component.

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  width="240px"
  borderRadius="lg"
  _hover={{ borderColor: "purple.400" }}
  _focus={{
    borderColor: "purple.500",
    boxShadow: "0 0 0 2px rgba(159,122,234,0.2)",
  }}
/>
```

## Testing

The component includes comprehensive tests using React Testing Library and Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Tests cover:

- Basic rendering and interaction
- Internationalization for all supported languages
- Time selection functionality
- Disabled and read-only states
- Props validation and edge cases

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [x] Build basic component with Storybook
- [x] Add internationalization (i18n) support for text elements
- [x] Add component tests with React Testing Library

## License

MIT

## Author

Tuan Le Hoang - @tuanlehoang

## Acknowledgements

- Design inspired by Ant Design
- Built with Chakra UI v3
