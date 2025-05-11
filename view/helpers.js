export default {
	getError(errors, prop) {
		try {
			return errors.map()[prop].msg;
		} catch (err) {
			return "";
		}
	},
};
