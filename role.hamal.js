// @ts-ignore
// @ts-ignore
// @ts-ignore
var behavior = require("behavior");

var roleHamal = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        if(creep.ticksToLive < 50 && creep.store.getUsedCapacity() == 0)
        {
            creep.suicide();
            return;
        }

        // @ts-ignore
        var withdrawing  = creep.memory.withdrawing;
        // @ts-ignore
        var transfering = creep.memory.transfering;
        // @ts-ignore
        var resourceType = creep.memory.resourceType;
        // @ts-ignore
        var autoChangeTarget = creep.memory.autoChangeTarget;

        if(withdrawing)
        {
            try {
                // @ts-ignore
                let target = Game.getObjectById(creep.memory.srcId);
                let dst = Game.getObjectById(creep.memory.dstId);

                if(dst && dst.store.getFreeCapacity(resourceType) <= 0)
                {
                    if(autoChangeTarget)
                    {
                        let dstType = dst.structureType;
                        let structures = creep.room.find(FIND_MY_STRUCTURES,{filter:(structure)=>(structure.structureType == dstType && structure.store.getFreeCapacity(resourceType) > 0)});
                        if(structures.length)
                        {
                            creep.memory.dstId = structures[0].id;
                        }
                        else
                        {
                            creep.memory.autoChangeTarget = false;
                            creep.say("Dst Full");
                        }
                    }
                    else creep.say("Dst Full");
                    return;
                }

                // @ts-ignore
                let result = creep.withdraw(target,resourceType);
                if(result == OK || result == ERR_FULL)
                {
                    // @ts-ignore
                    creep.memory.withdrawing = false;
                    return;
                }
                else if(result == ERR_NOT_IN_RANGE)
                {
                    // @ts-ignore
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#f86b1d'}});
                    return;
                }
                // @ts-ignore
                else 
                {
                    if(creep.memory.idleTime == undefined) creep.memory.idleTime  = 0;
                    else creep.memory.idleTime++;
                    
                    creep.say(result + " Idle " + creep.memory.idleTime);
                    if(creep.memory.idleTime > 20)
                    {
                        creep.suicide();
                    }
                }

            } catch (error) {
                creep.say(error);
            }

            return;
        }

        if(transfering)
        {
            try {
                // @ts-ignore
                let target = Game.getObjectById(creep.memory.dstId);
                // @ts-ignore
                let result = creep.transfer(target,resourceType);
                if(result == OK || result == ERR_NOT_ENOUGH_RESOURCES)
                {
                    // @ts-ignore
                    if(target.store.getFreeCapacity(resourceType) > 0)
                    {
                        // @ts-ignore
                        creep.memory.withdrawing = true;
                    }
                    // @ts-ignore
                    else if(!autoChangeTarget) creep.memory.transfering = false;
                    return;
                }
                else if(result == ERR_NOT_IN_RANGE)
                {
                    // @ts-ignore
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#f86b1d'}});
                    return;
                }
                else if(result == ERR_FULL)
                {
                    if(autoChangeTarget)
                    {
                        let dstType = target.structureType;
                        let structures = creep.room.find(FIND_MY_STRUCTURES,{filter:(structure)=>(structure.structureType == dstType && structure.store.getFreeCapacity(resourceType) > 0)});
                        if(structures.length)
                        {
                            creep.memory.dstId = structures[0].id;
                        }
                        else
                        {
                            creep.memory.autoChangeTarget = false;
                            return;
                        }
                    }
                    else
                    {
                        creep.memory.transfering = false;
                    }
                }
                // @ts-ignore
                else creep.say(result);

            } catch (error) {
                creep.say(error);
            }
        }
	}
};

module.exports = roleHamal;