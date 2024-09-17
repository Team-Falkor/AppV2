import { InfoItadProps, InfoProps, infoHLTBProps } from "@/@types";
import ListsDropdown from "@/features/lists/components/listsDropdown";
import { IGDBReturnDataType } from "@/lib/api/igdb/types";
import { getSteamIdFromWebsites } from "@/lib/helpers";
import HLTBComponent from "../hltb";
import IGDBImage from "../IGDBImage";
import ProtonDbBadge from "../protonDbBadge";
import { Skeleton } from "../ui/skeleton";
import DownloadDialog from "./downloadDialog";
import QuickInfo from "./quickInfo";

type InfoTopProps = InfoProps &
  InfoItadProps & {
    data: IGDBReturnDataType | undefined;
    isReleased: boolean;
  };

type Props = InfoTopProps & infoHLTBProps;

const InfoTop = (props: Props) => {
  const {
    data,
    isReleased,
    isPending,
    error,
    itadData,
    itadError,
    itadPending,
    hltbData,
    hltbError,
    hltbPending,
  } = props;

  if (error) return null;

  const steam_id = getSteamIdFromWebsites(data?.websites ?? []);

  return (
    <div className="sm:-mt-28 sm:flex sm:items-start sm:space-x-5">
      <div className="relative flex">
        {!isPending ? (
          <div className="rounded-lg h-80 relative overflow-hidden">
            <IGDBImage
              imageId={data!.cover?.image_id ?? ""}
              alt={data!.name}
              className="object-cover h-80"
              imageSize={"cover_big"}
            />
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
              <div className="flex pt-5 justify-end items-start size-full">
                <div className="rounded-l-lg overflow-hidden">
                  {steam_id ? <ProtonDbBadge appId={steam_id} /> : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton className="rounded-lg w-[230px] h-80" />
        )}
      </div>

      <div className="w-full mt-16 sm:min-w-0 sm:flex-1 sm:items-center sm:justify-start sm:pb-1">
        <section className="flex items-end justify-between w-full gap-3">
          {!isPending ? (
            <h1 className="text-2xl font-bold truncate">{data!.name}</h1>
          ) : (
            <Skeleton className="w-56 h-10" />
          )}

          <div className="flex justify-end gap-4">
            {!isPending && data ? (
              <>
                <ListsDropdown {...data} />
                <DownloadDialog
                  title={data!.name}
                  isReleased={isReleased}
                  websites={data!.websites}
                  itadData={itadData}
                  itadError={itadError}
                  itadPending={itadPending}
                />
              </>
            ) : (
              <>
                <Skeleton className="w-32 h-10" />
                <Skeleton className="w-32 h-10" />
              </>
            )}
          </div>
        </section>

        <div className="mt-5 w-full h-full gap-3.5 justify-between flex flex-col">
          <QuickInfo
            data={data}
            error={error}
            isPending={isPending}
            isReleased={isReleased}
          />

          {!!hltbData && !hltbError && !hltbPending && (
            <div className="w-full">
              <HLTBComponent
                times={[
                  Math.floor(hltbData.comp_main / 60 / 60),
                  Math.floor(hltbData.comp_plus / 60 / 60),
                  Math.floor(hltbData.comp_100 / 60 / 60),
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTop;
