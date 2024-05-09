const { filter } = require("lodash");
var behavior = require("behavior");

var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.Powered)
        {
            let lab = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_LAB && structure.store[RESOURCE_CATALYZED_UTRIUM_ACID]});
            if(lab.length)
            {
                let result = lab[0].boostCreep(creep);
                if(result == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(lab[0]);
                    return;
                }
                else
                {
                    creep.say(result);
                    creep.memory.Powered = true;
                }
            }
            else creep.memory.Powered = true;
        }
        
        var _lookFor = creep.pos.lookFor(LOOK_STRUCTURES);
        var inRampart = _lookFor.length && _lookFor[0].structureType == STRUCTURE_RAMPART;

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            if(!inRampart) creep.moveTo(closestHostile);
            creep.attack(closestHostile);
            return;
        }

        var closestHostileBuilding = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter:(structure)=>structure.structureType!=STRUCTURE_SPAWN});
        if(closestHostileBuilding) 
        {
            if(!inRampart) creep.moveTo(closestHostileBuilding);
            creep.attack(closestHostileBuilding);
            return;
        }
	}
};

module.exports = roleSoldier;

