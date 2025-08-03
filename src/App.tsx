import { SidebarProvider, SidebarTrigger } from '@/components/base/sidebar';
import { NavBar } from '@/components/app/navbar';

export default function App() {
	return (
		<SidebarProvider>
			<NavBar />
			<main>
				<SidebarTrigger />
			</main>
		</SidebarProvider>
	);
}
