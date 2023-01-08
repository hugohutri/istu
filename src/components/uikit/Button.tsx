import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.onPrimary};
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease-in-out;

  &:disabled {
    background-color: ${(props) => props.theme.color.muted1};
    cursor: not-allowed;
  }
`;
