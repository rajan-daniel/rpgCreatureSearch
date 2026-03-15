const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const cName = document.getElementById("creature-name");
const id = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

let creatureData = [];

async function getData(cIdName) {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${cIdName}`);
        const data = await res.json();
        creatureData = data;
        return data;
    } catch (error) {
        alert("Creature not found");
        console.error("Failed to fetch creatures:", error);
    }
}

function prepData(creatureData) {
    const { id, name, weight, height, special, stats, types } = creatureData;

    const statsMap = {};
    stats.forEach(stat => {
        statsMap[stat.name] = stat.base_stat;
    });

    console.log({ id, name, weight, height, types, statsMap, special });
};

function update(cIdName) {
    const currentMonster = await (getData(cIdName).then(creature => { if (creature) { prepData(creature); } }));
    console.log(currentMonster);

    // update elements after search
    cName.textContent = currentMonster.name;
    id.textContent = currentMonster.id;
    weight.textContent = currentMonster.weight;
    height.textContent = currentMonster.height;
    types.textContent = currentMonster.types;
    hp.textContent = currentMonster.hp;
    attack.textContent = currentMonster.attack;
    defense.textContent = currentMonster.defense;
    specialAttack.textContent = currentMonster.specialAttack;
    specialDefense.textContent = currentMonster.specialDefense;
    speed.textContent = currentMonster.speed;
}

searchBtn.addEventListener("click", () => update(searchInput.value));