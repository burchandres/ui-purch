declare global {
	namespace App {
		interface Locals {
			purchToken: {
				token: string;
				expiration: number;
			} | null;
		}
	}
}

export {};
