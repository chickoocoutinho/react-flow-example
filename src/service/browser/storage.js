const SAVED_DATA = "react-flow-local-saved-data";

//Helper functions to interect with browser localstorage

export const setSavedData = (data) => {
	localStorage.setItem(SAVED_DATA, JSON.stringify(data));
};

export const getSavedData = () => {
	let data = null;

	try {
		const savedData = JSON.parse(localStorage.getItem(SAVED_DATA));
		if (typeof data === "object") {
			data = savedData;
		}
	} catch {}

	return data;
};
