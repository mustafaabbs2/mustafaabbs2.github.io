import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { IconContext } from 'react-icons';
import { Link } from 'react-scroll';
import ReactTooltip from 'react-tooltip';
import { FaAws, FaDocker, FaGithub, FaJava, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { DiMysql } from 'react-icons/di';
import { Event } from '../Shared/Tracking';

import aboutImg from '../../images/about2.png';

import './styles.scss';

const About = () => {
  return (
    <Container className="about" fluid>
      <ReactTooltip place="bottom" />
      <Col>
        <Row>
          <h2>About Me</h2>
        </Row>
        <Col>
          <Row>
            <Col sm={2}>
              <img src={aboutImg} alt="profile" />
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Row>
                <Row>
                  <p>
                    Hey! I&apos;m Mustafa, a R&D Software Engineer at ANSYS!
                  </p>
                </Row>
                <Row>
                  <p>
                    In my spare time, you can usually find me{' '}
                    <a
                      href="http://bit.ly/secret_sean"
                      target="instagram"
                      onClick={() =>
                        Event(
                          'About Me',
                          'Clicked Instagram link',
                          'Instagram link',
                        )
                      }
                    >
                      <strong>training</strong>
                    </a>
                    , helping in the{' '}
                    <a
                      href="http://bit.ly/github_prs"
                      target="github"
                      onClick={() =>
                        Event(
                          'About Me',
                          "Clicked GitHub PR's link",
                          "GitHub PR's link",
                        )
                      }
                    >
                      <strong>open source</strong>
                    </a>{' '}
                    community, and letting my imagination run wild at{' '}
                    <Link
                      to="hackathon"
                      activeClass="active"
                      spy
                      smooth
                      duration={1000}
                      onClick={() =>
                        Event(
                          'About Me',
                          'Clicked Hackathons link',
                          'Hackathons link',
                        )
                      }
                    >
                      <strong>hackathons</strong>
                    </Link>
                    .
                  </p>
                </Row>
                <Row>
                  <p>
                    I&apos;m always tinkering with new technologies but in the
                    past I&apos;ve worked with:
                  </p>
                </Row>
              </Row>
              <Row>
                <IconContext.Provider value={{ size: '5em' }}>
                  <FaJava data-tip="Java" />
                  <IoLogoJavascript data-tip="JavaScript" />
                  <FaReact data-tip="React" />
                  <FaGithub data-tip="GitHub" />
                  <FaAws data-tip="Amazon Web Services" />
                  <FaDocker data-tip="Docker" />
                  <DiMysql data-tip="MySQL" />
                </IconContext.Provider>
              </Row>
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default About;
