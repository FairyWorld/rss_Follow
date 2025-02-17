import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs"
import { useLocalSearchParams } from "expo-router"
import { useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { EntryListSelector } from "@/src/modules/entry-list/EntryListSelector"
import { EntryListContext, useSelectedView } from "@/src/modules/screen/atoms"
import { useCollectionEntryList } from "@/src/store/collection/hooks"
import { useEntryIdsByCategory, useEntryIdsByFeedId } from "@/src/store/entry/hooks"
import { FEED_COLLECTION_LIST } from "@/src/store/entry/utils"

export default function Feed() {
  const insets = useSafeAreaInsets()
  const { feedId: feedIdOrCategory } = useLocalSearchParams()
  const entryIdsByFeedId = useEntryIdsByFeedId(feedIdOrCategory as string)
  const entryIdsByCategory = useEntryIdsByCategory(feedIdOrCategory as string)
  const isCollection = feedIdOrCategory === FEED_COLLECTION_LIST
  const view = useSelectedView()
  const collectionEntryIds = useCollectionEntryList(view ?? 0)

  const entryIds = isCollection
    ? collectionEntryIds
    : entryIdsByFeedId.length > 0
      ? entryIdsByFeedId
      : entryIdsByCategory

  return (
    <EntryListContext.Provider value={useMemo(() => ({ type: "feed" }), [])}>
      <BottomTabBarHeightContext.Provider value={insets.bottom}>
        <EntryListSelector entryIds={entryIds} />
      </BottomTabBarHeightContext.Provider>
    </EntryListContext.Provider>
  )
}
