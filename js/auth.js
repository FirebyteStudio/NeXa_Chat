import { supabase } from "./supabase.js";

// 🔐 Login
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "chat.html";
};

// 🆕 Cadastro
window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Confirme seu email para continuar 👀");
};

// 🔁 Mantém sessão
supabase.auth.onAuthStateChange((event, session) => {
  if (session && location.pathname.endsWith("index.html")) {
    window.location.href = "chat.html";
  }
});
