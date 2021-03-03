import React from 'react';

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeQuantity=this.changeQuantity.bind(this);
  }

  changeQuantity(e){
    debugger;
    this.props.updateQuantityInState(event.target.value)
  }

  render() {
    const { styles, currentStyle, currentSku, currentSize } = this.props;
    if (currentSku === '') {
      return (
        <div className="quantity-selector">
          <select>
            <option disabled> - </option>
          </select>
        </div>
      );
    }

    let quantity = styles.results[currentStyle].skus.[currentSku].quantity
    let max;
    (quantity > 15) ?  max = 15 :  max = quantity

    let arrOfQuantities = []
    for (let i=1; i<=max; i++) {
      arrOfQuantities.push(i)
    }

    return (
      <div className="quantity-selector">
        <select onChange={this.changeQuantity}>
          {arrOfQuantities.map((num)=>{
            return <option>{num}</option>
          })}
        </select>
      </div>
    );
  }
}

export default QuantitySelector;
