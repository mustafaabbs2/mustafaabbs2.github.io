import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { IconContext } from 'react-icons';
import ReactTooltip from 'react-tooltip';
import { FaGithub, FaReact, FaPython } from 'react-icons/fa';
// import { Tb12Hours } from "react-icons/tb";
import { IoLogoJavascript } from 'react-icons/io';

import aboutImg from '../../images/about2.png';
import iconImg from '../../images/logo_small.ico';

import './styles.scss';

const About = () => {
  return (
    <Container className="about" fluid>
      <ReactTooltip place="bottom" />
      <Col>
        <Row>
          <h2 style={{ textTransform: 'capitalize' }}>Hi! &#x1F44B; </h2>
          {/* h2 caps all letters by default, use text transform */}
        </Row>
        <Col>
          <Row>
            <Col sm={4}>
              <img src={aboutImg} alt="profile" />
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Row>
                <Row>
                  <p>Hi! I&apos;m Mustafa, a R&D Software Engineer at ANSYS!</p>
                </Row>

                <Row>
                  <p>
                    I have been working on numerical mathematics problems for a
                    good part of the last decade, where writing and shipping
                    software for Computational Fluid Dynamics (CFD) problems
                    occupying a major portion of my time.
                  </p>
                </Row>

                <Row>
                  <p style={{ marginTop: '50px' }}>
                    I can usually be found in a programming IDE or reading. When
                    I'm not tinkering with any new technology I can code with,
                    I'm usually reading about medicine and history. And I like
                    learning languages - currently on my 8th.
                  </p>
                </Row>
              </Row>
              <Row>
                <IconContext.Provider value={{ size: '5em' }}>
                  <FaPython data-tip="Python" />
                  <FaReact data-tip="React" />
                  <FaGithub data-tip="GitHub" />
                </IconContext.Provider>
              </Row>
              {/* <Row>
                <Row>
                  <p style={{ marginTop: '100px' }}>
                    You&apos;re probably here because I also write; I write about the intersection of computer science and numerical mathematics, you can find these articles on my blog here:
                  </p>
                </Row>

                <Row>
                  <p>
                      <a href="https://www.ansys.com/">
                      <img src={iconImg} 
                      alt="ico" />
                        </a>
                  </p>
                </Row>
              </Row> */}
            </Col>
          </Row>
        </Col>
      </Col>
    </Container>
  );
};

export default About;
