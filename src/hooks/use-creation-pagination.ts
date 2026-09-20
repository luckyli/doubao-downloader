import { useContext, useMemo } from "react";
import { ConvContext } from "@/context/ConvContext";
import { ConvFilterContext } from "@/context/ConvFilterContext";
import { filterConvsByMediaType } from "@/utils/media-filter";
import { filterDeletedConvs } from "@/utils/deleted-media";
import { useDeletedMediaKeys } from "@/hooks/use-deleted-media-keys";

export function useCreationPagination() {
  const convMessages = useContext(ConvContext);
  const convFilter = useContext(ConvFilterContext);
  const deletedKeys = useDeletedMediaKeys();
  
  return useMemo(() => {
    const convMessageList = convMessages.convMessage.filter(
      (item) => item.creation && ((item.conversation_id === convFilter.showConvId) || convFilter.showConvId === '-1'),
    );

    const convs = convMessageList
      .filter((item) => item.creation?.image.image_ori_raw.url)
      .filter((item) => {
        if (convFilter.startTime && item.create_time < convFilter.startTime) return false;
        if (convFilter.endTime && item.create_time > convFilter.endTime) return false;
        return true;
      });

    const visibleConvs = filterDeletedConvs(convs, deletedKeys);
    const filteredConvs = filterConvsByMediaType(visibleConvs, convFilter.mediaType);

    const totalItems = filteredConvs.length;
    const pageSize = convFilter.pageSize || 12;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      totalItems,
      totalPages,
      currentPage: convFilter?.currentPage || 1,
      pageSize,
    };
  }, [convMessages, convFilter, deletedKeys]);
}
