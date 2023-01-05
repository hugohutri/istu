import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';
import { AddPersonModal } from '../../../modals/AddPersonModal';

const StyledSidebar = styled.div`
  padding: 1rem;
  /* border-left: 3px solid ${(props) => props.theme.color.contrast}; */
  background-color: ${(props) => props.theme.color.tertiary};
  border-left: 1px solid ${(props) => props.theme.color.muted};

  // box-shadow: <horizontal offset> <vertical offset> <blur radius> <spread radius> <color>;
  box-shadow: -6px 0 5px 0px #0001;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Stack spacing={10}>sidebar</Stack>
      <AddPersonModal />
    </StyledSidebar>
  );
};
