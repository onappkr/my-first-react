import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  NavLink,
} from 'react-router-dom';

const naveLinkStyle = ({ isActive }) => ({
  color: isActive ? 'red' : 'blue',
  textDecoration: isActive ? 'underline' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px',
});

// 홈 컴포넌트
const Home = () => <h2>홈 페이지</h2>;

// 소개 컴포넌트
const About = () => <h2>소개 페이지</h2>;

// 문의하기 컴포넌트
const Contact = () => <h2>문의하기 페이지</h2>;

// 상세 페이지 컴포넌트 (URL 파라미터 사용)
const UserDetail = () => {
  const { id } = useParams();
  return <h2>사용자 ID: {id} 상세 정보</h2>;
};

// 404 페이지
const NotFound = () => <h2>페이지를 찾을 수 없습니다.</h2>;

const RouterSample2 = () => {
  return (
    <Router>
      {/* 네비게이션 바 */}
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
          <li>
            <NavLink to="/" style={naveLinkStyle}>
              홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" style={naveLinkStyle}>
              소개
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" style={naveLinkStyle}>
              문의하기
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/1" style={naveLinkStyle}>
              사용자 1
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/2" style={naveLinkStyle}>
              사용자 2
            </NavLink>
          </li>
        </ul>
      </nav>

      <hr />

      {/* 라우트 정의 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterSample2;
