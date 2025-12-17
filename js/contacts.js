import { supabase } from "./supabase.js";

const list = document.getElementById("contacts");

const t = key =>
  document.querySelector(`[data-i18n="${key}"]`)?.textContent || key;

const loadConversations = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", user.id);

  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.textContent = t("no_conversations");
    return;
  }

  data.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = `${t("open_chat")} #${c.conversation_id}`;
    btn.onclick = () =>
      window.location.href = `chat.html?c=${c.conversation_id}`;
    list.appendChild(btn);
  });
};

loadConversations();
