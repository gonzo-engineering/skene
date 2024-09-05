import type { GigDetails } from '../data/interfaces/gigs.js';

export async function load({ fetch }) {
	const gigs: GigDetails[] = await fetch('/api/live').then((r) => r.json());
	const hasUpcomingGigs =
		gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date()).length > 0;
	return {
		hasUpcomingGigs
	};
}
