import type { GigDetails } from '$lib/interfaces/gigs';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, locals: { safeGetSession }, cookies }) => {
	const { session } = await safeGetSession();
	const gigs: GigDetails[] = await fetch('/api/live').then((r) => r.json());
	const hasUpcomingGigs =
		gigs.filter((gig) => new Date(gig.dateTimeStart) >= new Date()).length > 0;
	return {
		session,
		cookies: cookies.getAll(),
		hasUpcomingGigs
	};
};
