import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export type List = {
  id: string;
  budget?: number;
  name: string;
  products: Product[];
};

export type Product = {
  id: string;
  listId: string;
  product: string;
  quantity: string;
};

export const useLists = () => {
  const db = useSQLiteContext();
  const [data, setData] = useState<List[]>([]); // Agora é um array de List
  const [loading, setLoading] = useState(false);

  async function getLists() {
    setLoading(true);
    const query = `SELECT * FROM list`;

    try {
      const result = await db.getAllAsync<List>(query); // Use getAllAsync para buscar todos os resultados
      console.log(result, "result");

      return result; // Retorna todos os itens
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    getLists,
  };
};

export const useList = (id: string) => {
  const db = useSQLiteContext();
  const [data, setData] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);

  async function findById(id: string) {
    setLoading(true);
    const query = `SELECT * FROM list WHERE id = $id`;

    try {
      const result = await db.getFirstAsync<List>(query, { $id: id });

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(() => {
    (async () => {
      const list = await findById(id);
      setData(list);
    })();
  });

  return {
    data,
    loading,
  };
};

export const useListProducts = () => {
  const db = useSQLiteContext();

  async function addProduct(data: {
    listId: string;
    product: string;
    quantity: string;
    value: string;
  }) {
    const statement = await db.prepareAsync(
      `INSERT INTO product (list_id, product, quantity, value) VALUES ($list_id, $product, $quantity, $value)`
    );
    try {
      const result = await statement.executeAsync({
        $list_id: data.listId,
        $product: data.product,
        $quantity: data.quantity,
        $value: data.value,
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return {
    addProduct,
  };
};
