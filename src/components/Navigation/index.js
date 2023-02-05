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
    <Navbar color="dark" dark expand="md" fixed="top">
      <Container>
        <Link
          to="intro"
          className="navbar-brand"
          activeClass="active"
          spy
          smooth
          duration={1000}
          onClick={() =>
            Event(
              'Navigation',
              'Clicked Sean Prashad link',
              'Sean Prashad link',
            )
          }
        >
          Sean Prashad
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
                to="education"
                activeClass="active"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event(
                    'Navigation',
                    'Clicked Education link',
                    'Education link',
                  )
                }
              >
                Education
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
              <Link
                to="open-source"
                activeClass="active"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event(
                    'Navigation',
                    'Clicked Open Source link',
                    'Open Source link',
                  )
                }
              >
                Open Source
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="hackathon"
                spy
                smooth
                duration={1000}
                onClick={() =>
                  Event(
                    'Navigation',
                    'Clicked Hackathons link',
                    'Hackathons link',
                  )
                }
              >
                Hackathons
              </Link>
            </NavItem>
            <NavItem>
              <NavLink
                target="_blank"
                href="https://bit.ly/seanprashad_medium"
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
