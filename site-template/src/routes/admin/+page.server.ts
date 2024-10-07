import type { GigDetails } from '$lib/interfaces/gigs';

export async function load({ fetch }) {
	const data: GigDetails[] = await fetch('/api/live').then((r) => r.json());
	return {
		gigs: data ?? []
	};
}
