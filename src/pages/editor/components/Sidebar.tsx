import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';

const StyledSidebar = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.tertiary};
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Stack spacing={10} dir="column">
        <div>Matti Meikäläinen</div>
        <div>John Doe</div>
        <div>John Smith</div>
        <div>Maija Meikäläinen</div>
        <div>John Doe</div>
        <div>John Smith</div>
        <div>Jappe</div>
        <div>Riku Samulilainen</div>
      </Stack>
    </StyledSidebar>
  );
};
