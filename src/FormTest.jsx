import { useState } from 'react';

function FormTest() {
  const [name, setName] = useState('홍길동');
  const [myText, setMyText] = useState();
  const [myFlower, setMyFlower] = useState('튤립');

  function handleChange(e) {
    setName(e.target.value);
  }
  function handleChange1(e) {
    setMyText(e.target.value);
  }
  function handleChange2(e) {
    setMyFlower(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert(`제출된 이름: ${name}`);
    alert(`제출된 내용: ${myText}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>이름:</label>
      <input type="text" value={name} onChange={handleChange} />
      <p>입력된 이름: {name}</p>
      <label>내용</label>
      <textarea value={myText} onChange={handleChange1}></textarea>
      <p>입력된 내용: {myText}</p>
      <select value={myFlower} onChange={handleChange2}>
        <option value="장미">장미</option>
        <option value="튤립">튤립</option>
        <option value="수선화">수선화</option>
      </select>
      <p>선택된 꽃 : {myFlower}</p>
      <button type="submit">제출</button>
    </form>
  );
}

export default FormTest;
