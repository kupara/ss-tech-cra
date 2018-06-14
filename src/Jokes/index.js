import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

import { fetchCategories, fetchJoke } from '../store/modules/chuck';
import JokeDetails from './JokeComponent';

import logo from '../images/logo.png';

class JokesContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    joke: PropTypes.shape({
      value: PropTypes.string,
    }).isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchJoke: PropTypes.func.isRequired,
    loadingJoke: PropTypes.bool.isRequired,
  };

  state = {
    activeIndex: 0,
  };

  componentDidMount = async () => {
    const {
      fetchCategories: loadCategories,
      fetchJoke: _fetchJoke,
    } = this.props;
    await loadCategories();
    await _fetchJoke(this.props.categories[0]);
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const { categories, fetchJoke: _fetchJoke } = this.props;
    const newIndex = activeIndex === index ? -1 : index;
    if (newIndex > -1) _fetchJoke(categories[newIndex]);

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { categories, joke, loadingJoke } = this.props;

    const renderCategories = (category, index) => (
      <JokeDetails
        activeIndex={activeIndex}
        category={category}
        joke={joke}
        key={index}
        index={index}
        loadingJoke={loadingJoke}
        handleClick={this.handleClick}
      />
    );
    return (
      <div className="container">
        <img src={logo} alt="logo" className="image-header" />
        <h3 className="header">
          Click on a category below to load a random joke from it
        </h3>
        <Accordion styled>{categories.map(renderCategories)}</Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.chuck.categories,
  joke: state.chuck.joke,
  loadingJoke: state.chuck.loadingJoke,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchJoke: category => dispatch(fetchJoke(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokesContainer);
