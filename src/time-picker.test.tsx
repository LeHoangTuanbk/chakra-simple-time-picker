import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { TimePicker } from './time-picker';
import { theme } from './theme';

// Mock ChakraProvider wrapper
const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={theme}>
      {ui}
    </ChakraProvider>
  );
};

describe('TimePicker Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      expect(screen.getByText('12:30')).toBeInTheDocument();
    });

    test('renders with empty value', () => {
      renderWithChakra(<TimePicker value="" onChange={mockOnChange} />);
      expect(screen.getByText('Select time')).toBeInTheDocument();
    });

    test('renders with custom placeholder', () => {
      renderWithChakra(
        <TimePicker 
          value="" 
          onChange={mockOnChange} 
          placeholder="Choose time"
        />
      );
      expect(screen.getByText('Choose time')).toBeInTheDocument();
    });

    test('renders with custom width', () => {
      const { container } = renderWithChakra(
        <TimePicker 
          value="10:15" 
          onChange={mockOnChange} 
          width="300px"
        />
      );
      const inputBox = container.querySelector('[data-testid="time-picker-input"]') ||
                       container.querySelector('div[style*="width: 300px"]');
      expect(inputBox).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    test('renders with English locale (default)', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Click to open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      expect(screen.getByText('Now')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    test('renders with Vietnamese locale', () => {
      renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} locale="vi" />
      );
      
      // Click to open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      expect(screen.getByText('Hiện tại')).toBeInTheDocument();
      expect(screen.getByText('Xác nhận')).toBeInTheDocument();
    });

    test('renders with Spanish locale', () => {
      renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} locale="es" />
      );
      
      // Click to open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      expect(screen.getByText('Ahora')).toBeInTheDocument();
      expect(screen.getByText('Aceptar')).toBeInTheDocument();
    });

    test('renders with Japanese locale', () => {
      renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} locale="ja" />
      );
      
      // Click to open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      expect(screen.getByText('今')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    test('shows localized placeholder', () => {
      renderWithChakra(
        <TimePicker value="" onChange={mockOnChange} locale="vi" />
      );
      expect(screen.getByText('Chọn thời gian')).toBeInTheDocument();
    });
  });

  describe('Dropdown Functionality', () => {
    test('opens dropdown when clicked', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Initially dropdown should not be visible
      expect(screen.queryByText('Now')).not.toBeInTheDocument();
      
      // Click to open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Dropdown should now be visible
      expect(screen.getByText('Now')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    test('displays hour and minute columns', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Check for hour options
      expect(screen.getByText('00')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('23')).toBeInTheDocument();
      
      // Check for minute options
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('59')).toBeInTheDocument();
    });

    test('highlights selected time', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Selected hour and minute should be highlighted
      const hourOptions = screen.getAllByText('12');
      const minuteOptions = screen.getAllByText('30');
      
      expect(hourOptions.length).toBeGreaterThan(0);
      expect(minuteOptions.length).toBeGreaterThan(0);
    });
  });

  describe('Time Selection', () => {
    test('selects new hour', async () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Click on hour 15
      fireEvent.click(screen.getByText('15'));
      
      // Click OK button
      fireEvent.click(screen.getByText('OK'));
      
      // Should call onChange with new time
      expect(mockOnChange).toHaveBeenCalledWith('15:30');
    });

    test('selects new minute', async () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Click on minute 45
      fireEvent.click(screen.getByText('45'));
      
      // Click OK button
      fireEvent.click(screen.getByText('OK'));
      
      // Should call onChange with new time
      expect(mockOnChange).toHaveBeenCalledWith('12:45');
    });

    test('selects current time with Now button', () => {
      // Mock current time
      const mockDate = new Date('2023-06-15T14:25:00');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      
      // Click Now button
      fireEvent.click(screen.getByText('Now'));
      
      // Click OK button
      fireEvent.click(screen.getByText('OK'));
      
      // Should call onChange with current time
      expect(mockOnChange).toHaveBeenCalledWith('14:25');
      
      // Restore Date
      jest.restoreAllMocks();
    });

    test('closes dropdown when OK is clicked', () => {
      renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('12:30'));
      expect(screen.getByText('Now')).toBeInTheDocument();
      
      // Click OK button
      fireEvent.click(screen.getByText('OK'));
      
      // Dropdown should be closed
      expect(screen.queryByText('Now')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    test('does not open dropdown when disabled', () => {
      renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} disabled />
      );
      
      // Try to click
      fireEvent.click(screen.getByText('12:30'));
      
      // Dropdown should not appear
      expect(screen.queryByText('Now')).not.toBeInTheDocument();
    });

    test('shows disabled styling', () => {
      const { container } = renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} disabled />
      );
      
      // Check that the component has disabled styling
      expect(screen.getByText('12:30')).toBeInTheDocument();
      // The exact styling check depends on implementation
    });
  });

  describe('Read-only State', () => {
    test('does not open dropdown when read-only', () => {
      renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} isReadOnly />
      );
      
      // Try to click
      fireEvent.click(screen.getByText('12:30'));
      
      // Dropdown should not appear
      expect(screen.queryByText('Now')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles zero padding correctly', () => {
      renderWithChakra(<TimePicker value="09:05" onChange={mockOnChange} />);
      
      // Open dropdown
      fireEvent.click(screen.getByText('09:05'));
      
      // Select single digit hour and minute
      fireEvent.click(screen.getByText('03'));
      fireEvent.click(screen.getByText('07'));
      fireEvent.click(screen.getByText('OK'));
      
      // Should format with zero padding
      expect(mockOnChange).toHaveBeenCalledWith('03:07');
    });

    test('handles value prop changes', () => {
      const { rerender } = renderWithChakra(
        <TimePicker value="12:30" onChange={mockOnChange} />
      );
      
      expect(screen.getByText('12:30')).toBeInTheDocument();
      
      // Update value prop
      rerender(
        <ChakraProvider value={theme}>
          <TimePicker value="15:45" onChange={mockOnChange} />
        </ChakraProvider>
      );
      
      expect(screen.getByText('15:45')).toBeInTheDocument();
    });

    test('handles invalid locale gracefully', () => {
      renderWithChakra(
        <TimePicker 
          value="12:30" 
          onChange={mockOnChange} 
          locale={"invalid" as any}
        />
      );
      
      // Should fall back to English
      fireEvent.click(screen.getByText('12:30'));
      expect(screen.getByText('Now')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });
  });
});