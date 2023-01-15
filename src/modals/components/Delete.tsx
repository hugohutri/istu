import styled from 'styled-components';

export const Delete = styled.span`
  cursor: pointer;
  user-select: none;
  padding-left: 0.5rem;
  color: ${(props) => props.theme.color.text};
`;
