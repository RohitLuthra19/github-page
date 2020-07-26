import React from 'react';
import Main from './Main';
import '../../setupTests';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import { shallow } from 'enzyme';

describe('Main renders',() => {
  it('renders', () => {
    const wrapper = shallow(<Main store={store} />);
    expect(wrapper.exists()).toBe(true);
  })

  it('Main component created', () => {
    const rendered = renderer.create(
      <Main store={store} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })
})