import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavDropdown,
  NavItem,
  MenuItem,
} from 'react-bootstrap';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to={'/brands'} className={'navbar-brand'}>
              PoS
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={location.pathname === '/providers' ? 'active' : ''}>
                <Link to="/providers">Proveedores</Link>
              </li>
              <NavDropdown title="Inventario" id="nav-inventory">
                <MenuItem
                  componentClass={Link}
                  href={'/products'}
                  to={'/products'}
                  active={location.pathname === '/products'}
                >
                  Productos
                </MenuItem>
                <MenuItem divider />
                <MenuItem
                  componentClass={Link}
                  href={'/brands'}
                  to={'/brands'}
                  active={location.pathname === '/brands'}
                >
                  Marcas
                </MenuItem>
                <MenuItem
                  componentClass={Link}
                  href={'/measurement_units'}
                  to={'/measurement_units'}
                  active={location.pathname === '/measurement_units'}
                >
                  Unidades de medida
                </MenuItem>
              </NavDropdown>
              <NavItem
                componentClass={ Link }
                href={'/purchases'}
                to={'/purchases'}
                active={location.pathname === '/purchases'}
              >Compras</NavItem>
              <NavItem>Ventas</NavItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
