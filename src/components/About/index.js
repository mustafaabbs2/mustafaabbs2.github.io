import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { IconContext } from 'react-icons';
import ReactTooltip from 'react-tooltip';
import { FaGithub, FaReact } from 'react-icons/fa';
// import {TbBrandCpp} from 'react-icons/tb';
import { IoLogoJavascript } from 'react-icons/io';

import aboutImg from '../../images/about2.png';

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
            <Col sm={2}>
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
                  <p>
                    I enjoy writing code and you can often find me tinkering
                    with technology:
                  </p>
                </Row>
              </Row>
              <Row>
                <IconContext.Provider value={{ size: '5em' }}>
                  {/* <TbBrandCpp data-tip="GitHub" /> */}
                  <IoLogoJavascript data-tip="JavaScript" />
                  <FaReact data-tip="React" />
                  <FaGithub data-tip="GitHub" />
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
