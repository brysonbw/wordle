'use client';
import { useEffect, useState } from 'react';

import styles from '@components/dialog/word-definition-dialog.module.css';
import { WordDefinition } from '@models/word-definition';
import UILoadingIndicator from '@shared/ui/loading-indicator';

export interface WordDefinitionDialogContentProps {
  word: string;
}

export default function WordDefinitionDialogContent({
  word,
}: Readonly<WordDefinitionDialogContentProps>): React.JSX.Element {
  const [wordDefinition, setWordDefinition] =
    useState<Partial<WordDefinition> | null>({ meanings: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getWordDefinition(): Promise<void> {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_DICTIONARY_API}${word}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Failed to fetch data');

        const result: WordDefinition = await response.json();
        if (Array.isArray(result) && result.length >= 1) {
          setWordDefinition({ meanings: result[0].meanings });
        }
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setIsError(
          'No definition found for this word. Can you solve it without a hint?'
        );
        setIsLoading(false);
      }
    }

    getWordDefinition();
    return (): void => controller.abort();
  }, [word]);

  if (isLoading) {
    return <UILoadingIndicator />;
  }

  if (isError || !wordDefinition?.meanings?.length) {
    return (
      <div className={styles.error}>
        <strong>{isError}</strong>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {wordDefinition.meanings.map((meaning, index) => (
        <div key={index} className={styles.meaning}>
          {/** Part Of Speech */}
          {meaning.partOfSpeech && (
            <p className={styles['part-of-speech']}>{meaning.partOfSpeech}</p>
          )}

          {/** Definitions */}
          {meaning.definitions?.length ? (
            <ul className={styles['definition-list']}>
              {meaning.definitions.map(({ definition }, index) => (
                <li key={index} className={styles['definition-item']}>
                  {definition.replace(word, '[word]')}
                </li>
              ))}
            </ul>
          ) : null}

          {/** Synonyms */}
          {meaning.synonyms?.length ? (
            <div className={`${styles.meta} ${styles.synonyms}`}>
              <span className={styles.label}>Synonyms: </span>
              {meaning.synonyms.join(', ')}
            </div>
          ) : null}

          {/** Antonyms */}
          {meaning.antonyms?.length ? (
            <div className={`${styles.meta} ${styles.antonyms}`}>
              <span className={styles.label}>Antonyms: </span>
              {meaning.antonyms.join(', ')}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
