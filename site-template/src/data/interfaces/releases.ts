import type { CollaboratorDetails } from '../info/collaborators';

export interface Release {
	slug: string;
	name: string;
	description?: string;
	type: 'LP' | 'EP';
	formats: Format[];
	releaseDate: Date;
	artwork: ArtworkDetails;
	personnel: {
		collaborator: CollaboratorDetails;
		role: string;
	}[];
	technicalCredits: {
		collaborator: CollaboratorDetails;
		role: string;
	}[];
	tracks: Track[];
	purchaseLink: string;
	listeningLinks: ListeningLink[];
	recordedAt: {
		name: string;
		link?: string;
	}[];
	otherImages?: string[];
}

type ArtworkDetails = {
	front: string;
	back?: string;
	credits: {
		collaborator: CollaboratorDetails;
		role: string;
	}[];
};

export type ListeningLink = {
	name: string;
	link: string;
};

export interface Track {
	name: string;
	songwritingCredits: string[];
	durationInSeconds: number;
	lyrics?: string;
	personnel: {
		name: string;
		role: string;
	}[];
	singleDetails?: {
		releaseDate: Date;
		artwork: ArtworkDetails;
		purchaseLink: string;
	};
	youTubeVidId?: string;
}

type Format = 'Digital' | 'CD' | 'Vinyl';
