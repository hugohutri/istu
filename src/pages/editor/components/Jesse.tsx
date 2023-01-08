// TODO: remove this eslint-disable
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { FaChild } from 'react-icons/fa';
import styled from 'styled-components';
import { useHover } from 'usehooks-ts';
// import { useHover } from 'usehooks-ts';
import create from 'zustand';
import { Guest } from '../../../hooks/types';
import { useGuests } from '../../../hooks/useGuests';
import { useGetSeat } from '../../../hooks/useSeat';

export const Jesse = () => {
  // const guest = useDraggablePerson((s) => s.guest);
  // const isHoveringPerson = useHover(hoverRef);
  // const isHoveringName = useDraggablePerson((s) => s.isHovering);
  // const hoverRef = useRef<HTMLDivElement>(null);
  const { pos, setPos, guest, isDragging, setIsDragging } = useJesse();

  const getSeat = useGetSeat();
  const assignSeat = useGuests((s) => s.assignSeat);

  const onStop: DraggableEventHandler = () => {
    const seatId = getCurrentlyHoveredSeat();
    if (guest && seatId) {
      const seat = getSeat(seatId);
      if (seat) {
        assignSeat(seat, guest);
      }
    }
    setPos(undefined);
    setIsDragging(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDragging) {
        setPos(undefined);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  });

  if (!pos) return null;
  if (!guest) return null;

  return (
    <Draggable
      key={guest.name}
      defaultClassNameDragging="dragging"
      onStart={() => setIsDragging(true)}
      onStop={onStop}
      defaultPosition={pos}
      bounds="parent"
    >
      <DraggableContainer className="ignore-drag-scroll">
        {isDragging && <Name>{guest.name}</Name>}
        <Icon $isDragging={isDragging} />
      </DraggableContainer>
    </Draggable>
  );
};

const DraggableContainer = styled.div`
  position: fixed;
  pointer-events: all;
`;

const Name = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  font-size: 0.8rem;
  white-space: nowrap;
  transform: translateX(-50%);
  font-weight: bold;
  color: ${({ theme }) => theme.color.pencil};
`;

const Icon = styled(FaChild)<{ $isDragging: boolean }>`
  color: ${({ theme }) => theme.color.pencil};
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.5rem;

  transform-origin: 50% 20%;
  transform: scale(1);
  animation: fadeInFromRight 0.25s ease-in-out
    ${({ $isDragging }) =>
      $isDragging &&
      `, scaleUp 0.25s ease-in-out, swing 0.6s linear 0.25s infinite;`};

  @keyframes swing {
    0% {
      transform: rotate(0deg) scale(1.5);
    }
    25% {
      transform: rotate(-10deg) scale(1.5);
    }
    75% {
      transform: rotate(10deg) scale(1.5);
    }
    100% {
      transform: rotate(0deg) scale(1.5);
    }
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  @keyframes fadeInFromRight {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    60% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

type JesseStore = {
  isDragging: boolean;
  isHovering: boolean;
  pos?: {
    x: number;
    y: number;
  };
  guest?: Guest;

  setIsDragging: (isDragging: boolean) => void;
  setIsHovering: (isHovering: boolean) => void;
  setPos: (pos?: { x: number; y: number }) => void;
  setGuest: (guest?: Guest) => void;
};

export const useJesse = create<JesseStore>((set) => ({
  isDragging: false,
  isHovering: false,
  pos: undefined,
  guest: undefined,

  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  setIsHovering: (isHovering: boolean) => set({ isHovering }),
  setPos: (pos?: { x: number; y: number }) => set({ pos }),
  setGuest: (guest?: Guest) => set({ guest }),
}));

function getCurrentlyHoveredSeat() {
  const seat = document.querySelector('.seat:hover');
  if (!seat) return;
  const seatId = seat.getAttribute('id');
  console.log('seatId: ', seatId);
  return seatId ?? undefined;
}
