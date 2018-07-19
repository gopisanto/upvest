import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { range, map } from 'lodash';
import classnames from 'classnames';

import TableList from './table_list';
import COLUMNS from './constants';

class Contacts extends Component {
  constructor(props) {
    super(props);

    const { customers } = props;

    this.state = {
      noOfPages: Math.ceil(customers.length / 10),
      currentPage: 1,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      noOfPages: Math.ceil(nextProps.customers.length / 10),
    });
  }
  handlePageClick = pageNumber => () => {
    this.setState({ currentPage: pageNumber });
  }
  render() {
    const { customers } = this.props;
    const { noOfPages, currentPage } = this.state;
    const totalRecords = customers.length;
    const startIndex = ((currentPage - 1) * 10);
    const endIndex = (startIndex + 10) > totalRecords
      ? totalRecords
      : startIndex + 10;

    return (
      <div className="contacts">
        <TableList columns={COLUMNS} data={customers.slice(startIndex, endIndex)} />
        {
          noOfPages > 1 &&
          <div className="page-numbers">
            {
              map(
                range(1, noOfPages + 1),
                page => (
                  <span
                    key={page}
                    role="button"
                    tabIndex="0"
                    className={`${classnames('page-number', { active: page === currentPage })}`}
                    onClick={this.handlePageClick(page)}
                  >
                    {page}
                  </span>
                ),
              )
            }
          </div>
        }
      </div>
    );
  }
}

Contacts.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
};

Contacts.defaultProps = {
  customers: [],
};

export default connect(state => ({ customers: state.reducer.customers }))(Contacts);
