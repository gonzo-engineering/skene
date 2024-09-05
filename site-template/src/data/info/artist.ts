import type { Artist } from '$lib/interfaces/artist';

export const artistDetails: Artist = {
	name: 'Bleeding Gums Murphy',
	description: 'The best band this side of the dark side of the moon.',
	dateOfBirth: new Date('1995-03-07'),
	email: 'blah@johndoeandtheacmes.co.uk',
	bios: {
		short: 'The best band this side of the dark side of the moon.'
	},
	websiteUrl: 'https://artistdomain.com',
	storeUrl: 'https://thirdpartymerchplatform.com/artist',
	socialLinks: {
		x: 'https://x.com/johndoeacmes',
		instagram: 'https://instagram.com/johndoeacmes',
		facebook: 'https://facebook.com/johndoeacmes',
		spotify: 'https://open.spotify.com/artist/123456',
		appleMusic: 'https://itunes.apple.com/gb/artist/johndoeacmes',
		youTube: 'https://www.youtube.com/channel/U123456'
	},
	goatCounterId: 'johndoeacmes'
};

export const artistSchema = {
	'@context': 'https://schema.org',
	'@type': 'MusicGroup',
	name: artistDetails.name,
	image: [],
	url: artistDetails.websiteUrl,
	sameAs: Object.values(artistDetails.socialLinks)
};
