import styles from '@components/grid.module.css';
import Row from '@components/row';
import { WORDLE_GAME_MAX_GUESSES } from '@utils/constants';

interface GridProps {
  word: string;
  guesses: string[];
  currentGuess: string;
}

export default function Grid({
  word,
  guesses,
  currentGuess,
}: Readonly<GridProps>): React.JSX.Element {
  const wordLength = word.length;
  const totalRows = WORDLE_GAME_MAX_GUESSES;
  // Calculate how many empty rows to show after the current guess
  const emptyRowsCount = Math.max(0, totalRows - guesses.length - 1);

  return (
    <section className={styles.container}>
      <div
        className={styles.grid}
        style={{ '--word-length': wordLength } as React.CSSProperties}
      >
        {/* Past Guesses */}
        {guesses.map((guess, index) => (
          <Row
            key={`past-${index}`}
            guess={guess}
            word={word}
            isSubmitted={true}
          />
        ))}

        {/* Current Guess (Active Row) */}
        {guesses.length < totalRows && (
          <Row guess={currentGuess} word={word} isSubmitted={false} />
        )}

        {/* Future/Empty Rows */}
        {Array.from({ length: emptyRowsCount }).map((_, index) => (
          <Row
            key={`empty-${index}`}
            guess=""
            word={word}
            isSubmitted={false}
          />
        ))}
      </div>
    </section>
  );
}
