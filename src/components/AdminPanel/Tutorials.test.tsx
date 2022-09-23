import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Tutorials from './Tutorials';
import { wait } from '@testing-library/user-event/dist/utils';

test('fetches & receives tutorials', async () => {
  renderWithProviders(<Tutorials />);

  expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
  await wait(200);
  const tutorials = await screen.findAllByTestId('tutorial-box-container');
  expect(tutorials).toHaveLength(3);
});
