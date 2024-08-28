import type { Release } from '../interfaces/releases';
import { lyrics } from './lyrics';
import { collaborators } from './collaborators';

export const releases: Release[] = [
	{
		name: 'Sax on the Beach',
		slug: 'sax-on-the-beach',
		type: 'LP',
		formats: ['Digital'],
		releaseDate: new Date('2022-02-25'),
		artwork: {
			front: 'sax-on-the-beach.jpg',
			credits: [
				{
					collaborator: collaborators.bleedingGumsMurphy,
					role: 'Artwork and typography'
				}
			]
		},
		personnel: [
			{
				collaborator: collaborators.bleedingGumsMurphy,
				role: 'Songwriter, Producer, Vocals, Nylon Guitar, Piano, Bass, Guitar, Violin'
			}
		],
		technicalCredits: [
			{
				collaborator: collaborators.bleedingGumsMurphy,
				role: 'Mixing and engineering'
			}
		],
		tracks: [
			{
				name: "Moanin' Lisa Blues",
				songwritingCredits: ['Bleeding Gums Murphy'],
				durationInSeconds: 148,
				lyrics: lyrics.exampleTrack,
				personnel: [],
				youTubeVidId: 'QIJWqzY42Ks'
			}
		],
		purchaseLink: 'https://bleedingGumsMurphy.bandcamp.com/album/sax-on-the-beach',
		listeningLinks: [
			{
				name: 'Spotify',
				link: 'https://open.spotify.com/album/7l6DVxJDtD4qwphE3lrsOE'
			},
			{
				name: 'Apple Music',
				link: 'https://music.apple.com/gb/album/sax-on-the-beach/1603957696'
			},
			{
				name: 'Bandcamp',
				link: 'https://bleedingGumsMurphy.bandcamp.com/album/sax-on-the-beach'
			}
		],
		recordedAt: [
			{
				name: 'Somewhat Blue Studios'
			}
		],
		otherImages: []
	}
];
