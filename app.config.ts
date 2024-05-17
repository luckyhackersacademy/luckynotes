export default defineAppConfig({
  name: "Igor's lucky notes",
  description: 'Build & learn in public notes',
  host: 'notes.igorhalfeld.com',

  author: {
    name: 'Igor Halfeld',
    email: 'hello@igorluiz.me',
    twitter: 'igorhalfeld',
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
