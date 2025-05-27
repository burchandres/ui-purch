import FormCard from './form-card.svelte';

export { FormCard, type FormCardProps };

export type FormCardProps = {
	title: string;
	subtitle?: string;
	class?: string;
};
