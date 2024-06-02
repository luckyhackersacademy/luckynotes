export default defineAppConfig({
  name: "João's lucky notes",
  description: "Build & learn in public notes",
  host: "notes.jopcmelo.dev",

  author: {
    twitter: "jopcmelo",
  },

  // auto publish notes configs
  publishing: {
    twitter: true,
  },

  header: {
    title: 'Hi there 👋',
    description: 'Welcome to my notes! here I share my thoughts, ideas, and learnings.',
  },

  ui: {
    primary: 'cyan',
  },
})
