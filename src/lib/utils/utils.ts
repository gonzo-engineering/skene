import type { PersonDetails } from '$lib/interfaces/people';

export const prettifyStartTime = (dateTime: Date) => {
	return dateTime.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
};

export const formatDate = (date: string): string => {
	const dateObj = new Date(date);
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
	const month = dateObj.toLocaleString('default', { month: 'long' });
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	const daySuffix = getDaySuffix(day);
	return `${month} ${day}${daySuffix}, ${year}`;
};

export const formatDurationInSeconds = (durationInSeconds: number): string => {
	const minutes = Math.floor(durationInSeconds / 60);
	const seconds = durationInSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const makeArtworkCredit = (credits: PersonDetails[]) => {
	const roles = credits.map((credit) => credit.credit);
	if (roles.every((role) => role === roles[0]) && credits.length > 1) {
		const lastCredit = credits.pop();
		return `${roles[0]} by ${credits
			.map((credit) => (credit.link ? `<a href="${credit.link}">${credit.name}</a>` : credit.name))
			.join(', ')} and ${
			lastCredit!.link ? `<a href="${lastCredit!.link}">${lastCredit!.name}</a>` : lastCredit!.name
		}`;
	}
	return credits
		.map((credit) => {
			if (credit.link) {
				return `${credit.credit} by <a href="${credit.link}">${credit.name}</a>`;
			}
			return `${credit.credit} by ${credit.name}`;
		})
		.join('. ');
};
