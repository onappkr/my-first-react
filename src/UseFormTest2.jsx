import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';

const HOBBY_OPTIONS = [
  { key: 'climbing', label: '등산' },
  { key: 'bowling', label: '볼링' },
  { key: 'jogging', label: '조깅' },
  { key: 'marathon', label: '마라톤' },
];

export const UseFormTest2 = () => {
  const {
    register,
    handleSubmit,
    reset, // 폼에 데이터를 채워넣을 때 사용
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      memberName: '',
      memberId: '',
      email: '',
      gender: '',
      hobbies: [],
    },
  });

  // 1. 컴포넌트 마운트 시 API 호출하여 데이터 가져오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 실제 운영 환경에서는 특정 ID를 파라미터로 보냅니다 (예: /api/members/123)
        const response = await axios.get('/api/members/me');

        if (response.data) {
          // 서버에서 받은 데이터를 폼에 셋팅
          // response.data 구조가 { memberName, memberId, email, gender, hobbies: ['key1', 'key2'] } 형태여야 함
          reset(response.data);
        }
      } catch (error) {
        console.error('초기 데이터를 불러오는데 실패했습니다.', error);
        // 필요 시 alert('사용자 정보를 불러오지 못했습니다.');
      }
    };

    fetchMemberData();
  }, [reset]); // reset 함수가 변경될 때마다 실행 (보통 최초 1회)

  // 데이터 전송 핸들러 (저장/수정)
  const onSubmit = async (data) => {
    try {
      const payload = {
        memberName: data.memberName,
        memberId: data.memberId,
        email: data.email,
        gender: data.gender,
        hobbies: data.hobbies,
      };

      // 저장 API 호출 (기존 데이터가 있다면 PUT/PATCH, 새 데이터라면 POST)
      const saveResponse = await axios.post('/api/members', payload);

      if (saveResponse.status === 200 || saveResponse.status === 201) {
        await axios.patch('/api/members/count/increment');
        alert('성공적으로 저장되었습니다!');
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
      <h2>회원 정보 수정/등록</h2>
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

        {/* 취미 (다중 선택) */}
        <div style={{ marginTop: '10px' }}>
          <label>취미 (1개 이상): </label>
          {HOBBY_OPTIONS.map((item) => (
            <label key={item.key} style={{ marginRight: '8px' }}>
              <input
                type="checkbox"
                value={item.key}
                {...register('hobbies', {
                  validate: (v) =>
                    v.length > 0 || '취미를 최소 1개 이상 선택해주세요.',
                })}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* 성별 (단일 선택) */}
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
          {isSubmitting ? '처리 중...' : '정보 업데이트'}
        </button>
      </form>
    </div>
  );
};
