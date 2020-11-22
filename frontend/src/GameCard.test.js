import { shallow } from 'enzyme';
import React from 'react';
import GameCard from './UIComponents/GameCard';
import src from './assets/BBLogo.jpg';

describe('GameCard', () => {
  const gid = 1;
  const questions = [
    {
      id: 0,
      name: 'Question 0',
      time: 5,
    }, {
      id: 1,
      name: 'Question 1',
      time: 10,
    },
  ];
  const title = 'My Quiz';
  const imgSrc = src;

  const wrapper = shallow(<GameCard
    gId={gid}
    questions={questions}
    title={title}
    imgSrc={imgSrc}
    active={gid}
  />);

  it('checking for thumbnail alt text', () => {
    const img = wrapper.find('img');
    expect(img.props().alt).toEqual('card-thumbnail');
  });

  it('determine if the title of the card is the same as the name of the game', () => {
    const name = wrapper.find('#title');
    expect(name.text()).toEqual(title);
  });

  it('check that the number of questions is correct', () => {
    const length = wrapper.find('#length');
    expect(length.text()).toEqual(`Questions: ${questions.length}`);
  });

  it('check that the id is correct', () => {
    const id = wrapper.find('#id-info');
    expect(id.text()).toEqual(`Game id: ${gid}`);
  });

  it('check that the start game modal pops up once button is clicked', () => {
    const button = wrapper.find('#start-end');
    button.simulate('click');
    wrapper.find('#link-modal');
  });

  it('check that the start game button says "Start Game"', () => {
    const button = wrapper.find('#start-end');
    expect(button.text()).toEqual('Start Game');
  });
});
