import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RandomButton } from '../../../utils/RandomButton';

const NavbarBase = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  background-color: ${(props) => props.theme.color.nav};
  /* border-bottom: 3px solid black; */
  /* border-bottom: 1px solid ${(props) => props.theme.color.border}; */
`;

const NavbarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.color.onPrimary};
  font-size: 1.2rem;
  padding: 1.2rem;
  border-width: 5px 0;
  border-color: transparent;
  border-style: solid;

  &:hover {
    border-bottom-color: ${(props) => props.theme.color.onPrimary};
  }
`;

export const Navbar = () => {
  return (
    <NavbarBase id="nav">
      {/* <NavbarLink to={'Home'}>Home</NavbarLink> */}
      <NavbarLink to={'editor'}>Editor</NavbarLink>
      <NavbarLink to={'about'}>About</NavbarLink>
      <Filler />
      <RandomButton />
    </NavbarBase>
  );
};

export const Filler = styled.div`
  flex-grow: 1;
`;
