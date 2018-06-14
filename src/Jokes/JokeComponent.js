import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon, Loader } from 'semantic-ui-react';

const JokeAccordion = ({ activeIndex, category, handleClick, index, joke }) => {
  const active = activeIndex === index;

  const title = active
    ? category
    : `Click here to see a joke from the ${category} category`;
  return (
    <Fragment>
      <Accordion.Title index={index} onClick={handleClick}>
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>
      <Accordion.Content active={active}>
        <div>
          <div>{joke.value ? joke.value : 'Fetching...'}</div>
          <Loader />
        </div>
      </Accordion.Content>
    </Fragment>
  );
};

JokeAccordion.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  joke: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default JokeAccordion;
