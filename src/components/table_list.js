import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import GoogleMapReact from 'google-map-react';

import Row from './row';
import Col from './col';

const NoData = () => <div className="no-data">No Data.</div>;

const MapMarker = ({ text }) => <div className="map-marker">{text}</div>;

MapMarker.propTypes = {
  text: PropTypes.string.isRequired,
};

const getColComponent = (column, data) => {
  const fieldValue = column.field === 'name'
    ? `${data[column.field].first} ${data[column.field].last}`
    : data[column.field];
  if (column.type === 'map') {
    return (
      <div className="google-map">
        <GoogleMapReact
          defaultCenter={{ lat: Number(data.latitude), lng: Number(data.longitude) }}
          defaultZoom={0}
          bootstrapURLKeys={{ key: 'AIzaSyDLgQH4OliVCJWojeqrgmF_wlnNUJ87gLc' }}
        >
          <MapMarker key={data.guid} lat={data.latitude} lng={data.longitude} text={data.company} />
        </GoogleMapReact>
      </div>
    );
  }

  return <label>{fieldValue}</label>;
};

const renderRow = columns => (rowData, index) => (
  <Row key={index} className="data">
    {map(columns, column => <Col key={column.label} numCol={column.cols}>{getColComponent(column, rowData)}</Col>)}
  </Row>
);

const TableList = ({ columns, data }) => (
  <div className="table-list">
    <Row className="row-header">
      {map(columns, column => <Col key={column.label} numCol={column.cols}>{column.label}</Col>)}
    </Row>
    {
      data.length === 0
        ? <NoData />
        : data.map(renderRow(columns))
    }
  </div>
);

TableList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableList;
