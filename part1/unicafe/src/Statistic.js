import React from 'react';

const Statistic = (props) => (
  <tr>
    <td>
      {props.text}
    </td>
    <td>
      {props.value}
    </td>
  </tr>
);

export default Statistic;
