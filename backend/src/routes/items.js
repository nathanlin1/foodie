import supabase from "../db.js";

export const getItemsFromCatId = async (req, res) => {
    const { categoryId } = req.params;

    const { data } = await supabase
        .from('items')
        .select('name')
        .eq('categoryId', categoryId)

    const itemNames = data.map(item => item.name);

    if (!data || data.length === 0) {
        return res.sendStatus(404)
    }

    res.status(200).json({ items: itemNames });
};