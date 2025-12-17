import { supabase } from "./supabase.js";

const messagesDiv = document.getElementById("messages");

// 🔒 Verifica login
const checkAuth = async () => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    window.location.href = "index.html";
  }
};

checkAuth();

// 📥 Carregar mensagens
async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  messagesDiv.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg.content;
    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 📤 Enviar mensagem
window.sendMessage = async () => {
  const input = document.getElementById("msg");
  if (!input.value.trim()) return;

  await supabase.from("messages").insert({
    content: input.value
  });

  input.value = "";
};

// ⚡ Realtime
supabase
  .channel("realtime-messages")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    () => loadMessages()
  )
  .subscribe();

loadMessages();
