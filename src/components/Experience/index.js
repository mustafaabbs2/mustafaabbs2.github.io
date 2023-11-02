import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Event } from '../Shared/Tracking';

import ansysImg from '../../images/thumbnails/companies/ANSS.D.png';
import vwImg from '../../images/thumbnails/companies/VOW3.DE.D.png';
import rwthImg from '../../images/thumbnails/companies/rwth-black-logo.png';
import fordImg from '../../images/thumbnails/companies/ford.jpg';

import './styles.scss';

const Experience = () => {
  return (
    <Container className="experience" fluid>
      <Col>
        <Row>
          <h2>Experience and Education </h2>
        </Row>
        <Col>
          <Row>
            <Col sm={3}>
              <Row>
                <a
                  href="https://www.ansys.com/"
                  target="ansys"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked ansys company link',
                      'ansys company link',
                    )
                  }
                >
                  <img
                    src={ansysImg}
                    width="100" // Specify the desired width in pixels
                    height="100" // Specify the desired height in pixels
                    alt="ansys"
                  />
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
                  <img
                    src={vwImg}
                    width="100" // Specify the desired width in pixels
                    height="100" // Specify the desired height in pixels
                    alt="vw"
                  />
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
                  href="https://www.rwth-aachen.de/go/id/a/?lidx=1"
                  target="rwth"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked rwth link',
                      'rwth company link',
                    )
                  }
                >
                  <img
                    src={rwthImg}
                    width="230" // Specify the desired width in pixels
                    height="100" // Specify the desired height in pixels
                    alt="rwth"
                  />
                </a>
              </Row>
              <Row>
                <h3>MSc. Computational Science</h3>
              </Row>
              <Row>
                <h4>RWTH Aachen University</h4>
              </Row>
            </Col>
            <Col sm={3}>
              <Row>
                <a
                  href="https://bit.ly/pagerduty_home"
                  target="ford"
                  onClick={() =>
                    Event(
                      'Experience',
                      'Clicked ford company link',
                      'ford company link',
                    )
                  }
                >
                  <img
                    src={fordImg}
                    width="150" // Specify the desired width in pixels
                    height="120" // Specify the desired height in pixels
                    alt="ford"
                  />
                </a>
              </Row>
              <Row>
                <h3>Product Development Engineer</h3>
              </Row>
              <Row>
                <h4>Ford Motor Company</h4>
              </Row>
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default Experience;
