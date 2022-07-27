type Word = {
  id: number;
  word: string;
  pos: 'adverb' | 'noun' | 'verb' | 'adjective';
};

interface Data {
  wordList: Word[];
  scoresList: number[];
}
