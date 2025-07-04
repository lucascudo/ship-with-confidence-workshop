import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders home page header and buttons', () => {  
  render(<App />);
  
  const screenElements = [
    { text: 'Home Page', navigateTo: '' },
    { text: 'Go to User Profile', navigateTo: 'user-profile' },
    { text: 'Home', navigateTo: '' },
    { text: 'Go to Products List', navigateTo: 'products' }
  ];

  screenElements.forEach(screenElement => {
    const element = screen.getByText(screenElement.text);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(window.location.href.split('/').pop()).toBe(screenElement.navigateTo);
  });
});
