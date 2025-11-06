import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/base/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/components/base/dialog';
import { logout } from '@/lib/api/user/endpoints';

export const LogOutButtonDialog = () => {
	const navigate = useNavigate();

	async function onLogout() {
		await logout();
		navigate({ to: '/landing' });
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="max-w-26" variant="destructive">
					<p className="text-xs">Log out</p>
				</Button>
			</DialogTrigger>
			<div className="max-w-10">
				<DialogContent className="w-80">
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>Click cancel to return</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={onLogout} variant="destructive">
							Log out
						</Button>
					</DialogFooter>
				</DialogContent>
			</div>
		</Dialog>
	);
};
