import { Button } from '../../../../components/uikit/Button';
import { useGuests } from '../../../../hooks/useGuests';
import { useGetSeatsWithCoordinates } from '../../../../hooks/useSeatPlanner';

export const OptimizeButton = () => {
  const getSeatsWithLocation = useGetSeatsWithCoordinates();
  const guests = useGuests((s) => s.guests);

  const onClick = () => {
    const seats = getSeatsWithLocation();
    console.log(JSON.stringify(seats));
    console.table(seats);
    console.log(JSON.stringify(guests));
    console.table(guests);
  };

  return (
    <Button variant="neutral" onClick={onClick}>
      Optimize
    </Button>
  );
};
