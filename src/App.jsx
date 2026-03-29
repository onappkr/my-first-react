import Box from './Box';
import EventTest from './EventTest';
import IfTest from './IfTest';
import MapTest from './MapTest';
import FormTest from './FormTest';
import FormDataTest from './FormDataTest';
import Modal from './Modal';
import Style1 from './Style1';
import CsButton from './CsButton';
// import Greeting from './Greeting';
import React, { Suspense, useState } from 'react';

// const LazyGreeting = React.lazy(() => import('./Greeting'));
const LazyGreeting = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./Greeting'));
      }, 5000); // 5초 후에 Greeting 컴포넌트를 로드
    }),
);

function App(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box>
        <h1>안녕하세요</h1>
        <p>This is some content inside the box.</p>
      </Box>
      <Box>
        <button>클릭</button>
      </Box>
      <Box>
        <EventTest></EventTest>
      </Box>
      <IfTest isAdmin={true}></IfTest>
      {!props.kind && <p>kind이 값이 없습니다.</p>}
      <MapTest></MapTest>
      <FormTest></FormTest>
      <FormDataTest></FormDataTest>

      <div>
        <div>
          <h1>React Portal Example</h1>
          <button onClick={() => setOpen(true)}>모달 열기</button>
        </div>
        {open && (
          <Modal>
            <h2>안녕하세요</h2>
            <button onClick={() => setOpen(false)}>닫기</button>
          </Modal>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {/* <Greeting /> */}
          <LazyGreeting />
        </Suspense>

        <Style1></Style1>

        <CsButton></CsButton>
      </div>
    </div>
  );
}

export default App;
