import { gigs } from '../../data/gigs/gigs';

const sortedGigs = gigs.sort((a, b) => {
	return b.dateTimeStart.getMilliseconds() - a.dateTimeStart.getMilliseconds();
});

export function load() {
	return {
		gigs: sortedGigs
	};
}
