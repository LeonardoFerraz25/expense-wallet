import React, { Component } from 'react';
import Bodytable from './Bodytable';
import HeaderTable from './HeaderTable';
import '../css/Table.css';

export class Table extends Component {
  render() {
    return (
      <div className="table">
        <table>
          <HeaderTable />
          <Bodytable />
        </table>
      </div>
    );
  }
}

export default Table;
