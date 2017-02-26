import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';

export default class Radio extends Component {

  static propTypes = {
    checked: PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.bool
    ]),
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    // will be rewrite by RadioGroup
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  }

  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    onChange() {},
  }

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange = (evt) => {
    const props = this.props;

    props.onChange({
      target: {
        ...props,
        type: 'radio',
        checked: evt.target.checked
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      }
    });
  }

  render() {
    const {
      checked,
      // onChange,
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,

      // value不要放到input上去
      value, // eslint-disable-line

      ...others
    } = this.props;

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-radio-wrap`]: true,
      [`${prefix}-radio-checked`]: !!checked,
      [`${prefix}-radio-disabled`]: (disabled || readOnly),
    });

    return (
      <label className={classString} style={style}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`}></span>
          <input
            {...others}
            type="radio"
            checked={!!checked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
