function Hero(name, level) {
    this.name = name;
    this.level = level;
    this.hello = function(){
        console.log(`Hi my name is ${this.name} I am a level ${this.level} Hero.`)
    }
}

function Healer(name, level, spell){
    Hero.call(this, name, level)
    this.spell = spell;
    this.hello = function(){
        console.log(`Hi my name is ${this.name} I am a level ${this.level} Healer.`)
    }
}

function Warrior(name, level, weapon){
    Hero.call(this, name, level);
    this.weapon = weapon;
}

Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

var hero1 = new Hero('Benji', 2);
hero1.hello();

var healer1 = new Healer('Amina', 5, 'heal others')
healer1.hello();

var warrior1 = new Warrior('Bjorn', 18, 'sword') 
warrior1.hello();