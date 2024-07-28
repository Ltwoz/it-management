import { type Level } from "../actions/get-levels";
import Item from "./item";

interface DataGridProps {
  levels: Level[] | null;
}

export default function DataGrid({ levels }: DataGridProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {levels?.map((level) => (
        <Item key={level.id} level={level} />
      ))}
    </div>
  );
}
