import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import SearchBar from './searchBar';
import Share from './share';
import CTA from './cta';
import GlossaryTooltip from './glossaryTooltip';
import { entryQuestion } from '../constants';
import triangle from '../assets/triangle--right.svg';
import { Animated } from 'react-animated-css';

const TitleArea = styled.div`
  width: 100vw;
  margin-left: -30px;
  margin-top: -40px;
  padding: 80px 0 50px 0;
  background: white;
  text-align: ${props => (props.isArchive ? 'left' : 'center')};
  line-height: 1.3;
  box-shadow: 0px 2px 10px rgba(89, 62, 191, 0.3);

  ${breakpoint('md')`
    margin-left: -60px;
    margin-top: -70px;
    text-align: left;
  `}

  ${breakpoint('lg')`
    width: calc(33vw - 84px);
    margin: 0;
    padding: 0;
    line-height: inherit;
    box-shadow: none;
  `}
`;

const TitleAreaContent = styled.div`
  padding: 0 30px;
  margin-top: 40px;
  max-width: 600px;
  max-height: 25vh;
  margin-left: ${props => (props.isTitle ? '0px' : '-15px')};

  ${breakpoint('md')`
    padding: 0 70px;
  `}

  ${breakpoint('lg')`
    padding: 0 0 0 84px;
    max-width: none;
    max-height: none;
    margin-left: 0;
    ${props =>
      props.isTitle &&
      `position: relative;
      &:after {
        content: url(${triangle});
        position: absolute;
        right: -55px;
        top: 5px;
      }
    `};
  `};
`;

const titleArea = props => {
  return (
    <Animated animationIn="fadeInDown" animationInDuration={800}>
      <TitleArea isArchive={props.topic === 'archive'}>
        <h1 className="sr-only">Quiz</h1>
        <TitleAreaContent as="h2" isTitle>
          {props.title}
        </TitleAreaContent>
        {props.topic === 'archive' ? (
          <SearchBar />
        ) : (
          <TitleAreaContent>
            <GlossaryTooltip textToReplace={props.description} />
            {props.topic === 'answer' && (
              <CTA
                to={{
                  state: {
                    activeId: entryQuestion,
                    position: 1,
                  },
                  pathname: '/quiz',
                }}
                display="inline-block"
                text="Retake Quiz"
                styletype="secondary"
              />
            )}
            {props.topic === 'answer' && <Share />}
          </TitleAreaContent>
        )}
      </TitleArea>
    </Animated>
  );
};

export default titleArea;
