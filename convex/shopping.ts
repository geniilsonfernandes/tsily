import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getShoppingLists = query(async ({ db }) => {
  return await db.query("shopping_lists").collect();
});

export const getShoppingListById = query({
  args: {
    id: v.id("shopping_lists"),
  },
  handler: async (ctx, args) => {
    const list = await ctx.db.get(args.id);
    const items = await ctx.db
      .query("items")
      .filter((q) => q.eq(q.field("listId"), args.id))
      .collect();

    return {
      ...list,
      items,
    };
  },
});

export const addItem = mutation({
  args: {
    listId: v.id("shopping_lists"),
    name: v.string(),
    quantity: v.optional(v.number()),
    checked: v.boolean(),
    value: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("items", {
      checked: false,
      listId: args.listId,
      name: args.name,
      quantity: args.quantity,
      value: args.value,
    });
  },
});

export const editItem = mutation({
  args: {
    id: v.id("items"),
    name: v.string(),
    quantity: v.optional(v.number()),
    checked: v.boolean(),
    value: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      quantity: args.quantity,
      checked: args.checked,
    });
  },
});

export const checkItem = mutation({
  args: {
    id: v.id("items"),
    checked: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      checked: args.checked,
    });
  },
});
