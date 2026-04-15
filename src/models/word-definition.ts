export interface WordDefinition {
  meanings?: Meaning[];
}

export type Meaning = {
  partOfSpeech?: string;
  definitions?: {
    definition: string;
  }[];
  antonyms?: string[];
  synonyms?: string[];
};
