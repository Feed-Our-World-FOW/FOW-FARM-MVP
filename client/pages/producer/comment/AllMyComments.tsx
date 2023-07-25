import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getReviewForFarm } from '../../../components/marketplace/API';
import { fetchToken } from '../../../components/marketplace/token';
import { useRouter } from 'next/router';
import { Navbar, CommentCardComponent } from '../../../components/marketplace';

function AllMyComments() {
	const router = useRouter();
	const [reviews, setReviews] = useState<any>([{}]);

	const fetch = async () => {
		try {
			const token = fetchToken();
			const reviewdata = await getReviewForFarm(
				token,
				router.query.id as string
			);
			const data = reviewdata.data.data.data;
			setReviews(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `w-full max-w-md flex flex-col justify-between items-center`,
		navBox: `w-full px-4 z-50`,
		upperBox: `w-full flex flex-col items-center bg-white`,
		upperSubBox: `w-full flex justify-center items-center h-8 mt-24`,
		commentBox: `w-full mb-40 mt-5`,
		footerBox: `w-full max-w-md bg-white fixed bottom-0 h-28 mt-10 flex justify-center items-center z-50`,
	};

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>
				<Box className={styles.navBox}>
					<Navbar arrow={true} rating={true} noCart />
				</Box>
				<Box className={styles.upperSubBox}>
					<span className="text-2sm font-bold">
						{router.query.ratingsAverage}
					</span>
					<span className="text-3sm font-semibold ml-2">{`(${router.query.ratingsQuantity})`}</span>
				</Box>

				<Box className={styles.commentBox}>
					{reviews.map((i: any) => {
						return (
							<CommentCardComponent
								key={i?.id}
								createdAt={i?.createdAt}
								rating={i?.rating}
								review={i?.review}
								userName={i?.user?.name}
								userPhoto={i?.user?.photo}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}

export default AllMyComments;
