import React from 'react';

export type TitleLike =
	| string
	| [string, string]
	| { title?: string; description?: string };

/**
 * Normalize different title/description shapes into an object.
 * Accepts a string, tuple [title, description], or an object.
 */
export function destructureTitleDesc(input?: TitleLike) {
	if (!input) return { title: '', description: '' };

	if (typeof input === 'string') {
		return { title: input, description: '' };
	}

	if (Array.isArray(input)) {
		return { title: input[0] ?? '', description: input[1] ?? '' };
	}

	return { title: input.title ?? '', description: input.description ?? '' };
}

type Props = {
	title?: string;
	description?: string;
	/**
	 * Alternate single prop you can pass instead of separate title/description.
	 * Can be a string, tuple [title, description] or object with `title` and `description`.
	 */
	content?: TitleLike;
};

const Title: React.FC<Props> = ({ title, description, content }) => {
	const normalized = content ? destructureTitleDesc(content) : { title: title ?? '', description: description ?? '' };
	return (
		<div className="text-center">
			<h2 className="text-3xl font-extrabold text-foreground">{normalized.title}</h2>
			{normalized.description && <p className="mt-2 text-lg text-muted-foreground">{normalized.description}</p>}
		</div>
	);
};

export default Title;