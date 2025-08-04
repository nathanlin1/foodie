import supabase from "../db.js";

export const getCategories = async (req, res) => {
    const { data } = await supabase
        .from('categories')
        .select('name')

    const categoryNames = data.map(category => category.name);

    res.status(200).json({ categories: categoryNames });
};