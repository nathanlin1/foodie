const res = await fetch('/api/v0/categories');
const data = await res.json();
console.log(data.categories)
const categories = data.categories;

export default categories;
