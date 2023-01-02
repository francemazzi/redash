# Welcome in my Remix project!

Ti presenta una dashboard per la richiesta di mentorship.
Ci sono vari mentor disponibile (nome, cognome, esperienza) con questi è possibile fissare delle ore pagate in token ‘ore/lavoro’). I token si possono acquisire solo lavorando o rispondendo per dare mentorship. Inoltre in base all’utilizzo dell’applicazione (pubblicazione di task nel proprio team, segnare ore di lavoro ecc.) i token vengono caricati.

Il valore del token è pari a 1 ora lavoro per ogni ora si lavoro. Questo può essere suddiviso in minuti e secondi.

Funzionalità:

- registrazione: dati personali, wallet, esperienza, skill
- Creare team
  - creare task
  - assegnare task
  - vedere disponibilità sul calendario
- Fissare le ore lavoro del team in base al task (come Clockify)
- scegliere i mentor, fissare call con loro
- Token se si lavora (quindi si segnano le ore di lavoro) vengono distribuiti.
- chat privata

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
