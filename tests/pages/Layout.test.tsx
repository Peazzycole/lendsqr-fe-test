import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../src/pages/layout/Layout';
import '@testing-library/jest-dom';

jest.mock('../../src/components/navbar/Navbar.tsx', () => () => <div data-testid="navbar" />);
jest.mock('../../src/components/sidebar/Sidebar.tsx', () => () => <div data-testid="sidebar" />);

describe('Layout component', () => {
    const renderWithRouter = (ui: React.ReactNode, initialPath = '/') => {
        return render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Routes>
                    <Route path="/*" element={ui}>
                        <Route path="child" element={<div data-testid="child-page" />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render Navbar and Sidebar', () => {
        renderWithRouter(<Layout />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('should render the Outlet content when route matches', () => {
        renderWithRouter(<Layout />, '/child');
        expect(screen.getByTestId('child-page')).toBeInTheDocument();
    });

    it('snapshot: matches the layout structure', () => {
        const { container } = renderWithRouter(<Layout />);
        expect(container).toMatchSnapshot();
    });
});
