/// <reference types="vite/client" />

declare module 'world-atlas/countries-110m.json' {
  import { Topology } from 'topojson-specification';
  const topology: Topology;
  export default topology;
}
