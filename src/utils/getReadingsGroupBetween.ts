import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export function getReadingsGroupBetween(readingGroups:any) {
    const currentDate = dayjs();
  
    for (const readingGroup of readingGroups) {
      const visibleFrom = dayjs(readingGroup.visible_from);
      const visibleTo = dayjs(readingGroup.visible_to);
  
      if (currentDate.isBetween(visibleFrom, visibleTo)) {
        return readingGroup;
      }
    }
  
    return readingGroups[0];
  }