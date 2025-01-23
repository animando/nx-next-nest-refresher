import { Virtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo } from 'react';

export const useInfiniteScroll = <T>(
  virtualizer: Virtualizer<HTMLDivElement, Element>,
  allData: T[],
  loadMore: () => void,
  hasMore: boolean
) => {
  const virtualItems = virtualizer.getVirtualItems();
  const delta = useMemo(() => {
    if (!virtualItems.length) return null;
    return allData.length - virtualItems[virtualItems.length - 1].index - 1;
  }, [virtualItems, allData]);

  useEffect(() => {
    if (delta === null || !hasMore || delta > 5) {
      return;
    }
    loadMore();
  }, [delta, hasMore, loadMore]);
};
