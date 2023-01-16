import { useState } from 'react';
import { Body } from '../components/uikit/Body';
import { Button } from '../components/uikit/Button';
import { Modal } from '../components/uikit/Modal';
import { Guest } from '../hooks/types';
import { useGuests } from '../hooks/useGuests';
import {
  SeatWithLocation,
  useGetSeatsWithLocation,
} from '../hooks/useSeatWithLocation';

export const OptimizeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { iterations, isOptimizing, optimize, stop, scores } = useOptimizer();

  const onClose = () => {
    stop();
    setIsOpen(false);
  };

  // const scoresString = scores.map((s) => s.toFixed(0)).join(', ');

  const getUIScore = () => {
    const bestScore = Math.max(...scores, 0);
    // return bestScore.toFixed(2) * 100;
    return (bestScore * 100).toFixed(0) + '%';
  };

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Optimize
      </Button>
      <Modal title="Optimizer" isOpen={isOpen} onClose={onClose}>
        <Body>Optimizer iterations: {iterations}</Body>
        {/* <Body>Optimizer scores: {scoresString}</Body> */}
        <Body>Optimizer best score: {getUIScore()}</Body>
        <Body>Optimizer is running: {isOptimizing ? 'Yes' : 'No'}</Body>
        <Button onClick={() => optimize(30000)}>Optimize</Button>
      </Modal>
    </>
  );
};

function randomOrder<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

function useOptimizer() {
  const getSeatsWithLocation = useGetSeatsWithLocation();
  const storedGuests = useGuests((s) => s.guests);
  //   const assignSeat = useGuests((s) => s.assignSeat);
  const setGuests = useGuests((s) => s.setGuests);
  const [iterations, setIterations] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  // let isStopped = false;
  // const [bestGuests, setBestGuests] = useState<Guest[]>([]);

  const optimize = async (iterations: number) => {
    setIsOptimizing(true);
    setIterations(0);
    setScores([]);
    const seats = getSeatsWithLocation();
    await wait(10);
    setGuests(removeOldSeats(storedGuests));
    let bestScore = 0;

    for (let i = 0; i < iterations; i++) {
      // if (isStopped) return;
      if (i % 500 === 0) await wait(1);
      // await wait(1);

      const { guests, score } = await runIteration(storedGuests, seats);
      // console.log('score', score);
      // setGuests(guests);
      setScores((s) => [...s, score]);
      setIterations((i) => i + 1);

      if (score > bestScore) {
        // setBestGuests(guests);
        console.log('New best score', score);
        bestScore = score;
        setGuests(guests);
      }
    }
    setIsOptimizing(false);
  };

  const stop = () => {
    setIterations(0);
  };

  return { optimize, isOptimizing, iterations, stop, scores };
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

async function runIteration(storedGuests: Guest[], seats: SeatWithLocation[]) {
  const copiedGuests = JSON.parse(JSON.stringify(storedGuests)) as Guest[];
  const guests = randomOrder(copiedGuests);

  const guestToSeat = new Map<Guest, SeatWithLocation>();

  const companionPairs = getGuestsInPairs(guests);

  for (const [guest, companion] of companionPairs) {
    for (const seat of seats) {
      const companionSeat = seats.find((s) => s.companionSeatId === seat.id);
      if (!seat || !companionSeat) continue;

      guest.seat = seat;
      companion.seat = companionSeat;
      guestToSeat.set(guest, seat);
      guestToSeat.set(companion, companionSeat);

      // remove the seats from the list
      seats = seats.filter(
        ({ id }) => id !== seat.id && id !== companionSeat.id
      );

      break;
    }
  }

  const guestsWithoutCompanion = guests.filter((guest) => !guest.avecName);
  for (const guest of guestsWithoutCompanion) {
    if (guest.seat) continue;
    const seat = seats.at(0);
    if (!seat) break;

    guest.seat = seat;
    guestToSeat.set(guest, seat);
    seats = seats.filter(({ id }) => id !== seat.id);
  }

  const guestsWithLocationSeat = getGuestsWithLocationSeat(
    guests,
    seats
  ) as GuestWithLocationSeat[];
  const score = calculateArrangementScore(guestsWithLocationSeat);

  return { guests, score };
}

type GuestWithLocationSeat = Guest & { seat: SeatWithLocation };

const getGuestsWithLocationSeat = (
  guests: Guest[],
  seats: SeatWithLocation[]
) => {
  return guests.map((guest) => {
    const seat = seats.find((s) => s.id === guest.seat?.id);
    if (!seat) return guest;
    return { ...guest, seat } as GuestWithLocationSeat;
  }) as GuestWithLocationSeat[];
};

function calculateArrangementScore(guests: GuestWithLocationSeat[]) {
  const allScores: number[] = [];
  for (const guest of guests) {
    const distances = getDistancesToFriends(guest, guests);
    const meanDistance = mean(distances);

    const bestTwo = distances.sort((a, b) => a - b).slice(0, 1);

    if (isNaN(meanDistance)) {
      allScores.push(0);
      continue;
    }

    if (bestTwo.every((d) => d < 100)) {
      allScores.push(1);
      continue;
    }
    if (bestTwo.every((d) => d < 200)) {
      allScores.push(0.5);
      continue;
    }
    if (bestTwo.every((d) => d < 300)) {
      allScores.push(0.25);
      continue;
    }
  }

  const replacedScores = allScores.map((s) => (isNaN(s) ? 0 : s));
  const score = mean(replacedScores) ?? 0;
  // console.log('SCORE: ', score);
  // if (score == 1) console.log('replaced', replacedScores);
  return isNaN(score) ? 0 : score;
}

function mean(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function getAllFriends(
  guest: GuestWithLocationSeat,
  guests: GuestWithLocationSeat[]
) {
  const ownFriends = guests.filter((g) => guest.friendNames.includes(g.name));
  const otherFriends = guests.filter((g) => g.friendNames.includes(guest.name));
  const setList = new Set([...ownFriends, ...otherFriends]).values();
  return Array.from(setList);
}

function getDistancesToFriends(
  guest: GuestWithLocationSeat,
  guests: GuestWithLocationSeat[]
): number[] {
  const friends = getAllFriends(guest, guests);
  const distances = [];

  for (const friend of friends) {
    const distance = getDistanceBetweenSeats(guest.seat, friend.seat);
    distances.push(distance);
  }

  return distances;
}

function getDistanceBetweenSeats(
  seat1: SeatWithLocation,
  seat2: SeatWithLocation
) {
  const x = seat1.x - seat2.x;
  const y = seat1.y - seat2.y;
  return Math.sqrt(x * x + y * y);
}
