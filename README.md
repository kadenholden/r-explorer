# R-Explorer

Interactive 3D explorer for a Volkswagen Golf R Mk7 (2014–2017, EA888
Gen 3) — exploded views, part selection, and per-part technical data,
built phase by phase from the [technical dossier](docs/golf-r-mk7-dossier.md).

**Live app:** https://kadenholden.github.io/r-explorer/ (deploys from
`main` via GitHub Actions)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
```

Project conventions live in [CLAUDE.md](CLAUDE.md); current status in
[PROGRESS.md](PROGRESS.md).

## Credits

Body shell mesh derived from `vw_golf.glb` in
[dong123123123/model](https://github.com/dong123123123/model)
(draco-compressed 83 MB → 2.6 MB, palette recoloured white for this
personal-use project). All procedural geometry and data are original.
