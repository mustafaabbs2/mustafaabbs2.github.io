import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Hackathon from '.';

it('matches the snapshot', () => {
  const tree = renderer.create(<Hackathon />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the Hackathon component without crashing', () => {
  shallow(<Hackathon />);
});

it('renders the main header', () => {
  const wrapper = shallow(<Hackathon />);

  expect(wrapper.find('h2').html()).toEqual('<h2>Hackathons</h2>');
});

it('renders an image for Genesys', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(0)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4><span class="winna">4th Place</span> - Genesys Hackathon</h4><img src="genesys.png" alt="genesys"/></div>',
  );
});

it('renders an image for HackingGood', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(1)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4><span class="winna">2nd Place</span> - HackingGood</h4><img src="hacking-good.png" alt="hackingGood"/></div>',
  );
});

it('renders an image for TOHacks', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(2)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4>Mentor &amp; Judge - TOHacks</h4><img src="tohacks.png" alt="toHacks"/></div>',
  );
});

it('renders an image for RBC NGI', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(3)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4>RBC Next Great Innovator</h4><img src="rbc-ngi.png" alt="rbcNGI"/></div>',
  );
});

it('renders an image for OpenIDEO', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(4)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4>OpenIDEO</h4><img src="open-ideo.png" alt="openIDEO"/></div>',
  );
});

it('renders an image for GM HackAI', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(5)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4>GM HackAI</h4><img src="gm-hack-ai.png" alt="gmHackAI"/></div>',
  );
});

it('renders an image for OSCE Days', () => {
  const wrapper = shallow(<Hackathon />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(6)
      .html(),
  ).toEqual(
    '<div class="col-sm-2"><h4><span class="winna">3rd Place</span> - OSCE Days</h4><img src="osce-days.png" alt="osceDays"/></div>',
  );
});
