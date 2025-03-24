import type { PersonDetails } from './people';

export interface Release {
	isHiddenOnSite: boolean;
	slug: string;
	name: string;
	description?: string;
	type: 'LP' | 'EP';
	releaseDate: string;
	artwork: {
		front: string;
		back?: string;
		credits?: PersonDetails[];
	};
	recordedAt?: {
		name: string;
		link?: string;
	}[];
	personnel?: PersonDetails[];
	technicalCredits?: string[];
	songs: Track[];
	purchaseLink?: string;
	listeningLinks?: string[];
	otherImages?: string[];
}

export type ListeningLink = {
	name: string;
	link: string;
};

export interface Track {
	slug: string;
	name: string;
	songwritingCredits?: PersonDetails[];
	durationInSeconds: number;
	lyrics?: string;
	personnel: string[];
	youTubeVidId?: string;
	singleDetails?: {
		coverImage: string;
		releaseDate: string;
	};
}
