import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-scroll';
import { Event } from '../Shared/Tracking';

import './styles.scss';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" dark expand="md" fixed="top">
      <Container>
        <Link
          to="intro"
          className="navbar-brand"
          activeClass="active"
          spy
          smooth
          duration={1000}
        >
          {/* <img src= "../images/backgrounds/black.png" className="mr-2" /> */}
          Mustafa Bhotvawala
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                to="about"
                activeClass="active"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event('Navigation', 'Clicked About Me link', 'About Me link')
                }
              >
                About Me
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="experience"
                activeClass="active"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event(
                    'Navigation',
                    'Clicked Experience link',
                    'Experience link',
                  )
                }
              >
                Experience
              </Link>
            </NavItem>
            <NavItem>
              <NavLink
                target="_blank"
                href="https://mustafabhotvawala.com/"
                onClick={() =>
                  Event('Navigation', 'Clicked Blog link', 'Blog link')
                }
              >
                Blog
              </NavLink>
            </NavItem>
            <NavItem>
              <Link
                to="contact"
                activeClass="active"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event('Navigation', 'Clicked Contact link', 'Contact link')
                }
              >
                Contact
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
