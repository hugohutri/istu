import { Guest, Seat } from './types';
import create from 'zustand';

type RelatedGuests = {
  friends: Guest[];
  companion: Guest | undefined;
  self: Guest;
  others: Guest[];
};

type GuestsStore = {
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  addGuest: (newGuest: Guest) => void;
  addGuests: (newGuests: Guest[]) => void;
  assignSeat: (seat: Seat, guest: Guest) => void;
  removeGuest: (guest: Guest) => void;
  getRelatedGuests: (guest: Guest) => RelatedGuests;
};

export const useGuests = create<GuestsStore>((set, get) => ({
  guests: [],
  setGuests: (guests) => set(() => ({ guests: [...guests] })),
  addGuest: (newGuest) =>
    set(({ guests }) => {
      // if guest with same name excists, add (index) to the end of the name. eg. John Doe (2)
      if (isNameTaken(guests, newGuest)) {
        const updatedGuest = getUserWithIndexedName(guests, newGuest);
        return { guests: [...guests, updatedGuest] };
      }

      return { guests: [...guests, newGuest] };
    }),

  addGuests: (newGuests) =>
    set(({ guests }) => {
      const updatedGuests = [...guests];

      for (const guest of newGuests) {
        if (isNameTaken(updatedGuests, guest)) {
          const updatedGuest = getUserWithIndexedName(updatedGuests, guest);
          updatedGuests.push(updatedGuest);
        } else {
          updatedGuests.push(guest);
        }
      }

      return { guests: updatedGuests };
    }),

  assignSeat: (seat, guest) => {
    set((state) => {
      const newGuests = [...state.guests];

      // Remove seat from the guest that was previously assigned to it
      // Ns. Vedä tuoli alta
      const previousGuestIdx = newGuests.findIndex(
        (g) => g.seat?.id === seat.id
      );

      if (previousGuestIdx !== -1) {
        newGuests[previousGuestIdx].seat = undefined;
      }

      // Assign seat to the new guest
      const index = newGuests.findIndex((g) => g.name === guest.name);
      newGuests[index].seat = seat;
      return { guests: newGuests };
    });
  },

  removeGuest: (guest) => {
    set((state) => {
      const newGuests = [...state.guests];
      const index = newGuests.findIndex((g) => g.name === guest.name);
      newGuests.splice(index, 1);
      return { guests: newGuests };
    });
  },

  getRelatedGuests: (guest) => {
    const { guests } = get();
    const otherFriends = guests.filter((g) =>
      g.friendNames.includes(guest.name)
    );
    const ownFriends = guests.filter((g) => guest.friendNames.includes(g.name));
    const friends = [...otherFriends, ...ownFriends];
    const companion = guests.find((g) => g.name === guest.avecName);

    const others = guests.filter(
      (g) => g.name !== guest.name && !friends.includes(g) && g !== companion
    );
    return {
      friends,
      companion,
      self: guest,
      others,
    };
  },
}));

export const getInitials = (guest: Guest, limit: number) => {
  return guest.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, limit)
    .join('')
    .replace('(', '');
};

// Name guests with same name like this:
// John Doe, John Doe (2), John Doe (3), John Doe (4)
const getNextAvailableName = (guests: Guest[], guest: Guest) => {
  const idx = getNextAvailableIndex(guests, guest);
  console.log({ idx });
  return idx > 1 ? `${guest.name} (${idx})` : guest.name;
};

function getNextAvailableIndex(guests: Guest[], guest: Guest) {
  // Create a regular expression that matches the guest name without the index in parenthesis
  const nameRegex = new RegExp(`^${guest.name.replace(' (\\d+)', '')}`);

  // Find all guests that match the regular expression
  const matchingGuests = guests.filter((g) => nameRegex.test(g.name));

  // Find the maximum index of all matching guests
  let maxIndex = 0;
  for (const g of matchingGuests) {
    const match = g.name.match(/\((\d+)\)$/);
    if (match) {
      const index = parseInt(match[1], 10);
      if (index > maxIndex) {
        maxIndex = index;
      }
    }
  }

  if (maxIndex === 0) {
    return 2;
  }

  // Return the next available index
  return maxIndex + 1;
}

const getUserWithIndexedName = (guests: Guest[], guest: Guest) => {
  const name = getNextAvailableName(guests, guest);
  return { ...guest, name };
};

const isNameTaken = (guests: Guest[], guest: Guest) => {
  return guests.some((g) => g.name === guest.name);
};

// function getNextAvailableIndex(guests: Guest[], guest: Guest) {
//   // Regular expression that matches the name and index in parenthesis
//   const nameRegex = /^([\w\s]+) \((\d+)\)$/;

//   // Get the name of the guest
//   const name = guest.name;

//   // Find the guests with the same name
//   const guestsWithSameName = guests.filter((g) => {
//       // Extract the name and index from the guest's name
//       const match = g.name.match(nameRegex);
//       if (match) {
//           // If the name in parenthesis is equal to the name of the guest, return true
//           return match[1] === name;
//       } else {
//           // If the name doesn't have parenthesis, compare the name directly
//           return g.name === name;
//       }
//   });

//   // Find the maximum index of the guests
//   let maxIndex = 0;
//   for (const g of guestsWithSameName) {
//       const match = g.name.match(nameRegex);
//       if (match) {
//           const index = parseInt(match[2], 10);
//           if (index > maxIndex) {
//               maxIndex = index;
//           }
//       }
//   }
// }
