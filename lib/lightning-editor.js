'use babel';

import LightningEditorView from './lightning-editor-view';
import { CompositeDisposable } from 'atom';

export default {

  lightningEditorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lightningEditorView = new LightningEditorView(state.lightningEditorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lightningEditorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lightning-editor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lightningEditorView.destroy();
  },

  serialize() {
    return {
      lightningEditorViewState: this.lightningEditorView.serialize()
    };
  },

  toggle() {
    console.log('LightningEditor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
