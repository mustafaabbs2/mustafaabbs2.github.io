import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import Navigation from './Navigation';
import Intro from './Intro';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import OpenSource from './OpenSource';
import Hackathon from './Hackathon';
import Contact from './Contact';

// Parallax background images
import introBackground from '../images/backgrounds/intro.jpg';
import aboutBackground from '../images/backgrounds/about.jpg';
import educationBackground from '../images/backgrounds/education.jpg';
import experienceBackground from '../images/backgrounds/experience.jpg';
import opensourceBackground from '../images/backgrounds/opensource.jpg';
import hackathonBackground from '../images/backgrounds/hackathon.jpg';
import contactBackground from '../images/backgrounds/contact.jpg';

// Shared components
import { Parallax, ParallaxCache } from './Shared/Parallax';
import { initGA, PageView } from './Shared/Tracking';

import './styles.scss';

class App extends React.Component {
  componentDidMount() {
    initGA('UA-203108441-1', { debug: false });
    PageView();
  }

  render() {
    return (
      <ParallaxProvider>
        <ParallaxCache />
        <div className="App">
          <Navigation />

          <Parallax
            amount={0.25}
            className="intro"
            image={String(introBackground)}
          >
            <Intro />
          </Parallax>

          <Parallax
            amount={0.25}
            className="about-parallax"
            image={String(aboutBackground)}
          >
            <About />
          </Parallax>

          <Parallax
            amount={0.25}
            className="education-parallax"
            image={String(educationBackground)}
          >
            <Education />
          </Parallax>

          <Parallax
            amount={0.25}
            className="experience-parallax"
            image={String(experienceBackground)}
          >
            <Experience />
          </Parallax>

          <Parallax
            amount={0.25}
            className="open-source-parallax"
            image={String(opensourceBackground)}
          >
            <OpenSource />
          </Parallax>

          <Parallax
            amount={0.25}
            className="hackathon-parallax"
            image={String(hackathonBackground)}
          >
            <Hackathon />
          </Parallax>

          <Parallax
            amount={0.25}
            className="contact-parallax"
            image={String(contactBackground)}
          >
            <Contact />
          </Parallax>
        </div>
      </ParallaxProvider>
    );
  }
}

export default App;
