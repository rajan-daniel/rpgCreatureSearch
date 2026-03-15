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

async function update(cIdName) {
    const currentMonster = await getData(cIdName);
    if (!currentMonster) return;

    const statsMap = {};
    currentMonster.stats.forEach(stat => {
        statsMap[stat.name] = stat.base_stat;
    });

    // update elements after search
    cName.textContent = currentMonster.name;
    id.textContent = currentMonster.id;
    weight.textContent = currentMonster.weight;
    height.textContent = currentMonster.height;
    types.textContent = currentMonster.types.map(t => t.name).join(" ");;
    hp.textContent = statsMap.hp;
    attack.textContent = statsMap.attack;
    defense.textContent = statsMap.defense;
    specialAttack.textContent = statsMap["special-attack"];
    specialDefense.textContent = statsMap["special-defense"];
    speed.textContent = statsMap.speed;
}

searchBtn.addEventListener("click", () => update(searchInput.value));