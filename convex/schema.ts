import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
  }),

  shopping_lists: defineTable({
    name: v.string(), // Nome da lista (ex: "Supermercado", "Farmácia")
    ownerId: v.id("users"), // Criador da lista
    createdAt: v.number(), // Data de criação
  }).index("by_owner", ["ownerId"]),

  items: defineTable({
    listId: v.id("shopping_lists"), // Qual lista esse item pertence
    name: v.string(), // Nome do item (ex: "Leite", "Ovos")
    quantity: v.optional(v.number()), // Quantidade (ex: 2 unidades)
    checked: v.boolean(), // Se foi comprado ou não
  }).index("by_list", ["listId"]),
});
