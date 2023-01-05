import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';
import { useGuests } from '../hooks/useGuests';
import { GuestItem } from './GuestItem';
import { AddPersonModal } from '../../../modals/AddPersonModal';

const StyledSidebar = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.tertiary};
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input``;

const NameList = styled(Stack)`
  flex-grow: 1;
`;

export const Sidebar = () => {
  const { guests } = useGuests();
  return (
    <StyledSidebar>
      <NameList spacing={10} dir="column">
        {guests.map((guest) => (
          <GuestItem guest={guest} key={guest.name}></GuestItem>
        ))}
      </NameList>
      <NameInput></NameInput>

      <AddPersonModal />
    </StyledSidebar>
  );
};
