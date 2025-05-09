import fs from "fs";
import crypto from "crypto";
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
		attrs.id = this.randomId();
		records.push(attrs);
		this.writeAll(records);
	}

	randomId() {
		return crypto.randomBytes(4).toString("hex");
	}

	async getOne(id) {
		const records = await this.getAll();
		for (let record of records) {
			if (record.id == id) {
				return record;
			}
		}
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
	const user = await repo.getOne("423bcec2");

	console.log(user);
};

test();
