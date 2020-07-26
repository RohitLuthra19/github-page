import React from 'react';
import SideNav from './SideNav';
import '../../setupTests';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import { shallow } from 'enzyme';


describe('SideNav renders',() => {
  it('renders', () => {
    const wrapper = shallow(<SideNav store={store} />);
    expect(wrapper.exists()).toBe(true);
  })

  it('SideNav component created', () => {
    const rendered = renderer.create(
      <SideNav store={store} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })
})