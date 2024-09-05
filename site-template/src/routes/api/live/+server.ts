import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { data } = await supabase.from('gigs').select();
	return json(data);
}
