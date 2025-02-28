import { useSQLiteContext } from "expo-sqlite";

export type List = {
  id: string;
  name: string;
};

export const useList = () => {
  const db = useSQLiteContext();
  async function createList(list: Omit<List, "id">) {
    const statement = await db.prepareAsync(
      `INSERT INTO list (name) VALUES ($name)`
    );

    try {
      const result = await statement.executeAsync({
        $name: list.name,
      });

      const insertedId = result.lastInsertRowId.toString();

      return { ...list, id: insertedId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list(): Promise<List[]> {
    const query = `SELECT * FROM list`;

    try {
      const result = await db.getAllAsync<List>(query);

      return result;
    } catch (error) {
      throw error;
    }
  }

  return {
    createList,
    list,
  };
};
