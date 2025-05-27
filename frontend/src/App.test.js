import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders home page header and buttons', () => {
  render(<App />);
  
  const texts = [
    'Home Page',
    'Go to User Profile',
    'Home',
    'Go to Products List'
  ]

  texts.forEach(text => {
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
  });
});
