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
import { useHighlightRelated } from '../../../hooks/useHighlightFriends';
import { useGetHoveredSeat } from '../../../hooks/useSeat';
import { useHighlightedSeats } from '../../../hooks/useSeatHighlight';

export const Jesse = () => {
  // const guest = useDraggablePerson((s) => s.guest);
  // const isHoveringPerson = useHover(hoverRef);
  // const isHoveringName = useDraggablePerson((s) => s.isHovering);
  // const hoverRef = useRef<HTMLDivElement>(null);
  const { pos, setPos, guest, isDragging, setIsDragging } = useJesse();
  const highlighFriends = useHighlightRelated();
  const clearHighlightedSeats = useHighlightedSeats(
    (s) => s.clearHighlightedSeats
  );

  const getHoveredSeat = useGetHoveredSeat();
  const assignSeat = useGuests((s) => s.assignSeat);

  useEffect(() => {
    if (!guest) return;
    if (isDragging) highlighFriends(guest);
    else clearHighlightedSeats();
  }, [isDragging]);

  const onStop: DraggableEventHandler = () => {
    const seat = getHoveredSeat();
    if (guest && seat) {
      assignSeat(seat, guest);
    }

    setPos(undefined);
    setIsDragging(false);
  };

  // Despawn Jesse after 3 seconds of not dragging
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
        <Icon className="jesse-icon" $isDragging={isDragging} />
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
  animation: fadeIn 0.25s ease-in-out,
    swing 0.3s linear 0.25s
      ${({ $isDragging }) =>
        $isDragging &&
        `, scaleUp 0.25s ease-in-out, scaledSwing 0.6s linear 0.25s infinite;`};

  @keyframes swing {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes scaledSwing {
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

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(30%) rotate(-110deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0%) rotate(0deg);
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
