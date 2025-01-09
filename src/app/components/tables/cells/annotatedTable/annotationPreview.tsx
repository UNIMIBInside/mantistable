import Image from "next/image";
import wikidataLogo from "public/images/wikilogo.svg";
import { HoverCardContent } from "~/app/components/ui/hover-card";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
export type AnnotationPreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  qid: string;
};

const AnnotationPreview = (headerCellProps: AnnotationPreviewProps) => {
  const { qid, className, ...props } = headerCellProps;
  const getEntityInfo = api.tables.entity_info.useQuery(qid);

  if (getEntityInfo.isFetched) {
    const label = getEntityInfo.data?.label
    const description = getEntityInfo.data?.description
    return (
      <HoverCardContent
        className={cn("", className)}
        {...props}
      >
        <a className="flex flex-col gap-4 p-2" href={getEntityInfo.data?.url}>
        <div className="flex h-10 flex-row items-center gap-4">
          <Image
            alt="wikidata logo"
            priority
            className="h-12 w-14"
            src={wikidataLogo}
          />
          <span className="font-bold">{label} - {qid}</span>
        </div>
        <div className="flex flex-1 flex-col">
          <span>
            {description}
          </span>
        </div>
        </a>
      </HoverCardContent>
    );
  }

  return (
    <HoverCardContent
      className={cn("flex flex-col gap-4 p-4", className)}
      {...props}
    >
      <div className="flex h-10 flex-row items-center gap-4">
        <Image
          alt="wikidata logo"
          priority
          className="h-12 w-14"
          src={wikidataLogo}
        />
        <span className="font-bold">{qid}</span>
      </div>
      <div className="flex flex-1 flex-col">
      </div>
    </HoverCardContent>
  );
};

export default AnnotationPreview;
