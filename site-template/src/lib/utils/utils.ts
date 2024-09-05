import type { CollaboratorDetails } from '../../data/info/collaborators';

export const prettifyStartTime = (dateTime: Date) => {
	return dateTime.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
};

export const formatDate = (date: Date): string => {
	const getDaySuffix = (day: number): string => {
		if (day >= 11 && day <= 13) {
			return 'th';
		}
		const lastDigit = day % 10;
		switch (lastDigit) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	const year = date.getFullYear();
	const daySuffix = getDaySuffix(day);
	return `${month} ${day}${daySuffix}, ${year}`;
};

export const formatDurationInSeconds = (durationInSeconds: number): string => {
	const minutes = Math.floor(durationInSeconds / 60);
	const seconds = durationInSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const slugifyName = (name: string) => {
	return name.replace(/ /g, '-').toLowerCase();
};

export const makeArtworkCredit = (
	credits: { collaborator: CollaboratorDetails; role: string }[]
) => {
	const roles = credits.map((credit) => credit.role);
	if (roles.every((role) => role === roles[0]) && credits.length > 1) {
		const lastCredit = credits.pop();
		return `${roles[0]} by ${credits
			.map((credit) =>
				credit.collaborator.link
					? `<a href="${credit.collaborator.link}">${credit.collaborator.name}</a>`
					: credit.collaborator.name
			)
			.join(', ')} and ${
			lastCredit!.collaborator.link
				? `<a href="${lastCredit!.collaborator.link}">${lastCredit!.collaborator.name}</a>`
				: lastCredit!.collaborator.name
		}`;
	}
	return credits
		.map((credit) => {
			if (credit.collaborator.link) {
				return `${credit.role} by <a href="${credit.collaborator.link}">${credit.collaborator.name}</a>`;
			}
			return `${credit.role} by ${credit.collaborator.name}`;
		})
		.join('. ');
};
