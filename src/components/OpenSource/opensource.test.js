import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import OpenSource from '.';

it('matches the snapshot', () => {
  const tree = renderer.create(<OpenSource />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the OpenSource component without crashing', () => {
  shallow(<OpenSource />);
});

it('renders the main header', () => {
  const wrapper = shallow(<OpenSource />);

  expect(wrapper.find('h2').html()).toEqual('<h2>Open Source</h2>');
});

it('renders the subheader', () => {
  const wrapper = shallow(<OpenSource />);

  expect(wrapper.find('h3').html()).toEqual(
    '<h3>40+ contributions across projects including:</h3>',
  );

  expect(wrapper.find('p').html()).toEqual(
    '<p>Rust, Homebrew, Rails, Tensorflow, AMO, Activity Stream and more...</p>',
  );
});

it('renders an image for Firefox', () => {
  const wrapper = shallow(<OpenSource />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(1)
      .html(),
  ).toEqual(
    '<div class="col-sm-3"><a href="https://bit.ly/github_mozilla" target="github-mozilla"><img src="firefox.png" alt="firefox"/></a></div>',
  );
});

it('renders an image for Tensorflow', () => {
  const wrapper = shallow(<OpenSource />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(2)
      .html(),
  ).toEqual(
    '<div class="col-sm-3"><a href="https://bit.ly/github_google" target="github-tensorflow"><img src="tensorflow.png" alt="tensorflow"/></a></div>',
  );
});

it('renders an image for Rails', () => {
  const wrapper = shallow(<OpenSource />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(3)
      .html(),
  ).toEqual(
    '<div class="col-sm-3"><a href="https://bit.ly/github_rails" target="github-rails"><img src="rails.png" alt="rails"/></a></div>',
  );
});
