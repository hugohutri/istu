import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ProgressBar } from '../components/ProgressBar';
import { Body } from '../components/uikit/Body';
import { Button } from '../components/uikit/Button';
import { Dropdown } from '../components/uikit/Dropdown';
import { Modal } from '../components/uikit/Modal';
import { Spacer } from '../components/uikit/Spacer';
import { Stack } from '../components/uikit/Stack';
import { Guest } from '../hooks/types';
import { useGuests } from '../hooks/useGuests';
import {
  SeatWithLocation,
  useGetSeatsWithLocation,
} from '../hooks/useSeatWithLocation';

export const OptimizeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="neutral" onClick={() => setIsOpen(true)}>
        Optimize
      </Button>
      <Modal title="Optimizer" isOpen={isOpen} onClose={onClose}>
        {isOpen && <OptimizerModalContent close={onClose} />}
      </Modal>
    </>
  );
};

const OptimizeStatus = {
  IDLE: '',
  OPTIMIZING: 'Optimizing...',
  DONE: 'Done!',
};

const Iterations = {
  FAST: 10000,
  NORMAL: 100000,
  EXTREME: 1000000,
};

const OptimizerModalContent = ({ close }: { close: () => void }) => {
  const [maxIterations, setMaxIterations] = useState(Iterations.NORMAL);
  const { iterations, isOptimizing, optimize, stop, bestScore } =
    useOptimizer();

  useEffect(() => {
    return () => stop();
  }, []);
  // const scoresString = scores.map((s) => s.toFixed(0)).join(', ');

  const getUIScore = () => {
    if (bestScore == undefined) return '';
    // return bestScore.toFixed(2) * 100;
    return (bestScore * 100).toFixed(0);
  };

  const getStatus = () => {
    if (isOptimizing) return OptimizeStatus.OPTIMIZING;
    if (bestScore !== undefined) return OptimizeStatus.DONE;
    return OptimizeStatus.IDLE;
  };

  const setMode = (mode: string) => {
    if (mode === 'Fast') {
      setMaxIterations(Iterations.FAST);
    } else if (mode === 'Normal') {
      setMaxIterations(Iterations.NORMAL);
    } else if (mode === 'Extreme') {
      setMaxIterations(Iterations.EXTREME);
    }
  };

  return (
    <ModalContent>
      <Body>
        Optimizer will try to find a good seating arrangement for your guests.
        It will keep guests and companions together, and try to some friends
        together. The maximum score is 100, but is unlikely to be reached.
      </Body>
      {/* <AdvancedOptions /> */}
      <Spacer amount="0.5rem" />
      <Body size="small" variant="bold">
        Optimization mode
      </Body>
      <Dropdown
        options={['Fast', 'Normal', 'Extreme']}
        defaultOption="Normal"
        onChange={setMode}
      />
      <Spacer amount="0.5rem" />
      {getStatus() !== OptimizeStatus.IDLE && (
        <>
          <Score>{getUIScore()}</Score>
          <Spacer amount="0.5rem" />
          <Body>{getStatus()}</Body>
          <Spacer amount="0.5rem" />
        </>
      )}

      {iterations > 0 && (
        <>
          <Body size="small">
            {iterations}/{maxIterations}
          </Body>
          <ProgressBar percentage={(iterations / maxIterations) * 100} />
        </>
      )}
      <Spacer amount="10px" />
      <Stack dir="row" spacing={10} justify="flex-end">
        {/* <Button
          variant="neutral"
          disabled={!isOptimizing}
          onClick={() => stop()}
        >
          Stop
        </Button> */}
        {getStatus() !== OptimizeStatus.DONE && (
          <Button
            disabled={isOptimizing}
            onClick={() => optimize(maxIterations)}
          >
            Optimize
          </Button>
        )}
        {getStatus() === OptimizeStatus.DONE && (
          <Button onClick={close}>Close</Button>
        )}
      </Stack>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  width: 400px;
`;

const Score = styled(Body)`
  font-size: 3rem;
  padding: 2rem;
  // aling to center
  display: flex;
  justify-content: center;
  align-items: center;

  // after is there is content inside
  &:after {
    content: '/100';
    font-size: 1rem;
    margin-left: 0.1rem;
  }

  &:empty {
    :before {
      content: '-';
    }
    :after {
      content: '';
    }
  }
`;

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
  const [bestScore, setBestScore] = useState<number>();

  const isStopped = useRef(false);

  const optimize = async (iterations: number) => {
    setIsOptimizing(true);
    setIterations(0);
    setBestScore(0);
    // setScores([]);
    isStopped.current = false;
    const seatsWithLoc = getSeatsWithLocation();
    await wait(10);
    let bestScore = 0;
    let bestGuests: Guest[] = [];

    // console.time('optimize');
    // console.time('iteration');

    for (let i = 0; i < iterations; i++) {
      const seats = randomOrder(seatsWithLoc);

      if (isStopped.current) {
        setIsOptimizing(false);
        return;
      }

      // Wait for a milliseconds every 1000 iterations to allow the UI to update
      if (i % 1000 === 0) {
        await wait(1);
        // console.timeEnd('iteration');
        // console.time('iteration');
      }
      // await wait(1);

      const { guests, score } = await runIteration(storedGuests, seats);
      // console.log('score', score);
      // setGuests(guests);
      // setScores((s) => [...s, score]);
      setIterations((i) => i + 1);

      if (score > bestScore) {
        // setBestGuests(guests);
        console.log('New best score', score);
        bestScore = score;
        setBestScore(bestScore);
        bestGuests = guests;
      }
    }

    // console.timeEnd('optimize');
    setGuests(bestGuests);
    setIsOptimizing(false);
  };

  const stop = () => {
    isStopped.current = true;
  };

  return { optimize, isOptimizing, iterations, stop, bestScore };
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
  const guests = removeOldSeats(randomOrder(copiedGuests));

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
    const bestDistance = bestTwo.at(0) ?? 0;
    if (bestDistance > 400) {
      allScores.push(-1);
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
