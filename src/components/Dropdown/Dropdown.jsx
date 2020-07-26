/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;

    this.state = {
      listOpen: false,
      headerTitle: title,
      keyword: '',
    };

    this.searchField = React.createRef();
    this.close = this.close.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { list, title } = nextProps;

    const selectedItem = list.filter((item) => item.selected);

    if (selectedItem.length) {
      return {
        headerTitle: selectedItem[0].title,
      };
    }
    return { headerTitle: title };
  }

  componentDidUpdate() {
    const { listOpen } = this.state;

    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  close() {
    this.setState({
      listOpen: false,
    });
  }

  selectItem(title, id, stateKey) {
    const { resetThenSet } = this.props;

    this.setState({
      headerTitle: title,
      listOpen: false,
    }, resetThenSet(id, stateKey));
  }

  toggleList() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
      keyword: '',
    }), () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.listOpen && this.searchField.current) {
        this.searchField.current.focus();
        this.setState({
          keyword: '',
        });
      }
    });
  }

  filterList(e) {
    this.setState({
      keyword: e.target.value.toLowerCase(),
    });
  }

  listItems() {
    const { list, searchable } = this.props;
    const { keyword } = this.state;

    let tempList = list;

    if (keyword.length) {
      tempList = list
        .filter((item) => (
          item.title.toLowerCase().slice(0, keyword.length).includes(keyword)
        )).sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
    }

    if (tempList.length) {
      return (
        tempList.map((item) => (
          <button
            type="button"
            className="dd-list-item"
            key={item.id}
            onClick={() => this.selectItem(item.title, item.id, item.key)}
          >
            {item.selected && <span className="fa fa-check"/>}
            {' '}
            {item.title}
          </button>
        ))
      );
    }

    return <div className="dd-list-item no-result">{searchable[1]}</div>;
  }

  render() {
    const { searchable, title } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header"
          onClick={() => this.toggleList()}
        >
          <div className="dd-header-title">{title}: {headerTitle}</div>
          {listOpen
            ? <span className="fa fa-angle-up"/>
            : <span className="fa fa-angle-down"/>}
        </button>
        {listOpen && (
          <div
            role="list"
            className={`dd-list ${searchable ? 'searchable' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {searchable
            && (
            <input
              ref={this.searchField}
              className="dd-list-search-bar"
              placeholder={searchable[0]}
              onChange={(e) => this.filterList(e)}
            />
            )}
            <div className="dd-scroll-list">
              {this.listItems()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;