import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * Top-level navigation.
 * NavLink automatically applies the `active` global class when the route matches.
 * We target it with :global(.active) in the CSS module.
 */
function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/garage" className={styles.link}>
        Garage
      </NavLink>
      <NavLink to="/winners" className={styles.link}>
        Winners
      </NavLink>
    </nav>
  );
}

export default Navigation;
