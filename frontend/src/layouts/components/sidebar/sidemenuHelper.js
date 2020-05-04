// import external modules
import React, { PureComponent, Children, cloneElement, Fragment } from 'react';
import { Badge } from 'reactstrap';
// import internal(own) modules
import '../../../assets/scss/components/sidebar/sidemenuHelper.scss';

class SideMenuHelper extends PureComponent {
  state = {
    selectedMenuItem: -1,
  };

  // Toggle menu with dropdown
  toggle = itemIndex => {
    // If menu is open
    if (this.state.selectedMenuItem === itemIndex) {
      this.setState({
        selectedMenuItem: -1,
      });
    } else {
      // If menu is close
      this.setState({ selectedMenuItem: itemIndex });
    }
  };

  // Close other dropdown on single menu item click
  closeOther = singleItemIndex => {
    this.setState(prevState => {
      return {
        selectedMenuItem: singleItemIndex,
      };
    });
  };

  handleClick = e => {
    this.props.toggleSidebarMenu('close');
  };

  static MenuSingleItem = props => (
    <li
      className="nav-item"
      onClick={() => {
        props.closeOther(props.index);
        props.handleClick();
      }}
    >
      {props.children}
      {props.badgeText ? (
        <Badge
          className="menu-item-badge menu-single-item-badge"
          color={props.badgeColor}
          pill
        >
          {props.badgeText}
        </Badge>
      ) : (
        ''
      )}
    </li>
  );

  static MenuMultiItems = props => (
    <Fragment>
      <li
        className={`has-sub nav-item  ${
          props.selected === true && props.collapsedSidebar === false
            ? `open`
            : ''
        }`}
      >
        {/* eslint-disable-next-line */}
        <a
          onClick={() => {
            props.toggle(props.index);
          }}
        >
          <i className="menu-icon">{props.Icon ? props.Icon : null}</i>
          <span className="menu-item-text d-inline"> {props.name}</span>
          {props.badgeText ? (
            <Badge
              className="menu-item-badge menu-multiple-item-badge"
              color={props.badgeColor}
              pill
            >
              {props.badgeText}
            </Badge>
          ) : (
            ''
          )}

          <span className="item-arrow">{props.ArrowRight}</span>
        </a>

        <ul>
          {Children.map(props.children, (child, index) => {
            if (child.props.children.type === undefined) {
              return <li>{child}</li>;
            } else {
              return (
                <li
                  onClick={() => {
                    props.handleClick();
                  }}
                >
                  {child}
                </li>
              );
            }
          })}
        </ul>
      </li>
    </Fragment>
  );

  render() {
    const Nodes = Children.map(this.props.children, (child, index) => {
      if (Boolean(child.type === SideMenuHelper.MenuSingleItem)) {
        return cloneElement(child, {
          closeOther: this.closeOther,
          handleClick: this.handleClick,
          index: index,
          selected: index === this.state.selectedMenuItem ? true : false,
          ...child.props,
        });
      }
      if (Boolean(child.type === SideMenuHelper.MenuMultiItems)) {
        return cloneElement(child, {
          toggle: this.toggle,
          handleClick: this.handleClick,
          index: index,
          selected: index === this.state.selectedMenuItem ? true : false,
          collapsedSidebar:
            child.props.collapsedSidebar !== undefined
              ? child.props.collapsedSidebar
              : false,
          ...child.props,
        });
      }
    });
    return (
      <div className="nav-container">
        <ul id="main-menu-navigation" className="navigation navigation-main">
          {Nodes}
        </ul>
      </div>
    );
  }
}

export default SideMenuHelper;
