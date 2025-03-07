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

export const makeArtworkCredit = (credits: { collaborator: any; role: string }[]) => {
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
