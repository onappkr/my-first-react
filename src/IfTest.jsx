const AdminPanel = () => {
  return <p>관리자 페이지입니다.</p>;
};

const UserPanel = () => {
  return <p>일반 사용자 페이지입니다.</p>;
};

function IfTest({ isAdmin }) {
  let content = '';
  if (isAdmin) {
    content = <AdminPanel />;
  } else {
    content = <UserPanel />;
  }
  return content;
}

export default IfTest;
