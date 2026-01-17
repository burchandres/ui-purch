import type { FC } from 'react';
import { Card, CardContent, CardTitle } from '../base/card';

export const ErrorMessage: FC<{ message?: string }> = ({
	message = 'An error occurred',
}) => (
	<Card>
		<CardTitle>Error</CardTitle>
		<CardContent>
			<span>{message}</span>
		</CardContent>
	</Card>
);

export const NoDataMessage: FC<{ message?: string }> = ({
	message = 'No data found',
}) => (
	<Card style={{ border: 'none' }}>
		<CardContent>
			<span style={{ fontStyle: 'italic' }}>{message}</span>
		</CardContent>
	</Card>
);
