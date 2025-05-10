import fs from "fs";
import crypto from "crypto";

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
		return records;
	}

	randomId() {
		return crypto.randomBytes(4).toString("hex");
	}

	async deleteById(id) {
		const records = await this.getAll();
		const filteredRecords = [];
		for (let record of records) {
			if (record.id !== id) {
				filteredRecords.push(record);
			}
		}
		this.writeAll(filteredRecords);
		return filteredRecords;
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
	// const users = await repo.createUser({
	// 	email: "nothing@nothing.com",
	// 	password: "nothing",
	// });
	const deleted = await repo.deleteById("49c5a2c9");

	console.log(deleted);
};

test();
