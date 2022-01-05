const readlineSync = require('readline-sync');

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
};

const player = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
    let number;
    let health;
    let monsterCooldown1 = 0;
    let monsterCooldown2 = 0;
    let playerCooldown1 = 0;
    let playerCooldown2 = 0;
    let playerCooldown3 = 0;
    
    console.log('Начальное здоровье равно 10. Хотите изменить?\n1. Да\n2. Нет');
    number = readlineSync.question('--> ');
    number = parseInt(number);
    
    if (number === 1) {
        console.log('\n\nВведите начальное здоровье');
        health = readlineSync.question('--> ');

        monster.maxHealth = health;
        player.maxHealth = health;
    }
    
    while (monster.maxHealth > 0 && player.maxHealth > 0) {
        let randomNumber;
        let numberPlayer;
        
        do {
            randomNumber = getRandom(0,2);
            //console.log(randomNumber);
        } while ((randomNumber === 1 && monsterCooldown1 > 0 && monsterCooldown1 < 3) || (randomNumber === 2 && monsterCooldown2 > 0 && monsterCooldown2 < 2));

        if (monsterCooldown1 > 0 && monsterCooldown1 < 3) {
            monsterCooldown1++;
        } else if (monsterCooldown1 === 3) {
            monsterCooldown1 = 0;
        }

        if (monsterCooldown2 > 0 && monsterCooldown2 < 2) {
            monsterCooldown2++;
        } else if (monsterCooldown2 === 2) {
            monsterCooldown2 = 0;
        }
        
        switch (randomNumber) {
            case 1:
                if (monsterCooldown1 === 0) {
                    monsterCooldown1++;
                }
                break;
            case 2:
                if (monsterCooldown2 === 0) {
                    monsterCooldown2++;
                }
                break;
            default:
                break;
        }
        
        console.log('\n\nДействие Лютого: ' + monster.moves[randomNumber].name);

        console.log('\nВыберите действие:\n1. Удар боевым кадилом;\n2. Вертушка левой пяткой;\n3. Каноничный фаербол;\n4. Магический блок.');

        numberPlayer = readlineSync.question('--> ');
        numberPlayer = parseInt(numberPlayer);
        
        while ((numberPlayer === 2 && playerCooldown1 > 0 && playerCooldown1 < 4) || (numberPlayer === 3 && playerCooldown2 > 0 && playerCooldown2 < 3) || (numberPlayer === 4 && playerCooldown3 > 0 && playerCooldown3 < 4)) {
            console.log('\nВы пока еще не можете выбрать это действие.');
            numberPlayer = readlineSync.question('--> ');
            numberPlayer = parseInt(numberPlayer);
        }

        if (playerCooldown1 > 0 && playerCooldown1 < 4) {
            playerCooldown1++;
        } else if (playerCooldown1 === 4) {
            playerCooldown1 = 0;
        }

        if (playerCooldown2 > 0 && playerCooldown2 < 3) {
            playerCooldown2++;
        } else if (playerCooldown2 === 3) {
            playerCooldown2 = 0;
        }

        if (playerCooldown3 > 0 && playerCooldown3 < 4) {
            playerCooldown3++;
        } else if (playerCooldown3 === 4) {
            playerCooldown3 = 0;
        }

        switch (numberPlayer-1) {
            case 1:
                if (playerCooldown1 === 0) {
                    playerCooldown1++;
                }
                break;
            case 2:
                if (playerCooldown2 === 0) {
                    playerCooldown2++;
                }
                break;
            case 3:
                if (playerCooldown3 === 0) {
                    playerCooldown3++;
                }
                break;
            default:
                break;
        }
        
        player.maxHealth = player.maxHealth - (monster.moves[randomNumber].physicalDmg - (player.moves[numberPlayer-1].physicArmorPercents / 100 * monster.moves[randomNumber].physicalDmg )) - (monster.moves[randomNumber].magicDmg - (player.moves[numberPlayer-1].magicArmorPercents / 100 * monster.moves[randomNumber].magicDmg));
        monster.maxHealth = monster.maxHealth - (player.moves[numberPlayer-1].physicalDmg - (monster.moves[randomNumber].physicArmorPercents / 100 * player.moves[numberPlayer-1].physicalDmg)) - (player.moves[numberPlayer-1].magicDmg - (monster.moves[randomNumber].magicArmorPercents / 100 * player.moves[numberPlayer-1].magicDmg));
    
        if (player.maxHealth > 0) {
            console.log('\nВаше здоровье: ' +player.maxHealth.toFixed(1));
        }
        if (monster.maxHealth > 0) {
            console.log('Здоровье Лютого: ' + monster.maxHealth.toFixed(1));
        }
    }
    
    if (monster.maxHealth < player.maxHealth) {
        console.log('\n\nВы выиграли!');
    } else {
        console.log('\n\nВы проиграли.');
    }
}

game();