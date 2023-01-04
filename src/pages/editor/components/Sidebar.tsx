import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';

const StyledSidebar = styled.div`
  padding: 1rem;
  border-left: 3px solid black;
  background-color: #fff3;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Stack spacing={10}>sidebar</Stack>
    </StyledSidebar>
  );
};
