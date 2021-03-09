import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Ratings from './Ratings';
import Reviews from './Reviews';
import ReviewModal from './ReviewModal';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewCount: 2,
      showModal: false,
    };

    this.addToReviewsCount = this.addToReviewsCount.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.markReviewAsHelpful = this.markReviewAsHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  addToReviewsCount() {
    this.setState((prevState) => ({
      reviewCount: prevState.reviewCount + 2,
    }));
  }

  toggleModal() {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  }

  markReviewAsHelpful(review) {
    const {
      getProductReviews,
      reviews,
    } = this.props;

    axios.put(`/reviews/${review.review_id}/helpful`)
      .then(() => {
        getProductReviews(reviews.product);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  reportReview(review, index) {
    const { reviews } = this.props;

    axios.put(`/reviews/${review.review_id}/report`)
      .then(() => {
        reviews.results[index].reported = true;
        this.setState({});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  render() {
    const {
      getProductReviews,
      getMetaData,
      selectedProduct,
      reviews,
      meta,
    } = this.props;

    const {
      reviewCount,
      showModal,
    } = this.state;

    if (reviews.results && reviews.results.length === 0) {
      return (
        <div>
          No reviews yet...
          <button type="button" onClick={this.toggleModal}>ADD A REVIEW +</button>
          <ReviewModal
            selectedProduct={selectedProduct}
            showModal={showModal}
            toggleModal={this.toggleModal}
            meta={meta}
            getProductReviews={getProductReviews}
            getMetaData={getMetaData}
          />
        </div>
      );
    }

    return (
      <div className="ratings-and-reviews">
        <Ratings meta={meta} />
        <Reviews
          selectedProduct={selectedProduct}
          reviews={reviews}
          meta={meta}
          reviewCount={reviewCount}
          showModal={showModal}
          addToReviewsCount={this.addToReviewsCount}
          toggleModal={this.toggleModal}
          markReviewAsHelpful={this.markReviewAsHelpful}
          reportReview={this.reportReview}
          getProductReviews={getProductReviews}
          getMetaData={getMetaData}
        />
      </div>
    );
  }
}

RatingsAndReviews.propTypes = {
  getProductReviews: PropTypes.func.isRequired,
  getMetaData: PropTypes.func.isRequired,
  selectedProduct: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
  ).isRequired,
  reviews: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
  ).isRequired,
  meta: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
};

export default RatingsAndReviews;
