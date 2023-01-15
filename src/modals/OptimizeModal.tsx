import { useState } from 'react';
import { Body } from '../components/uikit/Body';
import { Button } from '../components/uikit/Button';
import { Modal } from '../components/uikit/Modal';
import { Guest } from '../hooks/types';
import { useGuests } from '../hooks/useGuests';
import { useGetSeatsWithLocation } from '../hooks/useSeatWithLocation';

export const OptimizeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { iterations, isOptimizing, optimize, stop } = useOptimizer();

  const onClose = () => {
    stop();
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Optimize
      </Button>
      <Modal title="Optimizer" isOpen={isOpen} onClose={onClose}>
        <Body>Optimizer iterations: {iterations}</Body>
        <Body>Optimizer is running: {isOptimizing ? 'Yes' : 'No'}</Body>
        <Button onClick={() => optimize(10)}>Optimize</Button>
      </Modal>
    </>
  );
};

function useOptimizer() {
  const getSeatsWithLocation = useGetSeatsWithLocation();
  const guests = useGuests((s) => s.guests);
  const assignSeat = useGuests((s) => s.assignSeat);
  const setGuests = useGuests((s) => s.setGuests);
  const [iterations, setIterations] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const runIteration = async () => {
    let seats = getSeatsWithLocation();
    // console.table(seats);
    // console.table(guests);

    setGuests(removeOldSeats(guests));
    await wait(100);

    const companionPairs = getGuestsInPairs(guests);

    for (const [guest, companion] of companionPairs) {
      for (const seat of seats) {
        const companionSeat = seats.find((s) => s.companionSeatId === seat.id);
        if (!seat || !companionSeat) break;

        assignSeat(seat, guest);
        assignSeat(companionSeat, companion);

        // remove the seats from the list
        seats = seats.filter(
          ({ id }) => id !== seat.id && id !== companionSeat.id
        );

        await wait(100);
        break;
      }
    }

    const guestsWithoutCompanion = guests.filter((guest) => !guest.avecName);
    for (const guest of guestsWithoutCompanion) {
      if (guest.seat) continue;
      const seat = seats.at(0);
      if (!seat) break;

      assignSeat(seat, guest);
      seats = seats.filter(({ id }) => id !== seat.id);
      await wait(100);
    }
  };

  const optimize = async (iterations: number) => {
    setIsOptimizing(true);
    setIterations(0);
    await wait(100);

    for (let i = 0; i < iterations; i++) {
      //   if (!isOptimizing) {
      //     break;
      //   }
      await runIteration();
      setIterations((i) => i + 1);
    }
    setIsOptimizing(false);
  };

  const stop = () => {
    setIsOptimizing(false);
  };

  return { optimize, isOptimizing, iterations, stop };
}

const removeOldSeats = (guests: Guest[]) => {
  return guests.map((guest) => {
    guest.seat = undefined;
    return guest;
  });
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGuestsInPairs(guests: Guest[]) {
  const guestsWithCompanion = guests.filter((guest) => guest.avecName);

  const pairs = new Map<Guest, Guest>();

  for (const guest of guestsWithCompanion) {
    const companion = guests.find((g) => g.name === guest.avecName);
    if (!companion) continue;

    if (pairs.has(companion)) continue;
    if (pairs.has(guest)) continue;

    pairs.set(guest, companion);
  }

  return pairs;
}

// function calculateArrangementScore(guests: Guest[], seats: Seats) {
//   const guestsWithCompanion = guests.filter((guest) => guest.avecName);

//   let score = 0;
//   for (const guest of guestsWithCompanion) {
//     const companion = guests.find((g) => g.name === guest.avecName);
//     if (!companion) continue;

//     if (guest.seat && companion.seat) {
//       const distance = getDistanceBetweenSeats(guest.seat, companion.seat);
//       score += distance;
//     }
//   }

//   return score;
// }

// function getDistanceBetweenSeats(seat: Seat, seat1: Seat) {
//   return Math.abs(seat.x - seat1.x) + Math.abs(seat.y - seat1.y);
// }
