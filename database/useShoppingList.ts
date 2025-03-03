import { useSQLiteContext } from "expo-sqlite";

export type List = {
  id: string;
  budget?: number;
  name: string;
  products: Product[];
};

export type Product = {
  id: string;
  list_id: string;
  checked: boolean;
  name: string;
  value: number;
  quantity: number;
};

export function useShoppingList() {
  const database = useSQLiteContext();

  async function create(data: Omit<List, "id">) {
    const statement = await database.prepareAsync(
      `INSERT INTO list (name, budget) VALUES ($name, $budget)`
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $budget: data.budget || 0,
      });

      const insertedRowId = result.lastInsertRowId;

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // product methods
  async function addProduct(data: Omit<Product, "id">) {
    const statement = await database.prepareAsync(
      `INSERT INTO product (list_id, name, quantity, value, checked) VALUES ($list_id, $name, $quantity, $value, $checked)`
    );
    try {
      const result = await statement.executeAsync({
        $list_id: data.list_id,
        $name: data.name,
        $quantity: data.quantity,
        $value: data.value,
        $checked: false,
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function checkProduct(data: { id: string; checked: boolean }) {
    const statement = await database.prepareAsync(
      `UPDATE product SET checked = $checked WHERE id = $id`
    );
    try {
      const result = await statement.executeAsync({
        $id: data.id,
        $checked: data.checked,
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function deleteProduct(id: string) {
    try {
      await database.execAsync("DELETE FROM product WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct(data: Product) {
    console.log(data);

    const statement = await database.prepareAsync(
      `UPDATE product SET name = $name, quantity = $quantity, value = $value WHERE id = $id`
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
        $value: data.value,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function findById(id: string) {
    try {
      const listQuery = "SELECT * FROM list WHERE id = ?";
      const itemsQuery = "SELECT * FROM product WHERE list_id = ?";

      const listResponse = await database.getFirstAsync<List>(listQuery, [id]);

      const itemsResponse = await database.getAllAsync<Product>(itemsQuery, [
        id,
      ]);

      if (!listResponse) {
        return null;
      }

      return {
        ...listResponse,
        products: itemsResponse,
      };
    } catch (error) {
      throw error;
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM list WHERE name LIKE ?";

      const response = await database.getAllAsync<List>(query, `%${name}%`);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: List) {
    const statement = await database.prepareAsync(
      "UPDATE products SET name = $name, quantity = $quantity WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM products WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM products WHERE id = ?";

      const response = await database.getFirstAsync<List>(query, [id]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function list() {
    try {
      const query = "SELECT * FROM list";

      const response = await database.getAllAsync<List>(query);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    searchByName,
    update,
    remove,
    show,
    list,
    findById,
    addProduct,
    checkProduct,
    deleteProduct,
    updateProduct,
  };
}
