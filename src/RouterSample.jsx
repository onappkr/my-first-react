import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Outlet,
} from 'react-router-dom';

// 홈 컴포넌트
const Home = () => <h2>홈 페이지</h2>;

// 소개 컴포넌트
const About = () => (
  <div>
    <h2>소개 페이지</h2>
    <nav>
      <Link to="/about/ceo">CEO 소개</Link> |{' '}
      <Link to="/about/team">팀 소개</Link>
    </nav>
    <Outlet />
  </div>
);

// 문의하기 컴포넌트
const Contact = () => <h2>문의하기 페이지</h2>;

// 상세 페이지 컴포넌트 (URL 파라미터 사용)
const UserDetail = () => {
  const { id } = useParams();
  return <h2>사용자 ID: {id} 상세 정보</h2>;
};

// 404 페이지
const NotFound = () => <h2>페이지를 찾을 수 없습니다.</h2>;

const RouterSample = () => {
  return (
    <Router>
      {/* 네비게이션 바 */}
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/contact">문의하기</Link>
          </li>
          <li>
            <Link to="/user/1">사용자 1</Link>
          </li>
          <li>
            <Link to="/user/2">사용자 2</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* 라우트 정의 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="ceo" element={<h3>About / CEO 소개</h3>} />
          <Route path="team" element={<h3>About / 팀 소개</h3>} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <NavigationButtons />
    </Router>
  );
};

// useNavigate 훅 사용 예시를 위한 별도 컴포넌트
const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default RouterSample;
