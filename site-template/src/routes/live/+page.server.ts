export async function load({ fetch }) {
	const data = await fetch('/api/live').then((r) => r.json());
	return {
		gigs: data ?? []
	};
}
