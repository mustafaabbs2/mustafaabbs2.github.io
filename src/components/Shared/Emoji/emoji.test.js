import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Emoji from '.';

it('matches the snapshot', () => {
  const tree = renderer.create(<Emoji label="orangy" symbol="🦧" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the Emoji component without crashing', () => {
  shallow(<Emoji label="orangy" symbol="🦧" />);
});

it('sets the className', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.prop('className')).toEqual('emoji');
});

it('sets the role', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.prop('role')).toEqual('img');
});

it('sets the aria-label prop', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.prop('aria-label')).toEqual('orangy');
});

it('sets the aria-hidden prop when supplied a label', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.prop('aria-hidden')).toEqual('false');
});

it('sets the aria-hidden prop when supplied no label', () => {
  const wrapper = shallow(<Emoji symbol="🦧" />);

  expect(wrapper.prop('aria-hidden')).toEqual('true');
});

it('sets the emoji', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.prop('children')).toEqual('🦧');
});

it('renders the html correctly', () => {
  const wrapper = shallow(<Emoji label="orangy" symbol="🦧" />);

  expect(wrapper.html()).toEqual(
    '<span class="emoji" role="img" aria-label="orangy" aria-hidden="false">🦧</span>',
  );
});
