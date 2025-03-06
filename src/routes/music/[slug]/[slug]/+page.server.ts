import { releases } from '../../../../data/data';

export const load = ({ params, url }) => {
	const matchingRelease = releases.find((release) =>
		release.songs.find((track) => {
			return track.slug === params.slug && url.pathname.includes(release.slug);
		})
	);

	const matchingTrack = matchingRelease?.songs.find((track) => track.slug === params.slug);

	if (!matchingTrack) {
		return {
			status: 404,
			error: new Error('Not Found')
		};
	}
	if (matchingTrack && matchingRelease) {
		return {
			track: matchingTrack,
			parentRelease: matchingRelease
		};
	}
};
