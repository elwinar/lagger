# Lagger - Simple log explorer

No-bloat and no-complexity Kibana-like log visualization tool.

## Installation

```
npm install                       # install dependencies
npm exec -- vite build            # bundle the actual application pending artifact
cp config.json dist/config.json   # sample configuration
webfsd -r dist -p 8080 -F         # serve with your prefered HTTP server
```
