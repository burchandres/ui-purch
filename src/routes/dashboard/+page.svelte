<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/base/button/button.svelte';
	import { FormCard } from '$lib/components/form-card';
	import { Table, TableBody, TableCell, TableRow } from '$lib/components/base/table';

	let { data } = $props<{ data: PageData }>();

	const fields = [...Object.entries(data.user), ['accessToken', data.token]];
</script>

<FormCard title="Dashboard">
	<div class="rounded-md border">
		<Table>
			<TableBody>
				{#each fields as [field, value] (field)}
					<TableRow>
						<TableCell class="font-medium">{field}</TableCell>
						<TableCell class="font-mono break-all">{value}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>

	<form method="POST" action="?/logout">
		<Button type="submit" class="float-right">Logout</Button>
	</form>
</FormCard>
