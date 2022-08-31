import React from "react";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';

beforeEach(() => {
  render(<App />);
})

test('load and dispaly App', async () => {
  const header = await waitFor(() => screen.getByTestId('header'));
  expect(header).toBeInTheDocument();
})
test('handle input change', async () => {
  const { getByTestId } = screen;
  const input = await waitFor(() => getByTestId('input'));
  fireEvent.change(input, { target: { value: 'bahaa' } });
  expect(input.value).toBe('bahaa');
})
test('handle click', async () => {
  const { getByTestId } = screen;
  const button = await waitFor(() => getByTestId('button'));
  expect(button).toHaveTextContent('Log In');
});