import { useState } from 'react';
import styled, { css } from 'styled-components';
import { AnimatedChevron } from '../AnimatedChevron';
import { Body } from './Body';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(Body)<{ disabled: boolean }>`
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.color.background};
  border: 1px solid ${(props) => props.theme.color.text};
  color: ${(props) => props.theme.color.text};
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.color.muted1};
      background-color: ${props.theme.color.muted5};
      border: 1px solid ${props.theme.color.muted2};
      cursor: auto;
    `};
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  background-color: ${(props) => props.theme.color.background};
  border: 1px solid ${(props) => props.theme.color.border};
  box-sizing: border-box;
  z-index: 1;
  width: 100%;
`;

const DropdownItem = styled(Body)`
  padding: 8px;
  &:hover {
    background-color: ${(props) => props.theme.color.primaryElevated};
    color: ${(props) => props.theme.color.onPrimary};
    cursor: pointer;
  }
`;

type DropdownProps = {
  options: string[];
  onChange: (option: string) => void;
  disabled?: boolean;
  defaultOption?: string;
};

export const Dropdown = ({
  options,
  defaultOption,
  onChange,
  disabled = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption ?? options[0]
  );

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    toggleDropdown();
    onChange(option);
  };

  return (
    <DropdownContainer>
      <DropdownButton
        disabled={disabled}
        size="small"
        variant="bold"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <AnimatedChevron open={isOpen} size="0.7rem" />
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              size="small"
              key={option}
              onClick={() => selectOption(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
