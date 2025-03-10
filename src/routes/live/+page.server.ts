import { gigs } from '../../data/data';

export const load = () => {
	if (gigs.length === 0) {
		return null;
	}
	return { gigs };
};
