export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Seat = {
  id: string;
  tableId: string;
  side: Side;
  companionSeatId?: string;
};

export type TableSize = {
  /**
   * Width in pixels, but it's cm in real life
   */
  width: number;
  /**
   * Height in pixels, but it's cm in real life
   */
  height: number;
};

export type Seats = {
  top: Seat[];
  right: Seat[];
  bottom: Seat[];
  left: Seat[];
};

export type Table = {
  /**
   * Unique name for the table
   */
  id: string;
  size: {
    width: number;
    height: number;
  };
  seats: Seats;
};

export type Guest = {
  name: string;
  avecName?: string;
  friendNames: string[];
  seat?: Seat;
};

export type TableSeatCount = {
  top: number;
  right: number;
  bottom: number;
  left: number;
} & Record<Side, number>;
