import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IntersectionTrigger extends Component {
  constructor(props) {
    super(props);

    this.loadMoreRef = React.createRef();
  }

  componentDidMount() {
    if (!this.loadMoreRef.current) {
      return;
    }

    const { handler } = this.props;

    this.observer = new IntersectionObserver(
      handler,
      {
        root: null,
        rootMargin: '0%',
        threshold: 1.0,
      }
    );

    this.observer.observe(this.loadMoreRef.current);
  }

  render() {
    return <div ref={this.loadMoreRef} />;
  }
}

IntersectionTrigger.propTypes = {
  handler: PropTypes.func.isRequired,
};
