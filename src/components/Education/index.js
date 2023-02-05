import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Event } from '../Shared/Tracking';

import rwthImg from '../../images/thumbnails/companies/rwth.png';
import coepImg from '../../images/thumbnails/companies/coep.jpeg';

import './styles.scss';

const Education = () => {
  return (
    <Container className="education" fluid>
      <Col>
        <Row>
          <h2>Education</h2>
        </Row>
        <Col>
          <Row>
            <Col sm={4}>
              <Row>
                <a
                  href="https://bit.ly/seneca_bsd"
                  target="seneca-bsd"
                  onClick={() =>
                    Event(
                      'Education',
                      'Clicked Seneca BSD link',
                      'Seneca BSD link',
                    )
                  }
                >
                  <img
                    src={rwthImg}
                    alt="seneca"
                    style={{ width: '100px', height: '100px' }}
                  />
                </a>
              </Row>
              <Row>
                <h3>Computational Science</h3>
              </Row>
              <Row>
                <p>RWTH Aachen</p>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <a
                  href="https://bit.ly/seneca_ect"
                  target="seneca-ect"
                  onClick={() =>
                    Event(
                      'Education',
                      'Clicked Seneca ECT link',
                      'Seneca ECT link',
                    )
                  }
                >
                  <img
                    src={coepImg}
                    alt="coep"
                    style={{ width: '100px', height: '100px' }}
                  />
                </a>
              </Row>
              <Row>
                <h3>Mechanical Engineering</h3>
              </Row>
              <Row>
                <p>College of Engineering Pune</p>
              </Row>
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default Education;
