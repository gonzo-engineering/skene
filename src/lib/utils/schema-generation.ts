import type { GigDetails } from '$lib/interfaces/gigs';
import type { Release } from '$lib/interfaces/releases';
import { artistDetails } from '../../data/data';

export const artistSchema = {
	'@context': 'https://schema.org',
	'@type': 'MusicGroup',
	name: artistDetails.name,
	image: [],
	url: artistDetails.websiteUrl,
	sameAs: artistDetails.socialLinks
};

export const generateReleaseSchema = (release: Release) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'MusicAlbum',
		name: release.name,
		genre: 'Rock',
		byArtist: {
			'@type': 'MusicGroup',
			name: artistDetails.name
		},
		image: `${artistDetails.websiteUrl}/artwork/${release.artwork.front}`,
		datePublished: release.releaseDate,
		numTracks: release.songs.length,
		track: release.songs.map((track) => ({
			'@type': 'MusicRecording',
			name: track.name,
			duration: `PT${track.durationInSeconds}S`,
			byArtist: {
				'@type': 'MusicGroup',
				name: artistDetails.name
			},
			inAlbum: release.name
		}))
	};
};

export const generateGigSchema = (gig: GigDetails) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'MusicEvent',
		name: gig.venue,
		location: {
			'@type': 'MusicVenue',
			name: gig.venue,
			address: gig.venueAddress
		},
		startDate: gig.dateTime,
		url: gig.ticketLink
	};
};
