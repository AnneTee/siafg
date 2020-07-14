import React, { useContext, useState, useEffect } from 'react';
import reactStringReplace from 'react-string-replace';
import { AppDataContext } from '../context/appDataContext';
import ReactTooltip from 'react-tooltip';
import styled, { createGlobalStyle } from 'styled-components';

const ToolTipStyles = createGlobalStyle`
  .glossary-tooltip {
    max-width: 400px;
    font-size: 16px !important;
    line-height: 1.25;
    box-shadow: 0px 2px 12px 0px rgba(253, 229, 229, 0.1);

    &.show {
      opacity: 0.95 !important;
    }
  }
`;

const MatchSpan = styled.span`
  border-bottom: 1px dashed ${props => props.theme.colors.primaryPurple};
  padding-bottom 2px;
  position: relative;
  z-index: 10;
`;

const GlossaryTooltip = ({ textToReplace }) => {
  const { glossary, highlightedTerms } = useContext(AppDataContext);
  const [replacedText, setReplacedText] = useState('');

  const renderReplacementText = () => {
    return reactStringReplace(textToReplace, highlightedTerms, (match, i) => {
      if (i === 1) {
        return (
          <MatchSpan data-tip data-for={`${match}-tooltip`} key={match + i}>
            {match}
            <ReactTooltip
              id={`${match}-tooltip`}
              effect="solid"
              place="top"
              backgroundColor="#181818"
              textColor="#fff"
              multiline
              className="glossary-tooltip"
            >
              <span key={i}>
                {
                  glossary.filter(term => {
                    return term?.fields.terms_to_highlight?.includes(match);
                  })[0]?.fields.definition
                }
              </span>
            </ReactTooltip>
          </MatchSpan>
        );
      } else {
        return match;
      }
    });
  };

  useEffect(() => {
    if (highlightedTerms) {
      setReplacedText(renderReplacementText());
    }
  }, [highlightedTerms, textToReplace]);

  return (
    <>
      <ToolTipStyles />
      <div>{replacedText}</div>
    </>
  );
};

export default GlossaryTooltip;
