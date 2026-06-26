import { NavLink } from 'react-router-dom';

/**
 * Top-level navigation.
 * NavLink automatically adds the `active` class when the route matches,
 * which you can style in CSS.
 */
function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/garage" className="nav__link">
        Garage
      </NavLink>
      <NavLink to="/winners" className="nav__link">
        Winners
      </NavLink>
    </nav>
  );
}

export default Navigation;
