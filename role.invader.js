const { filter } = require("lodash");
var behavior = require("behavior");

var roleInvader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(!creep.memory.Powered)
        {
            let lab = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_LAB && (structure.store["XUH2O"] >= 30 || structure.store["UH2O"] >= 30 || structure.store["UH"] >= 30) && (structure.store[RESOURCE_ENERGY] >= 20)});
            if(lab.length)
            {
                let result = lab[0].boostCreep(creep);
                creep.say("Boost: " + result);
                if(result == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(lab[0]);
                    return;
                }
                else if(result == OK)
                {
                    creep.memory.Powered = true;
                }
            }
            else creep.memory.Powered = true;
        }

        if(!creep.memory.PoweredTough)
        {
            let lab = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_LAB && (structure.store["XGHO2"] >= 30 || structure.store["GHO2"] >= 30 || structure.store["GO"] >= 30) && (structure.store[RESOURCE_ENERGY] >= 20)});
            if(lab.length)
            {
                let result = lab[0].boostCreep(creep);
                creep.say("Boost: " + result);
                if(result == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(lab[0]);
                    return;
                }
                else if(result == OK)
                {
                    creep.memory.PoweredTough = true;
                }
            }
            else creep.memory.PoweredTough = true;
        }

         // @ts-ignore
        var targetFlag = Game.flags[creep.memory.targetFlagName];
        if(targetFlag || targetFlag.room || targetFlag.room!=creep.room)
        {
            creep.moveTo(targetFlag,{visualizePathStyle: {stroke: '#ff0000'}});
            return;
        }

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(closestHostile,{visualizePathStyle: {stroke: '#ff0000'}});
            }
            return;
        }

        var closestHostileBuilding = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter:(structure)=>(structure.structureType!=STRUCTURE_CONTROLLER && structure.structureType!=STRUCTURE_ROAD)});
        if(closestHostileBuilding) {
            if(creep.attack(closestHostileBuilding) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(closestHostileBuilding,{visualizePathStyle: {stroke: '#ff0000'}});
            }
            return;
        }

        var controller = creep.room.controller;

        // if(creep.signController(creep.room.controller,"Please keep a safe distance")== ERR_NOT_IN_RANGE)
        // {
        //     // @ts-ignore
        //     creep.moveTo(creep.room.controller);
        // }

        var result = creep.attackController(controller);
        if(result == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(controller,{visualizePathStyle: {stroke: '#ff0000'}});
            return;
        }

        creep.moveTo(targetFlag,{visualizePathStyle: {stroke: '#ff0000'}});
	}
};

module.exports = roleInvader;

