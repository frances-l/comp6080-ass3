import { shallow } from 'enzyme';
import React from 'react';
import Register from './pages/Register';

describe('Register', () => {
  const wrapper = shallow(<Register />);

  it('register title is "Register"', () => {
    const title = wrapper.find('#title');
    expect(title.text()).toEqual('Register');
  });

  it('takes a snapshot of register title', () => {
    const title = wrapper.find('#title');
    expect(title).toMatchSnapshot();
  });

  it('name label is "Name*', () => {
    const name = wrapper.find('#name');
    expect(name.props().label).toEqual('Name*');
  });

  it('takes a snapshot of name', () => {
    const name = wrapper.find('#name');
    expect(name).toMatchSnapshot();
  });

  it('email label is "Email*', () => {
    const email = wrapper.find('#email');
    expect(email.props().label).toEqual('Email*');
  });

  it('takes a snapshot of email', () => {
    const email = wrapper.find('#email');
    expect(email).toMatchSnapshot();
  });

  it('password label is "Password*', () => {
    const password = wrapper.find('#password');
    expect(password.props().label).toEqual('Password*');
  });

  it('takes a snapshot of password', () => {
    const password = wrapper.find('#password');
    expect(password).toMatchSnapshot();
  });

  it('submit button has aria-label', () => {
    const submit = wrapper.find('#submit');
    expect(submit.props()['aria-label']).toEqual('register');
  });

  it('submit button text should be "Register"', () => {
    const submit = wrapper.find('#submit');
    expect(submit.text()).toEqual('Register');
  });
});
