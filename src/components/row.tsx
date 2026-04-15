import styles from '@components/row.module.css';
import { LetterStatus } from '@models/letter';
import { LETTER_STATUS } from '@utils/constants';

interface RowProps {
  guess: string;
  word: string;
  isSubmitted: boolean;
}

export default function Row({
  guess,
  word,
  isSubmitted,
}: Readonly<RowProps>): React.JSX.Element {
  const letters = guess.padEnd(word.length, ' ').split('');

  return (
    <div className={styles.row}>
      {letters.map((char, index) => {
        let status: LetterStatus = LETTER_STATUS.NONE;
        const charLower = char.toLowerCase();

        if (isSubmitted && charLower !== ' ') {
          if (charLower === word.at(index)) {
            status = LETTER_STATUS.CORRECT;
          } else if (word.includes(charLower)) {
            status = LETTER_STATUS.PRESENT;
          } else {
            status = LETTER_STATUS.ABSENT;
          }
        }

        return (
          <div key={index} className={styles.tile} data-status={status}>
            {char.trim()}
          </div>
        );
      })}
    </div>
  );
}
