import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { useLanguageContext } from "@/contexts/I18N";

import { ShipWheel } from "lucide-react";
import { useState } from "react";
import useSearch from "../hooks/useSearch";
import SearchCard from "./card";

const Search = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useLanguageContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { results = [], loading, error } = useSearch(searchTerm);

  if (error) return <div>Error: {error}</div>;

  return (
    <PopoverContent side="right" className="p-0 w-80">
      <div className="grid gap-4">
        <div className="w-full px-4 pt-4">
          <Input
            placeholder={t("search_placeholder")}
            className="w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        <div className="grid w-full -mt-2">
          {!!loading && (
            <div className="flex items-center justify-center px-4 text-center py-14 sm:px-14">
              <ShipWheel className="mr-2 h-9 w-9 animate-spin stroke-primary text-primary" />
            </div>
          )}
          {!loading &&
            !!results?.length &&
            results.map((game) => (
              <SearchCard {...game} key={game.id} setOpen={setOpen} />
            ))}
        </div>
      </div>
    </PopoverContent>
  );
};

export default Search;
