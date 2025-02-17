export interface CollaboratorDetails {
	name: string;
	link?: string;
}

interface CollaboratorsMap {
	[key: string]: CollaboratorDetails;
}

export const collaborators: CollaboratorsMap = {
	bleedingGumsMurphy: {
		name: 'Bleeding Gums Murphy'
	},
	andreDack: {
		name: 'André Dack',
		link: 'https://x.com/andredack'
	},
	florianeHu: {
		name: 'Floriane Hu',
		link: 'https://www.florianehu.com/'
	},
	oliverRoss: {
		name: 'Oliver Ross'
	},
	aimeeMoody: {
		name: 'Aimee Moody',
		link: 'https://www.instagram.com/aimee_moody/'
	},
	frederickOBrien: {
		name: "Frederick O'Brien",
		link: 'https://www.frederickobrien.com/'
	},
	monikaDrabot: {
		name: 'Monika Drabot',
		link: 'https://www.monikadrabot.com/'
	},
	alHarle: {
		name: 'Al Harle'
	},
	georgePearson: {
		name: 'George Pearson'
	},
	adamDean: {
		name: 'Adam Dean'
	},
	tsmProductions: {
		name: 'TSM Productions'
	},
	nicholasThurston: {
		name: 'Nicholas Thurston'
	}
};
