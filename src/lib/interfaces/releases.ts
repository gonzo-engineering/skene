export interface Release {
	slug: string;
	name: string;
	type: 'LP' | 'EP';
	releaseDate: string;
	coverImage: string;
	personnel?: string[];
	technicalCredits?: string[];
	songs: Track[];
	purchaseLink?: string;
	listeningLinks?: string[];
	otherImages?: string[];
}

type ArtworkDetails = {
	front: string;
	back?: string;
	credits: string[];
};

export type ListeningLink = {
	name: string;
	link: string;
};

export interface Track {
	slug: string;
	name: string;
	songwritingCredits?: string[];
	durationInSeconds: number;
	lyrics?: string;
	personnel: string[];
	youTubeVidId?: string;
	singleDetails?: {
		coverImage: string;
		releaseDate: string;
	};
}
