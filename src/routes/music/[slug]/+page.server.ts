import { releases } from '../../../data/data';

export const load = ({ params }) => {
	const matchingRelease = releases.find((release) => release.slug === params.slug);

	if (!matchingRelease) {
		return {
			status: 404,
			error: new Error('Not Found')
		};
	}
	if (matchingRelease) {
		return {
			release: matchingRelease
		};
	}
};
