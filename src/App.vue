<template>
  <div class="app">
    <header class="topbar">
      <h1 class="logo">Vue Mini Site</h1>

      <nav class="nav">
        <router-link to="/" class="link" active-class="active" exact-active-class="active">Home</router-link>
        <router-link to="/todos" class="link" active-class="active">Todos</router-link>
        <router-link to="/notes" class="link" active-class="active">Notes</router-link>
      </nav>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer">
      <small>© 2026 Vue Mini Site</small>
    </footer>
  </div>
</template>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; }
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #eee;
}
.logo { margin: 0; font-size: 18px; }
.nav { display: flex; gap: 12px; }
.link { text-decoration: none; color: #333; padding: 6px 10px; border-radius: 8px; }
.active { background: #111; color: #fff; }
.container { flex: 1; padding: 20px; max-width: 920px; width: 100%; margin: 0 auto; }
.footer { padding: 14px 20px; border-top: 1px solid #eee; text-align: center; color: #666; }
</style>