import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarBase = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: #fff;
  /* padding: 2rem; */
  border-bottom: 5px solid black;
`;

const NavbarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  padding: 2rem;
  border-width: 5px 0;
  border-color: transparent;
  border-style: solid;

  &:hover {
    border-bottom-color: blueviolet;
  }
`;

export const Navbar = () => {
  return (
    <NavbarBase>
      <NavbarLink to={'Home'}>Home</NavbarLink>
      <NavbarLink to={'Editor'}>Editor</NavbarLink>
      <NavbarLink to={'About'}>About</NavbarLink>
    </NavbarBase>
  );
};
