export interface Artist {
	name: string;
	description: string;
	dateOfBirth: Date;
	email: string;
	websiteUrl: string;
	storeUrl?: string;
	bios: { [key: string]: string };
	socialLinks: {
		[key: string]: string;
	};
	goatCounterId?: string;
}
