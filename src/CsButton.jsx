import styles from './CsButton.module.css';

export default function CsButton() {
  return (
    <div>
      <button className={styles.btn}>Click me</button>
      <button className={`${styles.btn} ${styles.primary}`}>Click me</button>
      <button className={`${styles.btn} ${styles.secondary}`}>Click me</button>
      <button className={styles.com_primary}>Click me</button>
      <button className={styles.com_secondary}>Click me</button>
      <h1 className="myheader">타이틀</h1>
    </div>
  );
}
