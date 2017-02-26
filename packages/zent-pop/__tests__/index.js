import React from 'react';
import { mount } from 'enzyme';

import Pop from '../src';
import Button from 'zent-button';

const content = () => {
  return (
    <div className="zent-pop-content">
      <a>我在测试</a>
      <div>
        <input />
      </div>
    </div>
  );
};

const header = () => (
  <div className="zent-pop-header">
    <span />
  </div>
);

const addClick = jest.fn();

describe('Pop', () => {
  it('Regular Pop has 3 kind of trigger', () => {
    ['click', 'hover', 'focus'].map(trigger => {
      const wrapper = mount(
        <Pop content={content()} trigger={trigger} position="bottom-center">
          {trigger !== 'focus' ?
            <Button onClick={addClick}>
              {trigger}
            </Button> :
            <input placeholder="focus" onChange={() => true} />
          }
        </Pop>
      );
      expect(wrapper.find('Portal').length).toBe(0);
      expect(wrapper.find('Popover').prop('display')).toBe('inline-block');
      return null;
    });
  });

  it('Position prop of Pop have type-check and default with TopCenter', () => {
    expect(() => {
      mount(
        <Pop content={content()} trigger={'click'}>
          <Button onClick={addClick}>
            click
          </Button>
        </Pop>
      );
    }).not.toThrow();

    // HACK: React.Prototypes.oneOf() console.error
    // expect(() => {
    //   mount(
    //     <Pop content={content()} trigger={'click'} position="1-2">
    //       <Button onClick={addClick}>
    //         click
    //       </Button>
    //     </Pop>
    //   );
    // }).not.toThrow();
  });

  it('Pop can have custom prefix, className, and block switch, meanwhile content and header pass through prop', () => {
    const wrapper = mount(
      <Pop content={content()} trigger={'click'} prefix="foo" className="quux" wrapperClassName="bar" block header={header()}>
        <Button onClick={addClick}>
          click
        </Button>
      </Pop>
    );
    expect(wrapper.find('Popover div').hasClass('foo-pop-wrapper')).toBe(true);
    expect(wrapper.find('Popover div').hasClass('bar')).toBe(true);
    expect(wrapper.find('Popover').prop('display')).toBe('block');

    wrapper.find('button').simulate('click');
    expect(document.querySelector('.foo-pop.quux')).toBeTruthy();
    // wrapper.unmount();
  });

  it('Pop has its core function, powered by zent-popover, the content of popover has onConfirm and onCancel switches', () => {
    // with both onConfirm and onCancel undefined, content will be rendered as null
    let wrapper = mount(
      <Pop content={content()} trigger={'click'} className="bar11" block header={header()}>
        <Button>
          click
        </Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.bar11').length).toBe(1);
    const confirmMock = jest.fn();
    const cancelMock = jest.fn();
    wrapper = mount(
      <Pop trigger={'click'} block header={header()} onConfirm={confirmMock} onCancel={cancelMock}>
        <Button>
          click
        </Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    let btn = document.querySelectorAll('button');
    expect(btn.length).toBe(2);
    expect(btn[0].textContent).toBe('确定');
    expect(btn[1].textContent).toBe('取消');
    btn[0].click();
    expect(wrapper.find('Portal').length).toBe(0);
    expect(confirmMock.mock.calls.length).toBe(1);

    wrapper.find('button').simulate('click');
    expect(wrapper.find('Portal').length).toBe(1);
    btn[1].click();
    expect(wrapper.find('Portal').length).toBe(0);
    expect(cancelMock.mock.calls.length).toBe(1);
  });

  it('Pop with NoneTrigger', () => {
    let visible = false;
    /* eslint-disable */
    const close = () => {
      wrapper.setProps({ visible: false });
    };
    const open = () => {
      wrapper.setProps({ visible: true });
    };
    /* eslint-enable */
    let wrapper = mount(
      <Pop content={<Button className="zent-pop-inner-button" onClick={close}>内部关闭</Button>} trigger="none" header="trigger is none" visible={visible}>
        <Button onClick={open}>打开(none)</Button>
      </Pop>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('Portal').length).toBe(1);
    expect(document.querySelectorAll('.zent-pop-inner-button').length).toBe(1);
    document.querySelectorAll('.zent-pop-inner-button')[0].click();
    expect(wrapper.find('Portal').length).toBe(0);

    // HACK: initial with truthy visible;
    visible = true;
    wrapper = mount(
      <Pop content={<Button className="zent-pop-inner-button" onClick={close}>内部关闭</Button>} trigger="none" header="trigger is none" visible={visible}>
        <Button onClick={open}>打开(none)</Button>
      </Pop>
    );
  });

  it('always center arrow at center', () => {
    const test = (position) => {
      const wrapper = mount(
        <Pop content={content()} position={position} trigger={'click'} centerArrow>
          <Button>
            click
          </Button>
        </Pop>
      );
      wrapper.find('button').simulate('click');
      jest.runAllTimers();
      expect(document.querySelectorAll('.zent-pop-content').length).toBe(1);
      expect(document.querySelector(`.zent-popover-position-${position}`)).toBeTruthy();
      wrapper.unmount();
    };

    [
      'top-left', 'top-center', 'top-right',
      'right-top', 'right-center', 'right-bottom',
      'bottom-left', 'bottom-center', 'bottom-right',
      'left-top', 'left-center', 'left-bottom'
    ].forEach(test);
  });

  it('onConfirm/onCancel can be async(callback)', () => {
    let b = 1;
    const onCancel = function(close) {
      setTimeout(() => {
        expect(b).toBe(1);
        b++;
        close();
      }, 100);
    };

    let visible = false;
    const wrapper = mount(
      <Pop visible={visible} onVisibleChange={(v) => {visible = v}} content={content()} onCancel={onCancel}>
        <a>
          click
        </a>
      </Pop>
    );

    wrapper.setProps({
      visible: true
    });
    jest.runAllTimers();

    document.querySelector('.zent-btn-primary').nextSibling.click();
    jest.runAllTimers();
    expect(b).toBe(2);
  });

  it('onConfirm/onCancel can be async(Promise)', () => {
    const onConfirm = jest.fn();
    let a = 1;
    onConfirm.mockReturnValueOnce(new Promise(resolve => {
      setTimeout(() => {
        expect(a).toBe(1);
        a++;
        resolve();
      }, 100);
    }));

    let visible = false;
    const wrapper = mount(
      <Pop visible={visible} onVisibleChange={(v) => {visible = v}} content={content()} onConfirm={onConfirm}>
        <a>
          click
        </a>
      </Pop>
    );

    wrapper.setProps({
      visible: true
    });
    jest.runAllTimers();

    document.querySelector('.zent-btn-primary').click();
    jest.runAllTimers();
    expect(a).toBe(2);
  });
});
