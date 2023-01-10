import styled, { css } from 'styled-components';

type ButtonProps = {
  variant?: 'primary' | 'neutral';
  size?: 'small' | 'normal';
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'normal',
  ...props
}: React.ComponentPropsWithoutRef<'button'> & ButtonProps) => {
  return (
    <StyledButton {...props} variant={variant} size={size}>
      <span>{children}</span>
    </StyledButton>
  );
};

const buttonStyles = css<ButtonProps>`
  // Fix remove default button styles
  border: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
  white-space: nowrap;
  cursor: pointer;

  position: relative;
  font-weight: bold;
  font-family: 'Comfortaa';
  font-size: ${({ size }) => (size === 'small' ? '0.6rem' : '1rem')};
  line-height: ${({ size }) => (size === 'small' ? '2' : '1.2')};
  text-transform: uppercase;
  color: ${(props) => props.theme.color.pencil};
  text-decoration: none;
  padding-bottom: 3px;
  border-radius: 4px;
  box-shadow: 0 2px 0 ${(props) => props.theme.color.pencil};
  /* transition: padding 0.2s, box-shadow 0.2s, top 0.2s; */
  transition: all 0.2s;

  user-select: none;
  background: linear-gradient(to bottom, transparent 50%, white 50%);

  /* create a span { withs styled component */
  span {
    background: ${(props) => props.theme.color.elevated};
    display: block;
    margin: 0 -1px;

    padding: ${({ size }) =>
      size === 'small' ? '0.1rem 0.6rem 0rem' : '0.3rem 0.9rem 0.2rem'};

    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.color.pencil};
  }

  :disabled > span {
    border-color: ${(props) => props.theme.color.muted2};
    background: ${(props) => props.theme.color.muted5};
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

  :not(:disabled) > span {
    background: ${({ variant, theme }) =>
      variant === 'primary' ? theme.color.button : theme.color.buttonNeutral};
  }

  :disabled {
    color: ${(props) => props.theme.color.muted2};
    box-shadow: 0 2px 0 ${(props) => props.theme.color.muted2};
    cursor: default;
  }
`;
<<<<<<< HEAD

=======
>>>>>>> 7f39d85a3f65ea4bfb7352f02a81b9a752f3d9ce
const StyledButton = styled.button<ButtonProps>`
  ${buttonStyles}
`;
