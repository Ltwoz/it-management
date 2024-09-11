import { Activity } from "../actions/get-activity";
import Item from "./item";

interface DataGridProps {
  activities: Activity[] | null;
}

export default function DataGrid({ activities }: DataGridProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {activities?.map((activity) => (
        <Item key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
