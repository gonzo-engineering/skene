export interface Gig {
	venue: {
		name: string;
		address: string;
		link: string;
		coordinates: {
			latitude: number;
			longitude: number;
		};
	};
	description: string;
	date: string;
	time: {
		start: string;
		end: string;
	};
	ticketLink: string;
}
