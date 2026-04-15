'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoInformationCircle } from 'react-icons/io5';

import styles from '@app/page.module.css';
import WordDefinitionDialogContent from '@components/dialog/word-definition-dialog-content';
import Grid from '@components/grid';
import Keyboard from '@components/keyboard';
import { useDialog } from '@context/dialog-context';
import UIButton from '@shared/ui/button';
import UILoadingIndicator from '@shared/ui/loading-indicator';

export default function Home(): React.JSX.Element {
  const { showDialog } = useDialog();
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  function onChar(char: string): void {
    if (isGameOver) {
      return;
    }
    if (currentGuess.length < word.length) {
      setCurrentGuess((prev) => prev + char.toUpperCase());
    }
  }

  function onDelete(): void {
    if (isGameOver) {
      return;
    }
    setCurrentGuess((prev) => prev.slice(0, -1));
  }

  function onEnter(): void {
    if (isGameOver) {
      return;
    }

    // Check if the guess is long enough
    if (currentGuess.length !== word.length) {
      toast.error('Word too short');
      return;
    }

    // Add current guess to the list
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    // Check win/loss conditions - open dialogs
    if (currentGuess.toLowerCase() === word) {
      setIsGameOver(true);
      showDialog(
        'You Win!',
        <div>
          You guessed the word sucessfully: <strong>{word}</strong>
        </div>,
        {
          onClose: () => {
            window.location.reload();
          },
          closeButtonText: 'New game',
        }
      );
    } else if (newGuesses.length >= 6) {
      setIsGameOver(true);
      showDialog(
        'Game Over!',
        <div>
          The word was <strong>{word}</strong>
        </div>,
        {
          onClose: () => {
            window.location.reload();
          },
          closeButtonText: 'New game',
        }
      );
    }
  }

  function openWordHintDialog(): void {
    showDialog('Word Definition', <WordDefinitionDialogContent word={word} />);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function getRandomWord(): Promise<void> {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_RANDOM_WORD_BASE_URL}word`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();

        const data = Array.isArray(result) ? result[0] : result.word || result;
        setWord(data.toLowerCase());
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setIsError(true);
        setIsLoading(false);
      }
    }

    getRandomWord();
    return (): void => controller.abort();
  }, []);

  if (isError) {
    return (
      <main className={styles.page}>
        <div>Error loading game. Please try again later.</div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {isLoading ? (
        <UILoadingIndicator text="Loading game..." />
      ) : (
        <>
          <h1 className={styles.title}>{word.length} Letter Word</h1>
          <UIButton onClick={openWordHintDialog}>
            Word Definition <IoInformationCircle />
          </UIButton>
          <Grid word={word} guesses={guesses} currentGuess={currentGuess} />
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            word={word}
          />
        </>
      )}
    </main>
  );
}
