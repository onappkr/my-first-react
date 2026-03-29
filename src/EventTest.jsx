function EventTest() {
  const sayHi = (name, e) => {
    alert(`안녕하세요, ${name}!`);
    alert(`이벤트 타입: ${e.type}`);
  };

  return (
    <div>
      <button onClick={(event) => sayHi('John', event)}>인사</button>
      <button onDoubleClick={(event) => sayHi('John', event)}>인사</button>
    </div>
  );
}

export default EventTest;
