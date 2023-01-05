import styled from 'styled-components';
import { Stack } from '../../../components/uikit/Stack';
import { useGuests } from '../hooks/useGuests';
import { GuestItem } from './GuestItem';

const StyledSidebar = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.tertiary};
`;

const Accordion = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
`;

export const Sidebar = () => {
  const guests = useGuests();
  return (
    <StyledSidebar>
      <Stack spacing={10} dir="column">
        {guests.map((guest) => (
          <GuestItem guest={guest} key={guest.name}></GuestItem>
        ))}
      </Stack>
    </StyledSidebar>
  );
};
