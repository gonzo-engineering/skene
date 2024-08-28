import { slugifyName } from '$lib/utils/utils';
import { releases } from '../../../../data/info/releases';

export const load = ({ params, url }) => {
	const matchingRelease = releases.find((release) =>
		release.tracks.find((track) => {
			return slugifyName(track.name) === params.slug && url.pathname.includes(release.slug);
		})
	);

	const matchingTrack = matchingRelease?.tracks.find(
		(track) => slugifyName(track.name) === params.slug
	);

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
