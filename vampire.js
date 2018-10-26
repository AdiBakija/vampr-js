class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let currentVampire = this.numberOfVampiresFromOriginal;
    let otherVampire = vampire.numberOfVampiresFromOriginal;
    if (currentVampire < otherVampire) {
      return true;
    } else if (currentVampire > otherVampire) {
      return false;
    } else {
      console.log("They are cousins!");
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if(this.name == name) {
      return this;
    } else if (this.offspring.length != 0) {
      let result = null;
      for(let i = 0; result === null && i < this.offspring.length; i++){
        result = this.offspring[i].vampireWithName(name);
      }
      return result;
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampires = 0; // 1

    for (const vampire of this.offspring) {
      totalVampires += vampire.totalDescendents;
      totalVampires++;
    }

    return totalVampires;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = []; // 1

    if (this.yearConverted > 1980) {
      millenials.push(this); // 2
    }

    for (const childVampire of this.offspring) {
      const vampiresThatAreMillenials = childVampire.allMillennialVampires; // 3
      millenials = millenials.concat(vampiresThatAreMillenials);
    }

    return millenials;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

const original = new Vampire("Original", 1350);
  const bart    = new Vampire("Bart", 1500);
  const ansel   = new Vampire("Ansel", 1550);
    const elgort = new Vampire("Elgort", 1985);
      const andrew = new Vampire("Andrew", 1995);
    const sarah = new Vampire("Sarah", 1987);
  const dracula = new Vampire("Dracula", 1450);
    const alisa = new Vampire("Alisa", 1996);
original.addOffspring(ansel);
original.addOffspring(bart);
original.addOffspring(dracula);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);
dracula.addOffspring(alisa);

console.log(original.allMillennialVampires);

module.exports = Vampire;

