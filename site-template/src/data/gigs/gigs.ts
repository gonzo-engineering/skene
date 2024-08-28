import rawGigs from './gigs.json';

export interface GigDetails {
	venue: string;
	address?: string;
	dateTimeStart: Date;
	ticketLink?: string;
	supporting?: string;
	linkToSupportingArtist?: string;
}

export const gigs: GigDetails[] = rawGigs.map((gig: any) => {
	return {
		venue: gig.venue,
		address: gig.address,
		dateTimeStart: new Date(gig.dateTimeStart),
		ticketLink: gig.ticketLink,
		supporting: gig.supporting,
		linkToSupportingArtist: gig.linkToSupportingArtist
	};
});
