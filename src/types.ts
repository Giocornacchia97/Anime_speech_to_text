export type EpisodeStatus = "completed" | "processing";
export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface TranscriptLine {
  time: number;
  japanese: string;
  italian: string;
  grammar: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  series: string;
  level: JlptLevel;
  characters: string[];
  image: string;
  status: EpisodeStatus;
  progress: number;
  duration: number;
  updatedAt: string;
  accuracy: number;
  newKanji: number;
  vocabulary: number;
  transcript: TranscriptLine[];
}
