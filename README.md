## `🍀luckynotes`

The faster and simpler way to take notes and start learn&build in public

## Why?

I was [looking for a place](https://twitter.com/igorhalfeld/status/1784990933257207847) to do more build&learn in public to show everyone that there's nothing to be afraid of. Build and learn things by sharing videos or blog posts is great to get feedback about what you are doing.

I saw [Atinotes](https://github.com/atinux/atinotes) project, but I didn't want to buy Nuxt UI Pro 🤣, so I built a free version.

## How does this work?

I used the following tools:

- [Nuxt](https://nuxt.com/)
- [Nitro](https://nitro.unjs.io/) (powered by nuxt server routes)
- [Turso](https://turso.tech/)
- [Nuxt UI](https://ui.nuxt.com/)

As you probably noticed, this entire app can run on an edge network 😜, [NuxtAuthUtils](https://github.com/Atinux/nuxt-auth-utils) helped a lot because of the ease of handling user sessions by using hooks.

## Features

- Stupid simple login and logout
- Create new notes
- When you create new notes, they're visible only to you until you publish
- Draft notes can be accessed by the URL
- Publish draft notes and edit markdown directly in the browser
- When you publish a note, you can configure to publish on twitter as well (don't forget to set publishing.twitter to true on app.config.ts)
- RSS feed (`/feed.xml`) automatically generated
- Sitemap (`/sitemap.xml`) automatically generated
- View and like count without the need to login (powered by fingerprintjs)
- And of course, it's possible to delete notes

## How can you set up this by yourself?

I'll need to [fork the code](https://github.com/luckyhackersacademy/luckynotes/) (don't forget to give a star mate haha) and create a Turso account

### To get Turso env vars

```sh
# login with turso from cli
turso auth login

# create database
turso db create YOUR_DATABASE_NAME

# create token (this will give you a token)
turso db tokens create YOUR_DATABASE_NAME

# now you'll get your turso db url and turso token
turso db show YOUR_DATABASE_NAME
```

Now, in the root directory runs `mv .env.example .env` and replaces fake values with real ones.

_you'll need to add an admin password on these var envs as well_

### To put your customization

Edit `app.config.ts` with your info.

## Deploy

As I said, you can deploy it on an edge network. In my case, I'm using Netlify.
