import { query } from "./_generated/server";

// Buscar listas de compras
export const getShoppingLists = query(async ({ db }) => {
  return await db.query("shopping_lists").collect();
});


