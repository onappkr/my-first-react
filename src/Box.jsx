export default function Box(props) {
  const style1 = {
    border: '3px solid blue',
    padding: '10px',
    margin: '10px',
  };

  return <div style={style1}>{props.children}</div>;
}
