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
      friendNames: [],
    },
    {
      name: 'Ville Martas',
      friendNames: [],
    },

    {
      name: 'Markus Perttola',
      friendNames: [],
    },
  ];
}
