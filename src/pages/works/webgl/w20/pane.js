import { filmer } from '../../../../common/filmer'
import { Pane } from 'tweakpane';
import * as TweakpaneEssentialsPlugin from '@tweakpane/plugin-essentials'

const pane = new Pane();
pane.registerPlugin(TweakpaneEssentialsPlugin);

const fpsGraph = pane.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
});

filmer.add({ id: 'fpsStart', update: () => fpsGraph.begin(), order: -Infinity });
filmer.add({ id: 'fpsEnd', update: () => fpsGraph.end(), order: Infinity });

export default pane;
