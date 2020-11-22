import { shallow } from 'enzyme';
import React from 'react';
import NavBar from './UIComponents/NavBar';

describe('NavBar', () => {
  const wrapper = shallow(<NavBar />);

  it('check that the logo has alt tag', () => {
    const image = wrapper.find('img');
    expect(image.prop('alt')).toEqual('BB-logo');
  });

  it('check that the image matches the snapshot', () => {
    const image = wrapper.find('img');
    expect(image).toMatchSnapshot();
  });

  it('check that the create a quiz button has aria-label', () => {
    const button = wrapper.find('#create-quiz');
    expect(button.props()['aria-label']).toEqual('create a quiz');
  });

  it('check that the create a quiz button triggers modal', () => {
    const button = wrapper.find('#create-quiz');
    button.simulate('click');
    expect(button).toMatchSnapshot();
    const modal = wrapper.find('#new-game');
    expect(modal).toMatchSnapshot();
    expect(modal.props()['aria-labelledby']).toEqual('new-game');
  });

  it('check if the join game button text has aria-label', () => {
    const button = wrapper.find('#join');
    expect(button.props()['aria-label']).toEqual('join a game');
  });

  it('check if the join game button text is correct', () => {
    const button = wrapper.find('#join');
    expect(button.text()).toEqual('Join Game');
  });

  it('check if the join game button matches snapshot', () => {
    const button = wrapper.find('#join');
    expect(button).toMatchSnapshot();
  });

  it('check if the logout button text has an aria-label', () => {
    const button = wrapper.find('#logout');
    expect(button.props()['aria-label']).toEqual('logout');
  });

  it('check if the logout button text is correct', () => {
    const button = wrapper.find('#logout');
    expect(button.text()).toEqual('Logout');
  });

  it('check if the logout button matches the snapshot', () => {
    const button = wrapper.find('#logout');
    expect(button).toMatchSnapshot();
  });

  it('check the title of the nav bar is present', () => {
    const title = wrapper.find('#title');
    expect(title.text()).toEqual('BigBrain');
  });

  it('check the title matches the snapshot', () => {
    const title = wrapper.find('#title');
    expect(title).toMatchSnapshot();
  });
});
