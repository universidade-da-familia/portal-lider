import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class PhoneFormat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    const { value } = this.state;

    return (
      <NumberFormat
        type="tel"
        inputMode="decimal"
        displayType="input"
        format="(##)#########"
        allowNegative={false}
        value={value}
        onValueChange={vals => {
          this.setState({ value: vals.value });
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
      />
    );
  }
}

export default PhoneFormat;
