import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "@supabase/supabase-js";
const { createClient } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к Supabase
const supabaseUrl = "https://ТВОЙ_ПРОЕКТ.supabase.co";
const supabaseKey = "ТВОЙ_АНОНИМНЫЙ_API_КЛЮЧ";
const supabase = createClient(supabaseUrl, supabaseKey);

// 📦 Получить все товары
app.get("/items", async (req, res) => {
  const { data, error } = await supabase.from("items").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// ➕ Добавить товар
app.post("/items", async (req, res) => {
  const { name, rarity, level, price, contact, image, owner_id } = req.body;
  const { data, error } = await supabase
    .from("items")
    .insert([{ name, rarity, level, price, contact, image, owner_id }]);
  if (error) return res.status(400).json(error);
  res.json(data);
});

// 🗑 Удалить товар (для модерации)
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) return res.status(400).json(error);
  res.json({ success: true });
});

app.listen(10000, () => console.log("✅ Сервер запущен на порту 10000"));