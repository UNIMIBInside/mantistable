import { cn } from "~/lib/utils";
import { HoverCard, HoverCardTrigger } from "~/app/components/ui/hover-card";
import AnnotationPreview from "~/app/components/tables/cells/annotatedTable/annotationPreview";
export type TableCellProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  annotation?: string;
  transform?: string;
};

const CustomTableCell = (tableCellProps: TableCellProps) => {
  const { text, annotation, transform, className, ...props } = tableCellProps;
  return (
    <div className={cn("flex flex-col ", className)} {...props}>
      <p className="text-base font-normal text-mantis-green-700">{text}</p>
      {annotation && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="text-mantis-green-400">
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${annotation}`}
              >
                {annotation}
              </a>
            </p>
          </HoverCardTrigger>
          <AnnotationPreview qid={annotation} className="w-80" />
        </HoverCard>
      )}
    </div>
  );
};

export default CustomTableCell;
