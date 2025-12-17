import { supabase } from "./supabase.js";
import { t } from "./i18n.js";

const list = document.getElementById("users");

const loadUsers = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id);

  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.textContent = t("no_users");
    return;
  }

  data.forEach(u => {
    const btn = document.createElement("button");
    btn.textContent = u.username;
    btn.onclick = () => startConversation(u.id);
    list.appendChild(btn);
  });
};

const startConversation = async (otherUserId) => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data: conv } = await supabase
    .from("conversations")
    .insert({})
    .select()
    .single();

  await supabase.from("conversation_members").insert([
    { conversation_id: conv.id, user_id: user.id },
    { conversation_id: conv.id, user_id: otherUserId }
  ]);

  window.location.href = `chat.html?c=${conv.id}`;
};

loadUsers();
