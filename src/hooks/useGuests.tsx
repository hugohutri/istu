import { Guest } from './types';

export function useGuests(): Guest[] {
  return [
    {
      name: 'Ville Virtanen',
      avecName: 'Hugo Lähteenmäki',
      friendNames: ['Heikki Kuula'],
    },
    {
      name: 'Ville Maltas',
      friendNames: ['Otso Hutri', 'Atte Laulumaa'],
    },

    {
      name: 'Markus Perttola',
      friendNames: [],
    },
  ];
}
