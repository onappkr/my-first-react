import React, { useState } from 'react';

function FormDataTest() {
  const [formData, setFormData] = useState({
    username: '', // input text
    description: '', // textarea
    gender: '', // radio
    agree: false, // checkbox
    hobbies: [], // 다중 선택을 위한 배열 초기화
    favoriteFlower: '', // 꽃
  });
  const hobbiesList = ['야구', '농구', '배구', '등산', '축구'];
  // 꽃 목록 선언
  const flowerList = [
    { key: 'rose', value: '장미' },
    { key: 'tulip', value: '튤립' },
    { key: 'violet', value: '제비꽃' },
    { key: 'sunflower', value: '해바라기' },
  ];

  const handleChange = (e) => {
    // 1. name과 value(혹은 checked) 추출
    const { name, value, type, checked } = e.target;

    // 2. 다중 선택 로직 (hobbies 또는 favoriteFlower인 경우)
    if (name === 'hobbies' || name === 'favoriteFlower') {
      const currentList = formData[name]; // name에 해당하는 현재 배열 가져오기
      if (checked) {
        // 체크 시 추가
        setFormData({ ...formData, [name]: [...currentList, value] });
      } else {
        // 체크 해제 시 제거
        setFormData({
          ...formData,
          [name]: currentList.filter((item) => item !== value),
        });
      }
      return;
    }

    // 3. checkbox일 경우 value 대신 checked 값을 사용하도록 분기
    const nextValue = type === 'checkbox' ? checked : value;

    // 4. 기존 객체를 복사하고 해당 name의 키만 업데이트
    // [name]은 객체의 키를 동적으로 설정하는 문법입니다. : 계산된 속성
    // 함수형 업데이트
    // React가 항상 최신 state를 보장
    // 여러 번 업데이트가 겹쳐도 안전
    // 비동기 batching 상황에서도 올바르게 작동
    setFormData((values) => ({ ...values, [name]: value }));

    // 일반 방식
    // 현재 렌더 시점의 값(고정된 값)
    // React의 state 업데이트는 비동기 + batching 따라서 여러 번 업데이트가 겹치면 마지막 업데이트만 반영될 수 있음
    // setFormData({...formData,[name]: nextValue,});
    // 단순 덮어쓰기는 사용 가능
    // setFormData({ name: "rose" })
  };

  return (
    <form>
      {/* 1. Text Input */}
      <div>
        <label>이름: </label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* 2. Textarea */}
      <div>
        <label>소개: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* --- 3. Select 요소 --- */}
      <div>
        <label>직업 선택: </label>
        <select name="job" value={formData.job} onChange={handleChange}>
          <option value="">-- 선택하세요 --</option>
          <option value="developer">개발자</option>
          <option value="designer">디자이너</option>
          <option value="manager">기획자</option>
        </select>
      </div>

      {/* 4. 취미 다중 선택 (Checkbox Group) --- */}
      <div>
        <strong>취미 (다중 선택): </strong>
        {hobbiesList.map((hobby) => (
          <label key={hobby} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              name="hobbies" // 모든 취미 체크박스는 같은 name을 공유합니다.
              value={hobby}
              checked={formData.hobbies.includes(hobby)} // 배열에 포함되어 있는지 확인
              onChange={handleChange}
            />
            {hobby}
          </label>
        ))}
      </div>

      {/* --- 5. 꽃 선택 추가 (key, value 활용) --- */}
      <div>
        <label>좋아하는 꽃: </label>
        {flowerList.map((flower) => (
          <label key={flower.key} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              name="favoriteFlower" // name을 favoriteFlower로 설정
              value={flower.key} // 저장될 값은 key(rose 등)
              checked={formData.favoriteFlower.includes(flower.key)}
              onChange={handleChange}
            />
            {flower.value} {/* 화면에는 value(장미 등) 표시 */}
          </label>
        ))}
      </div>

      {/* 6. Radio (여러 개 중 하나 선택) */}
      <div>
        <label>성별: </label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
        />{' '}
        남
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
        />{' '}
        여
      </div>

      {/* 7. Checkbox (불리언 값) */}
      <div>
        <label>약관 동의: </label>
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />
      </div>

      {/* 데이터 확인용 */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
}

export default FormDataTest;
