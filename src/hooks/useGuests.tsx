export type Guest = {
  name: string;
  avecName?: string;
  friendNames: string[];
};

export function useGuests(): Guest[] {
  return [
    {
      name: 'Ville Virtanen',
      avecName: 'Hugo Lähteenmäki',
      friendNames: ['Heikki Kuula'],
    },
    {
      name: 'Ville Martas',
      friendNames: ['Otso Hutri', 'Atte Laulumaa'],
    },

    {
      name: 'Markus Perttola',
      friendNames: [],
    },
  ];
}
