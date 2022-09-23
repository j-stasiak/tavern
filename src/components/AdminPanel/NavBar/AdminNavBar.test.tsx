import React from 'react';
import { render } from '@testing-library/react';
import AdminNavBar from './AdminNavBar';
import { BrowserRouter } from 'react-router-dom';

jest.mock('jwt-decode', () => () => ({ role: 'admin' }));
jest.mock('../../../hooks/useToken', () => () => ({ token: 'testToken' }));

test('AdminNavBarTest', () => {
  const renderer = render(
    <BrowserRouter>
      <AdminNavBar />
    </BrowserRouter>
  );
  expect(renderer).toMatchSnapshot();
});
