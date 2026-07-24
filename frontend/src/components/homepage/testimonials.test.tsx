import { describe, expect, it } from 'vitest';
import Testimonials from './testimonials';
import { render, screen } from '@testing-library/react';

describe('Testimonials', () => {
  it('should render the testimonials photo', () => {
    render(<Testimonials />);

    screen.debug();
    const photo = screen.getByTestId('@testimonials/photos');
    expect(photo).toBeInTheDocument();
  });
});
