import { Button } from '../../../../components/uikit/Button';
import { useGetSeatsWithCoordinates } from '../../../../hooks/useSeatPlanner';

export const OptimizeButton = () => {
  const getSeatsWithLocation = useGetSeatsWithCoordinates();

  const onClick = () => {
    const seats = getSeatsWithLocation();
    console.table(seats);
  };

  return <Button onClick={onClick}>Optimize</Button>;
};
