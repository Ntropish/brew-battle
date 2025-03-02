import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { MRT_Cell } from "material-react-table";
import { OrderRow } from "./OrderTable";

const DeliveryTimeCell = ({ cell }: { cell: MRT_Cell<OrderRow> }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000); // update every second

    return () => clearInterval(intervalId);
  }, []);

  const rawValue = cell.getValue() as string;
  const deliveryTime = new Date(rawValue);

  if (!deliveryTime || isNaN(deliveryTime.getTime())) {
    return "N/A";
  }

  if (deliveryTime.getTime() < now) {
    return "Delivered";
  }

  return formatDistanceToNowStrict(deliveryTime, { addSuffix: true });
};

export default DeliveryTimeCell;
