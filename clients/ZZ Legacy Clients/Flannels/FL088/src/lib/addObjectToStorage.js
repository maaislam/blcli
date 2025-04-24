/**
* Add an item to a localStorage() object
* @param {String} name  The localStorage() key
* @param {String} key   The localStorage() value object key
* @param {String} value The localStorage() value object value
*/
export const addToLocalStorageObject = (name, key, value) => {

 // Get the existing data
 var existing = localStorage.getItem(name);

 // If no existing data, create an array
 // Otherwise, convert the localStorage string to an array
 existing = existing ? JSON.parse(existing) : {};

 // Add new data to localStorage Array
 existing[key] = value;

 // Save back to localStorage
 localStorage.setItem(name, JSON.stringify(existing));

};