export const enum NavigationTargetType {
  Toc = 1,
  Chapter,
}

type NavigationTargetToC = {
  type: NavigationTargetType.Toc,
};

type NavigationTargetChapter = {
  type: NavigationTargetType.Chapter,
  chapterIndex: number,
}

export type NavigationTarget =
    | NavigationTargetToC
    | NavigationTargetChapter;