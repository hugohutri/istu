import { Guest } from '../../../../hooks/useGuests';

type GuestItemProps = {
  guest: Guest;
};

export const GuestItem = (props: GuestItemProps) => {
  return <p>{props.guest.name}</p>;
};
