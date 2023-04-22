export const enum NavigationTargetType {
  ToC = 1,
  Chapter,
  Death
}

type NavigationTargetToC = {
  type: NavigationTargetType.ToC,
};

type NavigationTargetChapter = {
  type: NavigationTargetType.Chapter,
  chapterIndex: number,
};

type NavigationTargetDeath = {
  type: NavigationTargetType.Death,
};

export type NavigationTarget =
    | NavigationTargetToC
    | NavigationTargetChapter
    | NavigationTargetDeath;