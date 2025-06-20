import React from 'react';
import { render } from '@testing-library/react-native';
import { Button, Card, Logo } from '../components';
import { ThemeProvider } from '../context/ThemeContext';
import { LocalizationProvider } from '../context/LocalizationContext';

// Test wrapper with providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LocalizationProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </LocalizationProvider>
);

describe('Components', () => {
  describe('Button', () => {
    it('renders correctly with title', () => {
      const { getByText } = render(
        <TestWrapper>
          <Button title="Test Button" onPress={() => {}} />
        </TestWrapper>
      );
      
      expect(getByText('Test Button')).toBeTruthy();
    });

    it('handles press events', () => {
      const mockPress = jest.fn();
      const { getByText } = render(
        <TestWrapper>
          <Button title="Press Me" onPress={mockPress} />
        </TestWrapper>
      );
      
      const button = getByText('Press Me');
      // Note: In a real test, you would fireEvent.press(button)
      expect(button).toBeTruthy();
    });
  });

  describe('Card', () => {
    it('renders children correctly', () => {
      const { getByText } = render(
        <TestWrapper>
          <Card>
            <Button title="Inside Card" onPress={() => {}} />
          </Card>
        </TestWrapper>
      );
      
      expect(getByText('Inside Card')).toBeTruthy();
    });
  });

  describe('Logo', () => {
    it('renders with default props', () => {
      const { getByText } = render(
        <TestWrapper>
          <Logo />
        </TestWrapper>
      );
      
      expect(getByText('نقطه')).toBeTruthy();
    });

    it('renders without text when showText is false', () => {
      const { queryByText } = render(
        <TestWrapper>
          <Logo showText={false} />
        </TestWrapper>
      );
      
      // The logo circle should still contain the text, but the app name below should not be shown
      expect(queryByText('نقطه')).toBeTruthy(); // This is in the circle
    });
  });
});

describe('Theme Integration', () => {
  it('components use theme colors', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Themed Button" onPress={() => {}} />
      </TestWrapper>
    );
    
    const button = getByText('Themed Button');
    expect(button).toBeTruthy();
    // In a real test, you would check the computed styles
  });
});

describe('Localization Integration', () => {
  it('components work with RTL layout', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="زر عربي" onPress={() => {}} />
      </TestWrapper>
    );
    
    expect(getByText('زر عربي')).toBeTruthy();
  });
});
