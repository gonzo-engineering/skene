import type { SiteDetails } from '$lib/interfaces/admin';
import type { Artist } from '$lib/interfaces/artist';
import type { GigDetails } from '$lib/interfaces/gigs';
import type { PersonDetails } from '$lib/interfaces/people';
import type { Release, Track } from '$lib/interfaces/releases';
import rawArtistDetails from './info/artist.json';
import rawSiteDetails from './info/site.json';

// Site details
export const siteDetails: SiteDetails = rawSiteDetails;

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

// People
const people: PersonDetails[] = [];
const rawPeople = import.meta.glob('./people/*.json', { eager: true });
for (const person in rawPeople) {
	const file = rawPeople[person];
	if (file && typeof file === 'object' && 'default' in file) {
		const person = file.default as PersonDetails;
		people.push(person);
	}
}

// Songs
export const songs: Track[] = [];
const rawSongs = import.meta.glob('./music/songs/*.json', { eager: true });
for (const song in rawSongs) {
	const file = rawSongs[song];
	if (file && typeof file === 'object' && 'default' in file) {
		const song = file.default as Track;
		songs.push(song);
	}
}

// Releases
export const releases: Release[] = [];
const rawReleases = import.meta.glob('./music/releases/*.json', { eager: true });
for (const release in rawReleases) {
	const file = rawReleases[release];
	if (file && typeof file === 'object' && 'default' in file) {
		const release = file.default as Release;
		release.songs = release.songs.map((track) => {
			const song = songs.find((s) => s.slug === track.slug);
			if (song) {
				return song;
			}
			return track;
		});
		release.personnel = release.personnel?.map((credit) => {
			const collaborator = people.find((c) => c.name === credit.name);
			if (collaborator) {
				return {
					...credit,
					link: collaborator.link
				};
			}
			return credit;
		});
		if (release.artwork.credits) {
			release.artwork.credits = release.artwork.credits.map((credit) => {
				const person = people.find((c) => c.name === credit.name);
				if (person) {
					return {
						...credit,
						link: person.link
					};
				}
				return credit;
			});
		}
		if (!release.isHiddenOnSite) {
			releases.push(release);
		}
	}
}
