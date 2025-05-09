import fs from "fs";
import { stringify } from "querystring";
import { json } from "stream/consumers";

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error("Creating repository require filename");
		}
		this.filename = filename;

		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, "[]");
		}
	}

	async getAll() {
		// Open the file
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding: "utf8",
			})
		);
	}

	async createUser(attrs) {
		const records = await this.getAll();
		records.push(attrs);
		this.writeAll(records);
	}
	async writeAll(records) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		);
	}
}
const test = async () => {
	const repo = new UsersRepository("users.json");
	const users = await repo.getAll();
	const newUser = await repo.createUser("yousef");
	console.log(users);
};

test();
