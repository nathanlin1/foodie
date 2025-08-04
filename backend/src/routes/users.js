export const getUser = async (req, res) => {
  const { id, email, last_sign_in_at } = req.user

  return res.status(200).json({ 
    user: {
        id,
        email,
        last_sign_in_at
    },
   });
};