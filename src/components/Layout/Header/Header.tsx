import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.scss';
import { Icon } from '@/components';

interface MenuItem {
  path: string;
  label: string;
  hasDropdown?: boolean;
}

const Header = () => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { path: '/', label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/help', label: 'Help', hasDropdown: true },
  ];

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <div className={classes.logoIcon}>
            <Icon name="logo" size={78} />
          </div>
        </div>

        <nav className={classes.nav}>
          <ul className={classes.navList}>
            {menuItems.map((item) => (
              <li key={item.path} className={classes.navItem}>
                <Link
                  to={item.path}
                  className={`${classes.navLink} ${location.pathname === item.path ? classes.active : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <Icon name="chevron-down" size={16} className={classes.dropdownIcon} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={classes.actions}>
          <button className={classes.notificationBtn}>
            <Icon name="bell" size={20} />
            <span className={classes.notificationDot}>
              <Icon name="dot" size={8} />
            </span>
          </button>

          <div className={classes.userAvatar}>
            <div className={classes.avatarCircle}>
              <span>U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
