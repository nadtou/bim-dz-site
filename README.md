# BIM-DZ · L'Architecture Augmentée

Plateforme officielle BIM-DZ : formations Revit & C#, plugins sur mesure et agents IA pour les architectes.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3.4 + tailwindcss-animate
- lucide-react

## Pages

- **Accueil** — présentation des trois piliers (Académie BIM, Outils & Plugins, Design & IA)
- **Formations** — catalogue de cours (Masterclass API Revit & C#, Dynamo, Coordination BIM)
- **Outils & Plugins** — services B2B (plugins Revit, agents IA, gabarits)
- **Espace Client** — tableau de bord (licences, formations, téléchargements)

## Démarrage local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production → dist/
npm run preview  # serve le build de prod
```

## Note Windows

Les scripts `npm` invoquent Vite via `node ./node_modules/vite/bin/vite.js` plutôt que par le bin shim, parce que `cmd.exe` interprète le caractère `^` du chemin parent comme un échappement, ce qui casse la résolution de modules de npm.
