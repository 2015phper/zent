import React, { Component, PropTypes } from 'react';
import omit from 'zent-utils/lodash/omit';

/**
  Not exported in index.js.

  Provides an HOC component for ESC to close functionality, useful in some cases.
**/
export default function withESCToClose(Closable) {
  return class ESCToCloseWrapper extends Component {
    static propTypes = {
      visible: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired
    };

    onKeyUp = evt => {
      if (evt.keyCode === 27) {
        this.props.onClose();
      }
    };

    on() {
      document.body.addEventListener('keyup', this.onKeyUp, true);
    }

    off() {
      document.body.removeEventListener('keyup', this.onKeyUp, true);
    }

    componentDidMount() {
      if (this.props.visible) {
        this.on();
      }
    }

    componentWillUnmount() {
      if (this.props.visible) {
        this.off();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.visible !== this.props.visible) {
        if (nextProps.visible) {
          this.on();
        } else {
          this.off();
        }
      }
    }

    render() {
      const props = omit(this.props, ['onClose']);
      return <Closable {...props} />;
    }
  };
}
