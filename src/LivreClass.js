export default class LivreClass {
    constructor(id, titre, qtestock, prix) {
      this._titre = titre;
      this._qtestock = qtestock;
      this._prix = prix;
      this._id = id;
    }
    get titre() {
      return this._titre;
    }
    get id() {
      return this._id;
    }
    get qtestock() {
      return this._qtestock;
    }
    get prix() {
      return this._prix;
    }
  
    pourAfficher() {
      return `--> Titre : ${this._titre} , Quantité en Stock : ${this._qtestock} , Prix : ${this._prix}`;
    }
  }