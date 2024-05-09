const { filter } = require("lodash");
var behavior = require("behavior");

var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(!creep.memory.Powered)
        {
            let lab = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_LAB && (structure.store["XLHO2"] >= 30 || structure.store["LHO2"] >= 30 || structure.store["LO"] >= 30) && (structure.store[RESOURCE_ENERGY] >= 20)});
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

         var followTarget = Game.creeps(creep.memory.followTargetName);

         if(followTarget)
         {
            creep.moveTo(followTarget);

            let selfHealth = creep.hits / creep.hitsMax;
            let targetHealth = followTarget.hits / followTarget.hitsMax;

            if(selfHealth >= targetHealth)
            {
                creep.heal(creep);
            }
            else
            {
                creep.heal(followTarget);
            }
         }
         else
         {
            creep.heal(creep);
            
            var targetFlag = Game.flags[creep.memory.targetFlagName];
            if(targetFlag || targetFlag.room || targetFlag.room!=creep.room)
            {
                creep.moveTo(targetFlag,{visualizePathStyle: {stroke: '#ff0000'}});
                return;
            }
         }
	}
};

module.exports = roleHealer;

