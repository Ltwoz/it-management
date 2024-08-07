import { Faq } from "../actions/get-faq";
import Item from "./item";

interface DataGridProps {
  faqs: Faq[] | null;
}

export default function DataGrid({ faqs }: DataGridProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {faqs?.map((faq) => (
        <Item key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
