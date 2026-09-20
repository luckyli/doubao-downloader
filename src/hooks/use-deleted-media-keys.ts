import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { db } from "@/db";

export function useDeletedMediaKeys() {
  const deletedMedia = useLiveQuery(() => db.deleted.toArray(), []);

  return useMemo(
    () => new Set(deletedMedia?.map((item) => item.key) ?? []),
    [deletedMedia],
  );
}
