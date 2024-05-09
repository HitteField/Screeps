const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleSoldier = require('role.soldier');
const roleInvader = require('role.invader');
const roleHealer = require('role.healer');
const roleRemoteHarvester = require('role.remoteHarvester');
const roleRemoteRepairer = require('role.remoteRepairer');
const roleClaimer = require('role.claimer');
const roleMiner = require('role.miner');
const roleDigger = require('role.digger');
const roleHamal = require('role.hamal');
const structTower = require('struct.tower');
const structLink = require('struct.link');

const control = require('control');
// @ts-ignore
const behavior = require('behavior');

/**@param {Creep} creep @param {string} content */
global.sign = function(creep,content)
{
    return creep.signController(creep.room.controller,content);
}

global.getTime = function()
{
    return new Date().getHours();
}

/**@param {Creep} creep*/
global.printStore = function(creep)
{
    return JSON.stringify(creep.store);
}

/**@param {string} homeFlag */
global.spawnHamal = function(homeFlag)
{
    return control.spawnNewHamal(homeFlag);
}

global.spawnHamalCmd = function(homeFlag,srcId,dstId,resourceType,autoChangeTarget)
{
    return control.spawnNewHamalCmd(homeFlag,srcId,dstId,resourceType,autoChangeTarget);
}

global.cmdHamal = function(id,srcId,dstId,resourceType,autoChangeTarget)
{
    var creep = Game.getObjectById(id);
    // @ts-ignore
    if(creep.memory.role != 'hamal') return -1;
    // @ts-ignore
    creep.memory.srcId = srcId;
    // @ts-ignore
    creep.memory.dstId = dstId;
    // @ts-ignore
    creep.memory.resourceType = resourceType;
    // @ts-ignore
    creep.memory.withdrawing = true;
    // @ts-ignore
    creep.memory.transfering = true;
    // @ts-ignore
    creep.memory.autoChangeTarget = autoChangeTarget;
    return 0;
}

global.changeHamalTarget = function(id,dstId)
{
    var creep = Game.getObjectById(id);
    if(creep.memory.role != 'hamal') return -1;
    creep.memory.dstId = dstId;
    return 0;
}

global.summonInvader = function(homeFlag)
{
    var spawnName;
    var backupSpawnName;
    if(homeFlag == "E53S48")
    {
        spawnName = "LeoSpawn";
        backupSpawnName = "LeoSpawn_backup";
    }
    else if(homeFlag == "E52S47")
    {
        spawnName = "LeoSpawn2";
        backupSpawnName = "LeoSpawn2_backup";
    }
    else if(homeFlag == "E54S49")
    {
        spawnName = "LeoSpawn3";
        backupSpawnName = "LeoSpawn3_backup";
    }
    else if(homeFlag == "E52S48")
    {
        spawnName = "LeoSpawn4";
        backupSpawnName = "LeoSpawn4_backup";
    }


    var isSpawning = Game.spawns[spawnName].spawning || Game.spawns[backupSpawnName].spawning;
    if(isSpawning) return 1;

    var invaderComponents = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                            ];  // 2200
    var healerComponents = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL
                            ];  // 3200

    var result;

    var targetFlag = "WarTarget";

    var invaderName = 'Friend_' + (Memory.creepNum);
    result = Game.spawns[spawnName].spawnCreep(invaderComponents, invaderName,{memory:{role:"invader",targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false,Powered:false,PoweredTough:false}});
    console.log(homeFlag + ":Generate invader:" + result);
    if(result == OK)
    {
        Memory.creepNum++;
    }
    else return result;

    var healerName = 'Buddy_' + (Memory.creepNum);
    result = Game.spawns[backupSpawnName].spawnCreep(healerComponents, healerName,{memory:{role:"healer",targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false,Powered:false,PoweredTough:false,followTargetName:invaderName}});
    console.log(homeFlag + ":Generate healer:" + result);
    if(result == OK)
    {
        Memory.creepNum++;
    }
    else return result;

    return 0;
}

