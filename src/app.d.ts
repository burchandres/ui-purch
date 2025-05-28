declare global {
	namespace App {
		interface Locals {
			accessToken: {
				token: string;
				expiration: number;
			} | null;
		}
	}
}

export {};
