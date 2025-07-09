import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('TimePicker Basic Tests', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders with time value', () => {
    renderWithChakra(<TimePicker value="12:30" onChange={mockOnChange} />);
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });

  test('renders with empty value showing placeholder', () => {
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

  test('shows Vietnamese locale text', () => {
    renderWithChakra(
      <TimePicker value="" onChange={mockOnChange} locale="vi" />
    );
    expect(screen.getByText('Chọn thời gian')).toBeInTheDocument();
  });

  test('shows Spanish locale text', () => {
    renderWithChakra(
      <TimePicker value="" onChange={mockOnChange} locale="es" />
    );
    expect(screen.getByText('Seleccionar hora')).toBeInTheDocument();
  });

  test('disabled state prevents interaction', () => {
    renderWithChakra(
      <TimePicker value="12:30" onChange={mockOnChange} disabled />
    );
    
    // Try to click - should not open dropdown
    fireEvent.click(screen.getByText('12:30'));
    
    // Dropdown should not appear (no OK button)
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
  });

  test('read-only state prevents interaction', () => {
    renderWithChakra(
      <TimePicker value="12:30" onChange={mockOnChange} isReadOnly />
    );
    
    // Try to click - should not open dropdown
    fireEvent.click(screen.getByText('12:30'));
    
    // Dropdown should not appear (no OK button)
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
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
        value="" 
        onChange={mockOnChange} 
        locale={"invalid" as any}
      />
    );
    
    // Should fall back to English
    expect(screen.getByText('Select time')).toBeInTheDocument();
  });
});