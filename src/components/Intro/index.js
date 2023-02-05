import React from 'react';
import { Container, Row, Col, NavLink } from 'reactstrap';
import { FaEnvelope, FaGithub, FaMedium } from 'react-icons/fa';

import Emoji from '../Shared/Emoji';
import { Event } from '../Shared/Tracking';

import './styles.scss';

const Intro = () => {
  return (
    <Container fluid>
      <Col>
        <Row>
          <h1>
            Welcome to <span className="brand">my</span> corner of the net
          </h1>
        </Row>

        <Row className="social">
          <Col sm={1}>
            <NavLink
              target="_blank"
              href="https://bit.ly/seanprashad_github"
              onClick={() =>
                Event('Intro', 'Clicked GitHub link', 'GitHub link')
              }
            >
              <FaGithub />
            </NavLink>
          </Col>
          <Col sm={1}>
            <NavLink
              target="_blank"
              href="https://bit.ly/seanprashad_medium"
              onClick={() =>
                Event('Intro', 'Clicked Medium link', 'Medium link')
              }
            >
              <FaMedium />
            </NavLink>
          </Col>
          <Col sm={1}>
            <NavLink
              target="_blank"
              href="mailto:[first][last][at]outlook.com"
              onClick={() => Event('Intro', 'Clicked Email link', 'Email link')}
            >
              <FaEnvelope />
            </NavLink>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Intro;