module.exports.loop = function () {
    // Memory.remoteState["HarvesterNum"] = Memory.HarvesterNum;
    // Memory.remoteState["SoldierNum"] = Memory.SoldierNum;
    // Memory.remoteState["BuilderNum"] = Memory.BuilderNum;
    // Memory.remoteState["UpgraderNum"] = Memory.UpgraderNum;
    // Memory.remoteState["InvaderNum"] = Memory.InvaderNum;
    // Memory.roomState["E53S48"] = Memory.remoteState;
    
    // Memory.roomState["E53S48"].MinerNum = 2;
    // Memory.roomState["E52S47"].MinerNum = 2;
    // Memory.roomState["E54S49"].MinerNum = 2;
    // Memory.roomState["E52S48"].MinerNum = 2;

    // Memory.roomState["E52S48"] = {
    //     "HarvesterNum":0,
    //     "SoldierNum":0,
    //     "BuilderNum":0,
    //     "UpgraderNum":1,
    //     "InvaderNum":0,
    //     "E52S48":{"remoteHarvester":1,"remoteRepairer":1,"claimer":1,"miner":1}
    // }
    //Memory.roomState["E52S47"]["E52S48"] = {"remoteHarvester":1,"remoteRepairer":1,"claimer":0,"miner":1}

    //@ts-ignore
    // let lastInvader = Game.getObjectById(Memory.lastInvader);
    // // @ts-ignore
    // if(!lastInvader || (!lastInvader.spawning && lastInvader.ticksToLive < 200))
    // {
    //     let result = control.spawnNewInvader("WarTarget");
    //     if(result)
    //     {
    //         // @ts-ignore
    //         Memory.lastInvader = Game.creeps[Game.spawns["LeoSpawn"].spawning.name].id;
    //         console.log("FRIENDLY ATTACK!")
    //     }
    // }

    //Game.market.createOrder({type:ORDER_SELL,resourceType:CPU_UNLOCK,price:47999998.233,totalAmount:2})
    //Game.market.createOrder({type:ORDER_SELL,resourceType:PIXEL,price:24000,totalAmount:40})
    //Game.market.createOrder({type:ORDER_BUY,resourceType:RESOURCE_ENERGY,price:4.9,totalAmount:2500000,roomName:"E53S48"})

    if(Game.cpu.bucket == 10000) 
    {
        Game.cpu.generatePixel();
        //Game.notify("生成了一枚Pixel");
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    control.showInformation("LeoSpawn");
    control.showInformation("LeoSpawn2");  
    control.showInformation("LeoSpawn3");
    control.showInformation("LeoSpawn4");

    // let towers_LeoSpawn = Game.spawns["LeoSpawn"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_TOWER});
    // let towers_LeoSpawn2 = Game.spawns["LeoSpawn2"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_TOWER});
    // let towers_LeoSpawn3 = Game.spawns["LeoSpawn3"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_TOWER});
    // towers_LeoSpawn = towers_LeoSpawn.concat(towers_LeoSpawn2).concat(towers_LeoSpawn3);
    // for(let i in towers_LeoSpawn)
    // {   
    //     //console.log(towers_LeoSpawn[i].id);
    //     // @ts-ignore
    //     structTower.run(towers_LeoSpawn[i]);
    //     if(towers_LeoSpawn[i].hits<towers_LeoSpawn[i].hitsMax)
    //     {
    //         if(towers_LeoSpawn[i].room.controller.safeMode == undefined && towers_LeoSpawn[i].room.find(FIND_HOSTILE_CREEPS).length > 0)
    //         {
    //             // @ts-ignore
    //             var msg = towers_LeoSpawn[i].room.controller.activateSafeMode();
    //             console.log("Active safemode with result:" + msg);
    //             Game.notify("We are under attack ,thus the safemode is activated.");
    //         }
    //     }
    // }

    // let links_LeoSpawn = Game.spawns["LeoSpawn"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_LINK});
    // let links_LeoSpawn2 = Game.spawns["LeoSpawn2"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_LINK});
    // let links_LeoSpawn3 = Game.spawns["LeoSpawn3"].room.find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_LINK});
    // links_LeoSpawn = links_LeoSpawn.concat(links_LeoSpawn2).concat(links_LeoSpawn3);
    // for(let i in links_LeoSpawn)
    // {
    //     // @ts-ignore
    //     structLink.run(links_LeoSpawn[i]);
    // }   

    control.maintainCreepNum("E53S48");
    control.maintainCreepNum("E52S47");
    control.maintainCreepNum("E54S49");
    control.maintainCreepNum("E52S48");
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // @ts-ignore
        var role = creep.memory.role;

        //creep.memory.homeFlagName = "E53S48";

        // @ts-ignore
        // if(!creep.spawning && !(role == "soldier" || role == "invader" || role == "remoteHarvester" || role == "remoteRepairer" || role == "claimer" || role == "miner") && creep.store[RESOURCE_ENERGY]<=12 && behavior.recycleSelf(creep,50)) 
        // {
        //     console.log(creep.name + " is recycling");
        //     //creep.suicide();
        //     continue;
        // }

        if(!creep.spawning && (role == "remoteHarvester" || role == "remoteRepairer" || role == "claimer" || role == "miner") && (creep.ticksToLive == 50 || creep.hits < 200) && !creep.memory.isdying)
        {
            // @ts-ignore
            var targetFlag = creep.memory.targetFlagName;
            // @ts-ignore
            var homeFlag = creep.memory.homeFlagName;
            // @ts-ignore
            (Memory.roomState[homeFlag][targetFlag])[role] -= 1;
            console.log(homeFlag + ":" + creep.name + " is dying");

            // @ts-ignore
            creep.memory.isdying = true;

            //creep.suicide();

            //continue;
        }

        if(role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(role == "miner")
        {
            roleMiner.run(creep);
        }
        else if(role == "digger")
        {
            roleDigger.run(creep);
        }
        else if(role == "hamal")
        {
            roleHamal.run(creep);
        }
        else if(role == 'soldier') {
            roleSoldier.run(creep);
        }
        else if(role == 'invader') {
            roleInvader.run(creep);
        }
        else if(role == 'healer') {
            roleHealer.run(creep);
        }
        else if(role == 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
        else if(role == "remoteRepairer"){
            roleRemoteRepairer.run(creep);
        }
        else if(role == "claimer"){
            roleClaimer.run(creep);
        }
    }
    
    if(Game.time % 50 == 0)
    {
        console.log("Try create order in this tick");
        behavior.createMarketOrder('E53S48');
        behavior.createMarketOrder('E52S47');
        behavior.createMarketOrder('E54S49');
        behavior.createMarketOrder('E52S48');
    }
   
}