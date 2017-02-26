import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';

class Form extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    inline: PropTypes.bool,
    onSubmit: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.object
  }

  static defaultProps = {
    prefix: 'zent',
    onSubmit: noop,
  }

  render() {
    const { prefix, className, style, horizontal, inline, onSubmit } = this.props;
    const formClassName = classNames({
      [`${prefix}-form`]: true,
      [`${prefix}-form--horizontal`]: horizontal,
      [`${prefix}-form--inline`]: inline,
      [className]: !!className,
    });
    return (
      <form className={formClassName} style={style} onSubmit={onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;

