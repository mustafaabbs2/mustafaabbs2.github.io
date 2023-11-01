import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
// react-scroll-parallax is a React library for creating scroll-based parallax effects. Parallax effects are animations that create the illusion of depth by making the background elements move more slowly than the foreground elements when the user scrolls the page.

import Navigation from './Navigation';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import OpenSource from './OpenSource';
import Contact from './Contact';

// Parallax background images
import black from '../images/backgrounds/black.png';
import educationBackground from '../images/backgrounds/studying.png';
import experienceBackground from '../images/backgrounds/experience.jpg';
import opensourceBackground from '../images/backgrounds/opensource.jpg';
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
            className="about-parallax"
            image={String(black)}
            strength={400}
          >
            <About />
          </Parallax>

          <Parallax
            amount={0.25}
            className="education-parallax"
            image={String(black)}
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
