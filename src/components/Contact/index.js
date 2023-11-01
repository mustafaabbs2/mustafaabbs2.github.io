import React from 'react';
import { Container, Row, Col, NavLink } from 'reactstrap';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Emoji from '../Shared/Emoji';
import { Event } from '../Shared/Tracking';

import './styles.scss';

const Contact = () => {
  const currYear = new Date().getFullYear();

  return (
    <Container className="contact" fluid>
      <Col>
        <Col>
          <Row className="social">
            <Col sm={1}>
              <NavLink
                target="_blank"
                href="https://github.com/mustafaabbs2"
                onClick={() =>
                  Event('Contact', 'Clicked GitHub link', 'GitHub link')
                }
              >
                <FaGithub />
              </NavLink>
            </Col>
            <Col sm={1}>
              <NavLink
                target="_blank"
                href="https://www.linkedin.com/in/mustafaabbs2/"
                onClick={() =>
                  Event('Contact', 'Clicked Linkedin link', 'Linkedin link')
                }
              >
                <FaLinkedin />
              </NavLink>
            </Col>
            <Col sm={1}>
              <NavLink
                target="_blank"
                href="mailto:mustafaabbs2@gmail.com"
                onClick={() =>
                  Event('Contact', 'Clicked Email link', 'Email link')
                }
              >
                <FaEnvelope />
              </NavLink>
            </Col>
          </Row>
        </Col>

        <footer>
          <Row>&copy; {currYear} Mustafa Bhotvawala</Row>
        </footer>
      </Col>
    </Container>
  );
};

export default Contact;
