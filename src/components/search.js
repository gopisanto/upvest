import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filter, isEmpty } from 'lodash';

import TableList from './table_list';
import COLUMNS from './constants';

const getFilteredCustomers = (customers, term) => {
  if (term.trim() === '') {
    return [];
  }

  return filter(customers, (customer) => {
    const replacedTerm = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(replacedTerm, 'i');

    return regex.test(customer.name.first)
      || regex.test(customer.name.last)
      || regex.test(customer.address)
      || regex.test(customer.about)
      || regex.test(customer.email)
      || regex.test(customer.guid)
      || regex.test(customer.phone)
      || regex.test(customer.guid);
  });
};

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { term: '', filteredCustomers: [], error: '' };
  }
  handleOnChange = ({ target: { value } }) => {
    this.setState({ term: value });
  }
  handleOnSearch = () => {
    const { term } = this.state;
    const { customers } = this.props;
    try {
      this.setState({ filteredCustomers: getFilteredCustomers(customers, term), error: '' });
    } catch (err) {
      this.setState({ error: 'Error occured while searching, please try again.' });
    }
  }
  render() {
    const { term, filteredCustomers, error } = this.state;

    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search customers..."
          value={term}
          onChange={this.handleOnChange}
        />
        <button onClick={this.handleOnSearch}>Search</button>
        {!isEmpty(error) && <label className="error">{error}</label>}
        <TableList columns={COLUMNS} data={filteredCustomers} />
      </div>
    );
  }
}

Search.propTypes = {
  customers: PropTypes.array,
};

Search.defaultProps = {
  customers: [],
};

export default connect(state => ({ customers: state.reducer.customers }))(Search);
