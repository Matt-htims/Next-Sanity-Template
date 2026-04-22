import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type WebhookPayload = {
	_type?: string;
	_id?: string;
	slug?: string | { current?: string };
	operation?: 'create' | 'update' | 'delete';
	forceDeploy?: boolean;
};

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

// Document types whose changes should revalidate the whole layout (nav, site
// info, etc.) rather than a single slug.
const TYPE_REVALIDATES_LAYOUT = new Set(['siteInfo']);

// Document types that map 1-to-1 with a URL slug.
const TYPE_SLUG_BASED = new Set(['page']);

function sanitizeSlug(input?: string): string | null {
	if (!input) return null;
	const trimmed = input.trim();
	if (!trimmed) return null;
	if (trimmed === '/') return '/';
	return `/${trimmed.replace(/^\/+/, '')}`;
}

function extractSlug(payload: WebhookPayload): string | null {
	if (typeof payload.slug === 'string') {
		return sanitizeSlug(payload.slug);
	}
	return sanitizeSlug(payload.slug?.current);
}

function getIncomingSecret(request: NextRequest): string | null {
	const authHeader = request.headers.get('authorization');
	if (authHeader?.toLowerCase().startsWith('bearer ')) {
		return authHeader.slice(7).trim();
	}
	return request.nextUrl.searchParams.get('secret');
}

export async function POST(request: NextRequest) {
	if (!REVALIDATE_SECRET) {
		return NextResponse.json(
			{ ok: false, error: 'SANITY_REVALIDATE_SECRET is not configured' },
			{ status: 500 },
		);
	}

	const incomingSecret = getIncomingSecret(request);
	if (!incomingSecret || incomingSecret !== REVALIDATE_SECRET) {
		return NextResponse.json(
			{ ok: false, error: 'Unauthorized' },
			{ status: 401 },
		);
	}

	let payload: WebhookPayload;
	try {
		payload = (await request.json()) as WebhookPayload;
	} catch {
		return NextResponse.json(
			{ ok: false, error: 'Invalid JSON payload' },
			{ status: 400 },
		);
	}

	const type = payload._type || 'unknown';
	const slug = extractSlug(payload);
	const revalidatedPaths = new Set<string>();

	if (TYPE_SLUG_BASED.has(type) && slug) {
		revalidatePath(slug);
		revalidatedPaths.add(slug);
	}

	if (TYPE_REVALIDATES_LAYOUT.has(type)) {
		revalidatePath('/', 'layout');
		revalidatedPaths.add('/ (layout)');
	}

	if (!revalidatedPaths.size) {
		revalidatePath('/');
		revalidatedPaths.add('/');
	}

	return NextResponse.json({
		ok: true,
		type,
		slug,
		operation: payload.operation || null,
		revalidatedPaths: [...revalidatedPaths],
	});
}
