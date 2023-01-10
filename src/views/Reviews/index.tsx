import ReviewsTop from "./ReviewsTop/ReviewsTop";
import ReviewsTable from "./ReviewsTable/ReviewsTable";
import cl from './reviews.module.scss'

const Reviews = () => {

	return (
		<div className={cl.reviewsWrap}>
      <ReviewsTop></ReviewsTop>
      <br></br>
      <ReviewsTable></ReviewsTable>
		</div>
	);
};

export default Reviews;
