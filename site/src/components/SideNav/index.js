import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.pcss';

export default class SideNav extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      route: PropTypes.object
    }).isRequired
  };

  handleTitleClick = item => {
    if (item.groups[0].list[0].path) {
      this.context.router.history.push(
        this.props.base + item.groups[0].list[0].path
      );
    }
  };

  parseData = (item, index) => (
    <li className="nav-group-item" key={`nav-${index}`}>
      {item.path ? (
        <NavLink
          activeClassName="active"
          exact
          to={this.props.base + item.path}
          title={item.name}
        >
          {item.name}
        </NavLink>
      ) : (
        <a onClick={() => this.handleTitleClick(item)}>{item.name}</a>
      )}
      {item.groups && item.groups.map(this.parseGroup)}
    </li>
  );

  parseGroup = (group, index) => (
    <div className="nav-group" key={`nav-group-${index}`}>
      <div className="nav-group__title">{group.groupName}</div>
      <ul className="pure-menu-list">{group.list.map(this.parseList)}</ul>
    </div>
  );

  parseList = (navItem, index) => {
    const { title, subtitle } = navItem;
    const linkTitle = subtitle ? (
      <span>
        {title} <span className="nav-item__subtitle">{subtitle}</span>
      </span>
    ) : (
      title
    );

    return navItem.disabled ? null : (
      <li className="nav-item" key={`nav-list-${index}`}>
        <NavLink
          activeClassName="active"
          exact
          to={this.props.base + navItem.path}
        >
          {linkTitle}
        </NavLink>
      </li>
    );
  };

  render() {
    const { data } = this.props;

    return (
      <div className="side-nav">
        <ul>{data.map(this.parseData)}</ul>
      </div>
    );
  }
}
