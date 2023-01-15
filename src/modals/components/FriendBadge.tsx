import styled from 'styled-components';

export const FriendBadge = styled.div`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 25px;
  margin: 0.1rem;
  background-color: ${(props) => props.theme.color.chip};
  font-size: ${(props) => props.theme.fontSize.xsmall};
  color: ${(props) => props.theme.color.text};
`;
