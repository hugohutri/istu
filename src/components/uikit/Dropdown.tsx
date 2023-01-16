import { useState } from 'react';
import styled from 'styled-components';
import { AnimatedChevron } from '../AnimatedChevron';
import { Body } from './Body';

const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownButton = styled(Body)`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.text};
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  defaultOption?: string;
};

export const Dropdown = ({
  options,
  defaultOption,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption ?? options[0]
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    toggleDropdown();
    onChange(option);
  };

  return (
    <DropdownContainer>
      <DropdownButton size="small" variant="bold" onClick={toggleDropdown}>
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
