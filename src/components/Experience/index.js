import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Event } from '../Shared/Tracking';

import squareImg from '../../images/thumbnails/companies/square.png';
import twitterImg from '../../images/thumbnails/companies/twitter.png';
import tunnelbearImg from '../../images/thumbnails/companies/tunnelbear.png';
import pagerdutyImg from '../../images/thumbnails/companies/pagerduty.png';
import wattpadImg from '../../images/thumbnails/companies/wattpad.png';
import capitalOneImg from '../../images/thumbnails/companies/capital-one.png';
import bmoImg from '../../images/thumbnails/companies/bmo.png';
// import vincentAssociatesImg from '../../images/thumbnails/companies/vincent-associates.png';

import './styles.scss';

const Experience = () => {
  return (
    <Container className="experience" fluid>
      <Col>
        <Row>
          <h2>Experience</h2>
        </Row>
        <Col>
          <Row>
            <Col sm={3}>
              <Row>
                <a
                  href="https://squ.re/3DxM7U2"
                  target="square"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked Square company link',
                      'Square company link',
                    )
                  }
                >
                  <img src={squareImg} alt="square" />
                </a>
              </Row>
              <Row>
                <h3>R&D Software Engineer</h3>
              </Row>
              <Row>
                <h4>ANSYS</h4>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <Row>
                <a
                  href="https://bit.ly/twitter_home"
                  target="twitter"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked Twitter company link',
                      'Twitter company link',
                    )
                  }
                >
                  <img src={twitterImg} alt="twitter" />
                </a>
              </Row>
              <Row>
                <h3>R&D Software Engineer</h3>
              </Row>
              <Row>
                <h4>Volkswagen AG.</h4>
              </Row>
            </Col>
            <Col sm={3}>
              <Row>
                <a
                  href="https://bit.ly/tunnelbear_home"
                  target="tunnelbear"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked TunnelBear company link',
                      'TunnelBear company link',
                    )
                  }
                >
                  <img src={tunnelbearImg} alt="tunnelbear" />
                </a>
              </Row>
              <Row>
                <h3>Site Reliability Engineer</h3>
              </Row>
              <Row>
                <h4>TunnelBear</h4>
              </Row>
            </Col>
            <Col sm={3}>
              <Row>
                <a
                  href="https://bit.ly/pagerduty_home"
                  target="pagerduty"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked PagerDuty company link',
                      'PagerDuty company link',
                    )
                  }
                >
                  <img src={pagerdutyImg} alt="pagerduty" />
                </a>
              </Row>
              <Row>
                <h3>Software Engineer Intern</h3>
              </Row>
              <Row>
                <h4>PagerDuty</h4>
              </Row>
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default Experience;
