# Claire Ongley — profile site

A small, single-page profile site: a mix of work (AI agent training and
builds at Inner West Council) and personal (crafting, gaming), with a
block-pattern divider between sections coloured from an actual Blue
Lily Bargello quilt fabric pull.

Note: this README documents the repo for your own reference - it
won't show up on the published site itself, only on the GitHub repo
page.

## About this site

One scrolling page, five sections:

- **Hero** — name and a short intro.
- **Work** — what you do at Inner West Council: training, agent
  builds, the technical hub.
- **Crafting** — current quilting and knitting projects.
- **Gaming** — what you're playing right now.
- **Say hi** — email, GitHub, LinkedIn.

The colour-block dividers between sections aren't just decoration -
each is three horizontal stripes of blocks, tapering in thickness
top to bottom, using colours sampled from the real crimson-to-navy
fabric pull behind the Blue Lily Bargello quilt. They're static SVG,
so no JavaScript is needed to render them.

## Files

- `index.html` — page content and structure
- `style.css` — colours, type, layout
- `divider.svg` — the block-pattern divider, referenced three times via `<img>`
