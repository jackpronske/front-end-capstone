import React from 'react';

class RelatedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.combineFeatures = this.combineFeatures.bind(this);
  }

  combineFeatures(featureArray1, featureArray2) {
    let arr1 = featureArray1.slice();
    let arr2 = featureArray2.slice();

    const resultArray = [];
    let counter = 0;

    for (let i = 0; i < arr1.length; i += 1) {
      counter += 1;
      const newFeatObj = {
        id: counter,
        feature: arr1[i].feature,
        currentValue: arr1[i].value,
        relatedValue: null,
      };

      for (let j = 0; j < arr2.length; j += 1) {
        if (arr1[i].feature === arr2[j].feature) {
          newFeatObj.relatedValue = arr2[j].value;
          arr2.splice(j, 1);
          break;
        }
      }
      resultArray.push(newFeatObj);
    }
    let cleanUp = arr2.map((feat) => {
      counter += 1;
      return {
        id: counter,
        feature: feat.feature,
        currentValue: null,
        relatedValue: feat.value,
      };
    });

    return resultArray.concat(cleanUp);
  }

  render() {
    const { handleModalClick, selectedProduct, product } = this.props;

    const completeFeatArray = this.combineFeatures(selectedProduct.features, product.features);

    return (
      <div
        className="related-modal"
        onClick={handleModalClick}
      >
        <div className="table-heading"> Comparing </div>
        <table id="compare-products">
          <tbody>
            <tr>
              <th>{selectedProduct.name}</th>
              <th> </th>
              <th>{product.name}</th>
            </tr>
            {completeFeatArray.map((feature) => (
              <tr key={feature.id}>
                <td>{feature.currentValue}</td>
                <td>{feature.feature}</td>
                <td>{feature.relatedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RelatedModal;