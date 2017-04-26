'use babel';

import PlasmaView from './plasma-view';
import { CompositeDisposable } from 'atom';

export default {

  plasmaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.plasmaView = new PlasmaView(state.plasmaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.plasmaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'plasma:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.plasmaView.destroy();
  },

  serialize() {
    return {
      plasmaViewState: this.plasmaView.serialize()
    };
  },

  toggle() {
    console.log('Plasma was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
