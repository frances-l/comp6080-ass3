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

  it('takes a snapshot of submit button', () => {
    const submit = wrapper.find('#submit');
    expect(submit).toMatchSnapshot();
  });

  it('simulate submit click', () => {
    const submit = wrapper.find('#submit');
    submit.simulate('click');
    const email = wrapper.find('#email');
    expect(email.props().error).toEqual(false);
  });

  it('redirect to login page button has aria-label', () => {
    const button = wrapper.find('#login');
    expect(button.props()['aria-label']).toEqual('login');
  });

  it('redirect to login page button text should be "If you already have an account click here to log in" ', () => {
    const button = wrapper.find('#login');
    expect(button.text()).toEqual('If you already have an account click here to log in');
  });

  it('takes snapshot of redirect button', () => {
    const button = wrapper.find('#login');
    expect(button).toMatchSnapshot();
  });
});
