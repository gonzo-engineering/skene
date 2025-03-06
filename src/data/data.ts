import type { Artist } from '$lib/interfaces/artist';
import type { GigDetails } from '$lib/interfaces/gigs';
import rawArtistDetails from './info/artist.json';

// Artist details
export const artistDetails: Artist = rawArtistDetails;

// Gigs
export const gigs: GigDetails[] = [];
const rawGigs = import.meta.glob('./gigs/*.json', { eager: true });
for (const gig in rawGigs) {
	const file = rawGigs[gig];
	if (file && typeof file === 'object' && 'default' in file) {
		const gig = file.default as GigDetails;
		gigs.push(gig);
	}
}
