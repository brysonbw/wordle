'use client';
import { useCallback, useEffect } from 'react';

import styles from '@components/keyboard.module.css';
import { LETTER_STATUS } from '@utils/constants';

interface KeyboardProps {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  word: string;
}

const ROWS = Object.freeze([
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
]);

const KEYBOARD_SPECIAL_KEY = Object.freeze({
  ENTER: 'ENTER',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DEL',
});

export default function Keyboard({
  onChar,
  onDelete,
  onEnter,
  guesses,
  word,
}: Readonly<KeyboardProps>): React.JSX.Element {
  // Memoize handler to prevent unnecessary effect re-runs
  const handleKey = useCallback(
    (key: string) => {
      const upperKey = key.toUpperCase();
      if (upperKey === KEYBOARD_SPECIAL_KEY.ENTER) {
        onEnter();
      } else if (
        upperKey === KEYBOARD_SPECIAL_KEY.BACKSPACE ||
        upperKey === KEYBOARD_SPECIAL_KEY.DELETE
      ) {
        onDelete();
      } else if (/^[A-Z]$/.test(upperKey)) {
        onChar(upperKey);
      }
    },
    [onEnter, onDelete, onChar]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      const { metaKey, ctrlKey, key } = event;

      if (metaKey || ctrlKey) {
        return;
      }

      if (key === 'Enter') {
        event.preventDefault();
      }

      handleKey(key);
    }

    window.addEventListener('keydown', onKeyDown);
    return (): void => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  function getKeyStatuses(): Map<string, string> {
    const statuses: Map<string, string> = new Map();

    for (const guess of guesses) {
      const letters = guess.split('');

      for (const [index, char] of letters.entries()) {
        const charLower = char.toLowerCase();

        if (!word.includes(charLower)) {
          statuses.set(charLower, LETTER_STATUS.ABSENT);
          continue;
        }
        if (charLower === word.at(index)) {
          statuses.set(charLower, LETTER_STATUS.CORRECT);
          continue;
        }
        if (statuses.get(charLower) !== LETTER_STATUS.CORRECT) {
          statuses.set(charLower, LETTER_STATUS.PRESENT);
        }
      }
    }
    return statuses;
  }

  const keyStatuses = getKeyStatuses();

  return (
    <div className={styles.keyboard}>
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              className={styles.key}
              data-status={
                keyStatuses.get(key.toLowerCase()) || LETTER_STATUS.NONE
              }
              data-special={
                key === KEYBOARD_SPECIAL_KEY.ENTER ||
                key === KEYBOARD_SPECIAL_KEY.DELETE
              }
              onClick={(event) => {
                handleKey(key);
                event.currentTarget.blur();
              }}
              type="button"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
