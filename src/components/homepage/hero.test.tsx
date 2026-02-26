import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Hero from './hero';

import * as authContext from '@/context/auth.context';
import { MemoryRouter } from 'react-router-dom';
import type { TRegisteredUser } from '@/shared/types/registered-user';

const renderHero = (user: TRegisteredUser | null) => {
  vi.spyOn(authContext, 'useAuthContext').mockReturnValue({
    user,
    loginUser: vi.fn(),
    registerUser: vi.fn(),
    logoutUser: vi.fn(),
  });
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );
};

describe('Homepage hero', () => {
  it('should render the register link', () => {
    renderHero(null);

    const registerBtn = screen.getByTestId('@hero/register-link');
    expect(registerBtn).toBeInTheDocument();
  });

  it('should render the dashboard link if user is authenticated', () => {
    renderHero({
      login: 'login',
      password: 'password',
      createdAt: new Date(),
    });

    const dashboardLink = screen.getByTestId('@hero/dashboard-link');
    expect(dashboardLink).toBeInTheDocument();
  });
});
