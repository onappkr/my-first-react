import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// 1. 취미 데이터를 Key-Value 형태로 정의
const HOBBY_OPTIONS = [
  { key: 'climbing', label: '등산' },
  { key: 'bowling', label: '볼링' },
  { key: 'jogging', label: '조깅' },
  { key: 'marathon', label: '마라톤' },
];

export const UseFormTest1 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      hobbies: [], // 체크된 key값들이 담길 배열
    },
  });

  const onSubmit = async (data) => {
    try {
      // 2. 서버로 보낼 데이터 준비 (JSON 방식 전송 예시)
      // data.hobbies에는 이미 ['climbing', 'bowling'] 처럼 key값만 들어있습니다.
      const payload = {
        memberName: data.memberName,
        memberId: data.memberId,
        email: data.email,
        gender: data.gender,
        hobbies: data.hobbies, // 선택된 Key 배열 전송
      };

      // 회원 저장 API 호출
      const saveResponse = await axios.post('/api/members', payload);

      if (saveResponse.status === 200 || saveResponse.status === 201) {
        // 성공 시 회원수 업데이트
        await axios.patch('/api/members/count/increment');
        alert('회원 등록이 완료되었습니다!');
        reset();
      }
    } catch (error) {
      console.error(error);
      alert('등록에 실패하였습니다. 다시 시도해 주세요.');
    }
  };

  const onInvalid = (errors) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      alert(errors[errorKeys[0]].message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>회원 등록</h2>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        {/* 회원명 */}
        <div>
          <label>회원명: </label>
          <input
            {...register('memberName', {
              required: '회원명은 필수입니다.',
              minLength: { value: 2, message: '회원명은 최소 2자 이상입니다.' },
              maxLength: { value: 8, message: '회원명은 최대 8자 이하입니다.' },
            })}
          />
        </div>

        {/* 회원번호 */}
        <div>
          <label>회원번호: </label>
          <input
            {...register('memberId', {
              required: '회원번호는 필수입니다.',
              maxLength: { value: 12, message: '회원번호는 최대 12자입니다.' },
            })}
          />
        </div>

        {/* 이메일 */}
        <div>
          <label>이메일: </label>
          <input
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
        </div>

        {/* 취미: Key-Value 구조 활용 */}
        <div style={{ marginTop: '10px' }}>
          <label>취미 (1개 이상): </label>
          {HOBBY_OPTIONS.map((item) => (
            <label key={item.key} style={{ marginRight: '8px' }}>
              <input
                type="checkbox"
                value={item.key} // 서버로 전송될 실제 값(Key)
                {...register('hobbies', {
                  validate: (v) =>
                    v.length > 0 || '취미를 최소 1개 이상 선택해주세요.',
                })}
              />
              {item.label} {/* 화면에 보여질 이름(Value) */}
            </label>
          ))}
        </div>

        {/* 성별 */}
        <div style={{ marginTop: '10px' }}>
          <label>성별: </label>
          <label>
            <input
              type="radio"
              value="M"
              {...register('gender', { required: '성별을 선택하세요.' })}
            />{' '}
            남
          </label>
          <label>
            <input type="radio" value="F" {...register('gender')} /> 여
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: '20px' }}
        >
          {isSubmitting ? '처리 중...' : '회원 등록'}
        </button>
      </form>
    </div>
  );
};
