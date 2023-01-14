import { Guest } from '../hooks/types';

const RANDOM_GUESTS: Guest[] = [
  {
    name: 'Wendy Gutkowski',
    avecName: 'Louise Langworth',
    friendNames: [],
  },
  {
    name: 'Louise Langworth',
    avecName: 'Wendy Gutkowski',
    friendNames: [
      'Dixie Okuneva',
      'Daniel Gutmann',
      'Violet Graham',
      'Ben Ondricka',
    ],
  },
  { name: 'Brenda Feil', friendNames: ['Wendy Gutkowski'] },
  {
    name: 'Oliver Murray',
    avecName: 'Javier Fritsch',
    friendNames: ['Daniel Gutmann', 'Wendy Gutkowski', 'Brenda Feil'],
  },
  {
    name: 'Javier Fritsch',
    avecName: 'Oliver Murray',
    friendNames: [
      "Hugh O'Conner",
      'Brenda Feil',
      'Frederick Grady',
      'Caleb Mertz',
    ],
  },
  { name: 'Ben Ondricka', friendNames: ['Louise Langworth'] },
  {
    name: 'Kelvin Beahan',
    avecName: 'Marsha Dooley',
    friendNames: [
      'Wendy Gutkowski',
      'Forrest Gleason',
      'Daniel Gutmann',
      'Frederick Grady',
      'Javier Fritsch',
    ],
  },
  {
    name: 'Marsha Dooley',
    avecName: 'Kelvin Beahan',
    friendNames: [
      'Brett Herzog',
      'Ashley Johnston',
      'Jackie Hauck',
      'Lynn Marvin',
    ],
  },
  { name: 'Ida Ullrich', friendNames: ['Oliver Murray'] },
  { name: 'Dianne Ernser', friendNames: ['Violet Graham', 'Louise Langworth'] },
  {
    name: 'Opal Koepp',
    avecName: 'Dixie Okuneva',
    friendNames: ['Ben Ondricka', 'Taylor Ortiz'],
  },
  {
    name: 'Dixie Okuneva',
    avecName: 'Opal Koepp',
    friendNames: ['Brett Herzog', 'Allen Bailey'],
  },
  { name: 'Violet Graham', friendNames: ['Josh Bednar'] },
  {
    name: 'Allen Bailey',
    avecName: 'Caleb Mertz',
    friendNames: ['Brenda Feil', 'Terrell Pouros'],
  },
  {
    name: 'Caleb Mertz',
    avecName: 'Allen Bailey',
    friendNames: ['Irving Lakin', 'Louise Langworth', 'Dixie Okuneva'],
  },
  { name: 'Lynn Marvin', friendNames: ['Woodrow Hoeger', 'Caleb Mertz'] },
  {
    name: 'Tomas Medhurst',
    avecName: 'Josh Bednar',
    friendNames: ['Ashley Johnston', 'Woodrow Hoeger'],
  },
  {
    name: 'Josh Bednar',
    avecName: 'Tomas Medhurst',
    friendNames: [
      'Irving Lakin',
      'Ben Ondricka',
      'Taylor Ortiz',
      'Brett Herzog',
    ],
  },
  {
    name: "Hugh O'Conner",
    avecName: 'Frederick Grady',
    friendNames: [],
  },
  {
    name: 'Frederick Grady',
    avecName: "Hugh O'Conner",
    friendNames: ['Josh Bednar', 'Ben Ondricka'],
  },
  {
    name: 'Terrell Pouros',
    avecName: 'Brett Herzog',
    friendNames: [
      'Violet Graham',
      'Allen Bailey',
      'Forrest Gleason',
      'Lynn Marvin',
    ],
  },
  {
    name: 'Brett Herzog',
    avecName: 'Terrell Pouros',
    friendNames: ['Woodrow Hoeger', 'Javier Fritsch'],
  },
  {
    name: 'Ashley Johnston',
    avecName: 'Forrest Gleason',
    friendNames: ['Woodrow Hoeger', 'Dixie Okuneva'],
  },
  { name: 'Forrest Gleason', avecName: 'Ashley Johnston', friendNames: [] },
  { name: 'Ricky Cummings', avecName: 'Woodrow Hoeger', friendNames: [] },
  { name: 'Woodrow Hoeger', avecName: 'Ricky Cummings', friendNames: [] },
  {
    name: 'Irving Lakin',
    avecName: 'Jackie Hauck',
    friendNames: ['Daniel Gutmann', 'Taylor Ortiz'],
  },
  {
    name: 'Jackie Hauck',
    avecName: 'Irving Lakin',
    friendNames: ['Marsha Dooley'],
  },
  { name: 'Daniel Gutmann', friendNames: [] },
  { name: 'Taylor Ortiz', friendNames: [] },
];

export const generateRandomGuests = (amount: number) => {
  return [...RANDOM_GUESTS].splice(0, amount);
};

// const randomInt = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const getNRandomFrom = <T>(array: T[], n: number) => {
//   const copy = [...array];
//   return copy.sort(() => 0.5 - Math.random()).slice(0, n);
// };
