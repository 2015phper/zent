import React, { PropTypes, Component } from 'react';
import Portal from 'zent-portal';

export default class NotifyContent extends Component {
  static propTypes = {
    text: PropTypes.any,
    status: PropTypes.string,
    visible: PropTypes.bool
  }

  static defaultProps = {
    text: '',
    visible: false,
    status: ''
  }

  render() {
    const { visible, text, status } = this.props;

    return (
      <Portal visible={visible} className="zent-image-p-anchor">
        <div className={`zent-notify zent-notify-${status}`}>{text}</div>
      </Portal>
    );
  }
}
