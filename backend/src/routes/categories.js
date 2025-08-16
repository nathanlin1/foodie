import supabase from "../db.js";

export const getCategories = async (req, res) => {
    const { data } = await supabase
        .from('categories')
        .select('id, name')

    res.status(200).json({ categories: data });
};