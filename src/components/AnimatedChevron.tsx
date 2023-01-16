import { FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

export const AnimatedChevron = styled(FaChevronRight)<{ open: boolean }>`
  transition: transform 0.2s ease-in-out;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;
