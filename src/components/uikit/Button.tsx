import styled, { css } from 'styled-components';

export const OldButton = styled.button`
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

export const Button = ({
  children,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & { disabled?: boolean }) => {
  return (
    <StyledButton {...props} disabled={disabled}>
      <span>{children}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button<{ disabled?: boolean }>`
  // Fix remove default button styles
  border: 0;
  padding: 0;
  color: white;
  font-family: system-ui, sans-serif;
  white-space: nowrap;
  cursor: pointer;

  position: relative;
  float: left;
  font: normal 22px/25px 'Patrick Hand', sans-serif;
  margin-right: 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.pencil};
  text-decoration: none;
  padding-bottom: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 0 ${(props) => props.theme.color.pencil};
  transition: padding 0.1s, box-shadow 0.1s, top 0.1s;

  user-select: none;

  /* create a span { withs styled component */
  span {
    background: ${(props) => props.theme.color.elevated};
    display: block;
    padding: 5px 15px;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.color.pencil};
  }
  // hover and not not disabled
  :hover:not(:disabled) {
    box-shadow: 0 2px 0 ${(props) => props.theme.color.pencil},
      0 2px 0px 2px ${(props) => props.theme.color.primaryElevated};
  }
  :active:not(:disabled) {
    top: 4px;
    padding-bottom: 0px;
    padding-top: 3px;
    background: transparent;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.pencil};
  }
  :disabled {
    color: ${(props) => props.theme.color.muted1};
    cursor: default;
  }

  /* :disabled { */
  /* ${(props) =>
    props.disabled &&
    css`
      color: ${(props) => props.theme.color.muted1};
      cursor: not-allowed;
    `} */
`;
