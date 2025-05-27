declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				username: string;
			} | null;
			accessToken: string | null;
		}
	}
}

export {};
