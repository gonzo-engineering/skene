import type { GigDetails } from '$lib/interfaces/gigs';
import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
	const {
		data
	}: {
		data: GigDetails[] | null;
	} = await supabase.from('gigs').select();
	if (!data) {
		return json([]);
	}
	const sortedGigs = data.sort(
		(a, b) => new Date(b.dateTimeStart).getTime() - new Date(a.dateTimeStart).getTime()
	);
	return json(sortedGigs);
}
