import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.textInverted};
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  //if button disabled, change background color to grey
  &:disabled {
    background-color: ${(props) => props.theme.color.muted};
    cursor: not-allowed;
  }
`;
