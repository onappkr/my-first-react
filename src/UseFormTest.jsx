import { useForm } from 'react-hook-form';
import axios from 'axios';

export const UseFormTest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      hobbies: [], // 다중 선택을 위한 초기값
    },
  });

  // 데이터 전송 핸들러
  const onSubmit = async (data) => {
    try {
      // 1. 파일 업로드를 위한 FormData 객체 생성
      const formData = new FormData();
      formData.append('memberName', data.memberName);
      formData.append('memberId', data.memberId);
      formData.append('email', data.email);
      formData.append('gender', data.gender);
      formData.append('hobbies', JSON.stringify(data.hobbies));

      if (data.photo[0]) {
        formData.append('photo', data.photo[0]);
      }

      // 2. 회원 저장 API 호출
      const saveResponse = await axios.post('/api/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (saveResponse.status === 200 || saveResponse.status === 201) {
        // 3. 저장 성공 시 회원수 업데이트 API 호출
        await axios.patch('/api/members/count/increment');

        alert('회원 등록 및 회원 수 업데이트가 완료되었습니다!');
        reset(); // 폼 초기화
      }
    } catch (error) {
      console.error(error);
      alert('등록에 실패하였습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>회원 등록</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 회원명: 2~8자, 필수 */}
        <div>
          <label>회원명: </label>
          <input
            {...register('memberName', {
              required: '회원명은 필수입니다.',
              minLength: { value: 2, message: '최소 2자 이상 입력하세요.' },
              maxLength: { value: 8, message: '최대 8자 이하로 입력하세요.' },
            })}
          />
          {errors.memberName && (
            <p style={{ color: 'red' }}>{errors.memberName.message}</p>
          )}
        </div>

        {/* 회원번호: 최대 12자, 필수 */}
        <div>
          <label>회원번호: </label>
          <input
            {...register('memberId', {
              required: '회원번호는 필수입니다.',
              maxLength: { value: 12, message: '최대 12자까지 가능합니다.' },
            })}
          />
          {errors.memberId && (
            <p style={{ color: 'red' }}>{errors.memberId.message}</p>
          )}
        </div>

        {/* 이메일: 형식 체크 */}
        <div>
          <label>이메일: </label>
          <input
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
        </div>

        {/* 사진: 필수 값 처리 */}
        <div>
          <label>사진: </label>
          <input
            type="file"
            accept="image/*"
            {...register('photo', {
              required: '사진을 선택해주세요.',
              validate: {
                // 1. 파일 존재 여부 체크
                hasFile: (value) =>
                  (value && value.length > 0) || '사진 파일이 필요합니다.',
                // 2. 파일 타입이 image/ 인지 체크
                isImage: (value) =>
                  value[0]?.type.startsWith('image/') ||
                  '이미지 파일만 업로드 가능합니다.',
              },
            })}
          />
          {errors.photo && (
            <p style={{ color: 'red', fontSize: '12px' }}>
              {errors.photo.message}
            </p>
          )}
        </div>

        {/* 취미: 다중 선택 (Checkbox) */}
        <div>
          <label>취미: </label>
          {['등산', '볼링', '조깅', '마라톤'].map((hobby) => (
            <label key={hobby}>
              <input type="checkbox" value={hobby} {...register('hobbies')} />
              {hobby}
            </label>
          ))}
        </div>

        {/* 성별: 단일 선택 (Radio) */}
        <div>
          <label>성별: </label>
          <label>
            <input
              type="radio"
              value="male"
              {...register('gender', { required: '성별을 선택하세요.' })}
            />{' '}
            남
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> 여
          </label>
          {errors.gender && (
            <p style={{ color: 'red' }}>{errors.gender.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: '10px' }}
        >
          {isSubmitting ? '저장 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};
