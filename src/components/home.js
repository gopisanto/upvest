import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach, isEmpty } from 'lodash';
import GoogleMapReact from 'google-map-react';

import LabelValue from './label_value';

const MapMarker = ({ text }) => <div className="map-marker">{text}</div>;

MapMarker.propTypes = {
  text: PropTypes.string.isRequired,
};

const calculateAvg = (customers, field) => {
  if (isEmpty(customers) || customers.length === 0 || isEmpty(field)) {
    return 0;
  }
  let sum = 0;
  let avg = 0;

  forEach(customers, (customer) => {
    sum += Number(customer[field]);
  });

  avg = sum / customers.length;

  return field === 'age' ? Number(avg).toFixed(2) : avg;
};

const Home = ({ customers }) => {
  const avgCustomerAge = calculateAvg(customers, 'age');

  if (customers.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="home">
      <LabelValue label="Customers Avg. age: " value={avgCustomerAge.toString()} />
      <LabelValue label="No. of customers: " value={customers.length.toString()} />
      <div className="contacts-map">
        <GoogleMapReact
          defaultCenter={{ lat: calculateAvg(customers, 'latitude'), lng: calculateAvg(customers, 'longitude') }}
          defaultZoom={0}
          bootstrapURLKeys={{ key: 'AIzaSyDLgQH4OliVCJWojeqrgmF_wlnNUJ87gLc' }}
        >
          {customers.map(customer => <MapMarker key={customer.guid} lat={customer.latitude} lng={customer.longitude} text={customer.company} />)}
        </GoogleMapReact>
      </div>
    </div>
  );
};

Home.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  customers: [],
};

export default connect(state => ({ customers: state.reducer.customers }))(Home);
