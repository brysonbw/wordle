import styles from '@components/dialog/help-dialog.module.css';

export default function HelpDialogContent(): React.JSX.Element {
  return (
    <>
      <details open>
        <summary>
          <strong>How To Play</strong>
        </summary>

        <section>
          <p>Guess the Wordle in 6 tries.</p>

          <ul className={styles.list}>
            <li>Each guess must be a valid X-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
        </section>

        <br />
        <strong>Examples</strong>

        <div className={styles.examples}>
          <p className={styles['text-block']}>
            <strong>W</strong> is in the word and in the correct spot.
          </p>

          <div className={styles['tile-row']}>
            <span className={`${styles.tile} ${styles['tile-green']}`}>W</span>
            <span className={styles.tile}>O</span>
            <span className={styles.tile}>R</span>
            <span className={styles.tile}>D</span>
            <span className={styles.tile}>Y</span>
          </div>

          <p className={styles['text-block']}>
            <strong>I</strong> is in the word but in the wrong spot.
          </p>

          <div className={styles['tile-row']}>
            <span className={styles.tile}>L</span>
            <span className={`${styles.tile} ${styles['tile-yellow']}`}>I</span>
            <span className={styles.tile}>G</span>
            <span className={styles.tile}>H</span>
            <span className={styles.tile}>T</span>
          </div>

          <p className={styles['text-block']}>
            <strong>U</strong> is not in the word in any spot.
          </p>

          <div className={styles['tile-row']}>
            <span className={styles.tile}>R</span>
            <span className={styles.tile}>O</span>
            <span className={styles.tile}>G</span>
            <span className={`${styles.tile} ${styles['tile-gray']}`}>U</span>
            <span className={styles.tile}>E</span>
          </div>
        </div>
      </details>

      <br />

      <details open>
        <summary>
          <strong>Tips & Tricks</strong>
        </summary>

        <ul className={styles.list}>
          <li>Start with a word that contains common vowels.</li>
          <li>Avoid repeating letters in early guesses.</li>
          <li>Use previous guesses to eliminate letters.</li>
        </ul>
      </details>
    </>
  );
}
