import fs from "fs";

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
			console.log("file created");
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
}
const test = async () => {
	const repo = new UsersRepository("users.json");
	const users = await repo.getAll();
	console.log(users);
};

test();
