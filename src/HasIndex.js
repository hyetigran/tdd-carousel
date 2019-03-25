import React from 'react';

export default (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName})`;

    state = {
      index: 0,
    };

    handleDecrement = upperBound => {
      const newIndex = upperBound
        ? (index + upperBound - 1) % upperBound
        : index - 1;
      this.setState(({ index }) => ({
        index: newIndex,
      }));
    };

    handleIncrement = upperBound => {
      this.setState(({ index }) => ({
        index: upperBound ? (index + 1) % upperBound : index + 1,
      }));
    };

    render() {
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Decrement`]: this.handleDecrement,
        [`${indexPropName}Increment`]: this.handleIncrement,
      };
      return <Component {...this.props} {...indexProps} />;
    }
  };
