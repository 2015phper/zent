import React from 'react';

import Button from 'zent-button';

import Pop from '../src';

import 'zent-popover/assets/index.scss';
import 'zent-button/assets/index.scss';
import 'zent-layout/assets/index.scss';
import '../assets/index.scss';
import '../assets/example.scss';

/* 为 pop 设置 position 字段可以影响组件的展示方式，我们使用pos-pos的组合，第一个代表 pop 框相对于目标元素的位置，第二个是他们的对齐标线的位置 */

const content = function () {
  return (
    <div style={{ width: 160 }}>
      <p>我在测试</p>
      <p>我在测试</p>
      <p>我在测试</p>
    </div>
  );
};

const Single = function (props) {
  return (
    <div
      className={`zent-col zent-col-3 ${props.className}`}
      style={{ textAlign: 'center', marginBottom: 10 }}
    >
      <Pop
        content={content()}
        trigger="hover"
        centerArrow={props.centerArrow}
        position={props.type}
      >
        <Button block>{props.type}</Button>
      </Pop>
    </div>
  );
};

class Demo extends React.Component {
  state = {
    centerArrow: false
  };

  onCenterArrowChange = (evt) => {
    const { target: { checked } } = evt;
    this.setState({
      centerArrow: checked
    });
  };

  render() {
    let arr = [
      { name: 'top-left', className: 'zent-col-offset-6' },
      { name: 'top-center', className: 'zent-col-offset-1' },
      { name: 'top-right', className: 'zent-col-offset-1' },
      {},
      { name: 'left-top', className: 'zent-col-offset-2' },
      { name: 'right-top', className: 'zent-col-offset-13' },
      {},
      { name: 'left-center', className: 'zent-col-offset-2' },
      { name: 'right-center', className: 'zent-col-offset-13' },
      {},
      { name: 'left-bottom', className: 'zent-col-offset-2' },
      { name: 'right-bottom', className: 'zent-col-offset-13' },
      {},
      { name: 'bottom-left', className: 'zent-col-offset-6' },
      { name: 'bottom-center', className: 'zent-col-offset-1' },
      { name: 'bottom-right', className: 'zent-col-offset-1' }
    ];
    const { centerArrow } = this.state;

    return (
      <div>
        <label><input type="checkbox" value={centerArrow} onChange={this.onCenterArrowChange} /> always align arrow to the center of trigger</label><br />

        <div className="row" style={{ marginTop: 20 }}>
          {arr.map((item, index) => {
            return item.name ?
              <Single key={index} type={item.name} centerArrow={centerArrow} className={item.className} /> :
              <hr key={index} className="zent-col-24" />;
          })}
        </div>
      </div>
    );
  }
}

export default Demo;
