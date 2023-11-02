import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Education from '.';

it('matches the snapshot', () => {
  const tree = renderer.create(<Education />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the Education component without crashing', () => {
  shallow(<Education />);
});

it('renders the main header', () => {
  const wrapper = shallow(<Education />);

  expect(wrapper.find('h2').html()).toEqual('<h2>Education</h2>');
});

it('renders details for the BSD program', () => {
  const wrapper = shallow(<Education />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(0)
      .html(),
  ).toEqual(
    '<div class="col-sm-4"><div class="row"><a href="https://bit.ly/seneca_bsd" target="seneca-bsd"><img src="seneca.png" alt="seneca"/></a></div><div class="row"><h3>Software Development</h3></div><div class="row"><p>Seneca College, Toronto ON</p></div></div>',
  );
});

it('renders details for the ECT program', () => {
  const wrapper = shallow(<Education />);

  expect(
    wrapper
      .find('Col>Row>Col')
      .at(1)
      .html(),
  ).toEqual(
    '<div class="col-sm-4"><div class="row"><a href="https://bit.ly/seneca_ect" target="seneca-ect"><img src="seneca.png" alt="seneca"/></a></div><div class="row"><h3>Computer Engineering</h3></div><div class="row"><p>Seneca College, Toronto ON</p></div></div>',
  );
});
