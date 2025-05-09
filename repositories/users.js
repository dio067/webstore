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
		const contents = await fs.promises.readFile(this.filename, {
			encoding: "utf8",
		});
		// Read the contents
		console.log(contents);
		// Parse the contents

		// Return the parsed contents
	}
}

const test = async () => {
	const repo = new UsersRepository("users.json");
	await repo.getAll();
};

test();
