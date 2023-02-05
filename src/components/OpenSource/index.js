import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Event } from '../Shared/Tracking';

import firefoxImg from '../../images/thumbnails/open-source/firefox.png';
import tensorflowImg from '../../images/thumbnails/open-source/tensorflow.png';
import railsImg from '../../images/thumbnails/open-source/rails.png';

import './styles.scss';

const OpenSource = () => {
  return (
    <Container className="open-source" fluid>
      <Col>
        <Row>
          <h2>Open Source</h2>
        </Row>
        <Col>
          <Row>
            <Col>
              <h3>40+ contributions across projects including:</h3>
              <p>
                Rust, Homebrew, Rails, Tensorflow, AMO, Activity Stream and
                more...
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <a
                href="https://bit.ly/github_mozilla"
                target="github-mozilla"
                onClick={() =>
                  Event(
                    'Open Source',
                    "Clicked Mozilla PR's link",
                    "Mozilla PR's link",
                  )
                }
              >
                <img src={firefoxImg} alt="firefox" />
              </a>
            </Col>
            <Col sm={3}>
              <a
                href="https://bit.ly/github_google"
                target="github-tensorflow"
                onClick={() =>
                  Event(
                    'Open Source',
                    'Clicked Tensorflow PR link',
                    'Tensorflow PR link',
                  )
                }
              >
                <img src={tensorflowImg} alt="tensorflow" />
              </a>
            </Col>
            <Col sm={3}>
              <a
                href="https://bit.ly/github_rails"
                target="github-rails"
                onClick={() =>
                  Event('Open Source', 'Clicked Rails PR link', 'Rails PR link')
                }
              >
                <img src={railsImg} alt="rails" />
              </a>
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default OpenSource;
