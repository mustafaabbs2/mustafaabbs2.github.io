import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
// react-scroll-parallax is a React library for creating scroll-based parallax effects. Parallax effects are animations that create the illusion of depth by making the background elements move more slowly than the foreground elements when the user scrolls the page.

import Navigation from './Navigation';
import Intro from './Intro';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import OpenSource from './OpenSource';
import Hackathon from './Hackathon';
import Contact from './Contact';
import ParticleBackground from './ParticleBackground/ParticleBackground.js';

// Parallax background images
import introBackground from '../images/backgrounds/astronaut1.png';
import aboutBackground from '../images/backgrounds/black.png';
import educationBackground from '../images/backgrounds/studying.png';
import experienceBackground from '../images/backgrounds/experience.jpg';
import opensourceBackground from '../images/backgrounds/opensource.jpg';
import hackathonBackground from '../images/backgrounds/hackathon.jpg';
import contactBackground from '../images/backgrounds/contact.jpg';

import gradient1 from '../images/gradient1.png';
import gradient2 from '../images/gradient2.png';
import gradient3 from '../images/gradient3.png';
import gradient4 from '../images/gradient4.png';
import gradient5 from '../images/gradient5.png';
import gradient6 from '../images/gradient6.png';

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
            blur={{ min: -15, max: 15 }}
            className="intro"
            image={String(gradient6)}
          >
            <Intro />
          </Parallax>

          <Parallax
            amount={0.25}
            className="about-parallax"
            image={String(gradient6)}
            strength={400}
          >
            <About />
          </Parallax>

          <Parallax
            amount={0.25}
            className="education-parallax"
            image={String(gradient6)}
          >
            <Education />
          </Parallax>

          <Parallax
            amount={0.25}
            className="experience-parallax"
            image={String(gradient6)}
          >
            <Experience />
          </Parallax>

          <Parallax
            amount={0.25}
            className="open-source-parallax"
            image={String(gradient6)}
          >
            <OpenSource />
          </Parallax>

          {/* <Parallax
            amount={0.25}
            className="hackathon-parallax"
            image={String(hackathonBackground)}
          >
            <Hackathon />
          </Parallax> */}

          <Parallax
            amount={0.25}
            className="contact-parallax"
            image={String(gradient6)}
          >
            <Contact />
          </Parallax>
        </div>
      </ParallaxProvider>
    );
  }
}

export default App;
