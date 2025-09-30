import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/help', label: 'Help' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4f46e5" strokeWidth="2" fill="none" />
              <path d="M2 17L12 22L22 17" stroke="#4f46e5" strokeWidth="2" fill="none" />
              <path d="M2 12L12 17L22 12" stroke="#4f46e5" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <span className="logo-text">Logo</span>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C6.686 2 4 4.686 4 8V13L2 15V16H18V15L16 13V8C16 4.686 13.314 2 10 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 16V17C8 18.105 8.895 19 10 19C11.105 19 12 18.105 12 17V16"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <span className="notification-dot"></span>
          </button>

          <div className="user-avatar">
            <div className="avatar-circle">
              <span>U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
