import type { FC } from 'react';

export const Heading3: FC<{ content: string }> = ({ content }) => (
	<span style={{ fontWeight: 'bold', fontSize: '20px' }}>{content}</span>
);
