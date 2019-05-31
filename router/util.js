export const isJSON = (data) => {
	return typeof(data) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]'
}
