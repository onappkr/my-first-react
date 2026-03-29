import styles from './style1.module.css';

function CssSample() {
  const style1 = {
    color: '#fff',
    backgroundColor: '#f00',
    padding: '5px',
  };

  return (
    <div>
      <h1 style={{ color: 'blue' }}>Inline Style</h1>
      <h1 style={style1}>객체 Styles</h1>
      <h1 className={styles.title}>Import Styles</h1>
    </div>
  );
}

export default CssSample;
