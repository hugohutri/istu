import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarBase = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  background-color: ${(props) => props.theme.color.primary};
  /* border-bottom: 3px solid black; */
  border-bottom: 1px solid ${(props) => props.theme.color.muted};
`;

const NavbarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.color.contrast};
  font-size: 1.2rem;
  padding: 1.2rem;
  border-width: 5px 0;
  border-color: transparent;
  border-style: solid;

  &:hover {
    border-bottom-color: ${(props) => props.theme.color.contrast};
    background-color: #fff3;
  }
`;

export const Navbar = () => {
  return (
    <NavbarBase>
      {/* <NavbarLink to={'Home'}>Home</NavbarLink> */}
      <NavbarLink to={'Editor'}>Editor</NavbarLink>
      <NavbarLink to={'About'}>About</NavbarLink>
    </NavbarBase>
  );
};
