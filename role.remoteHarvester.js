// @ts-ignore
var roleUpgrader = require("role.upgrader");
var behavior = require('behavior');
var utilities = require('utilities');
// @ts-ignore
// @ts-ignore
const { filter } = require('lodash');

var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        //if(behavior.renewSelf(creep,280)) return;

        //creep.say("helloThere",true);

        // @ts-ignore
        if(creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < 200)
        {
            // @ts-ignore
            creep.memory.harvesting = false;
            creep.say('🚚 运输');
        }
        // @ts-ignore
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY]==0)
        {
            // @ts-ignore
            creep.memory.harvesting=true;
            creep.say('🔄 采集')
        }

        // @ts-ignore
        let homePos = Game.flags[creep.memory.homeFlagName].pos;
        let isInHome = creep.pos.roomName==homePos.roomName;
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;

        // @ts-ignore
        if(creep.memory.harvesting) 
        {
            if(behavior.withdrawTomb(creep))
            {
                // @ts-ignore
                if(creep.store[RESOURCE_ENERGY] > 500)  creep.memory.harvesting = false;
                return;
            }
            // @ts-ignore
            var flag = Game.flags[creep.memory.targetFlagName];
            if(creep.room!=flag.room)
            {
                creep.moveTo(flag,{visualizePathStyle: {stroke: '#f86b1d'}});
                return;
            }

            // 舔包
            if(behavior.pickupResource(creep)) return;
            
            var targetIndex = 0;
            var container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            // @ts-ignore
            if(container.length > 1 && container[1].store[RESOURCE_ENERGY] > container[0].store[RESOURCE_ENERGY]) targetIndex = 1;
            try {
                // @ts-ignore
                if(/*container[targetIndex].pos.lookFor(LOOK_CREEPS).length && */container[targetIndex].store[RESOURCE_ENERGY] > creep.store.getFreeCapacity() - 100)
                {
                    let result = creep.withdraw(container[targetIndex],RESOURCE_ENERGY);
                    if(result==ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(container[targetIndex],{visualizePathStyle: {stroke: '#f86b1d'}});
                    }
                }
                else 
                {
                    if(isInHome)
                    {
                        if(terminal && terminal.store[RESOURCE_ENERGY] > terminal.store.getCapacity() * 0.1)
                        {
                            let result = creep.withdraw(terminal,RESOURCE_ENERGY);
                            if(result == ERR_NOT_IN_RANGE) 
                            {
                                creep.moveTo(terminal);
                                return;
                            }
                            else if(result == OK) return;
                        }
                        
                        if(storage)
                        {
                            if(creep.withdraw(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage);
                        }
                    }
                    else creep.moveTo(flag,{visualizePathStyle: {stroke: '#f86b1d'}});
                }
            } catch (error) {
                console.log(creep.id + ' ' + error);
            }
        }
        else 
        {
            
            if(!isInHome)
            {
                //兼职修补
                // if(Game.getObjectById("625d2bc9c6f82b1f0422b61e").store[RESOURCE_ENERGY]!=0)
                //     if(behavior.repairNearbyStructure(creep)) return;

                //兼职建造
                // var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                // if(targets.length) {
                //     var index = 0;
                //     if(creep.build(targets[index]) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(targets[index], {visualizePathStyle: {stroke: '#f9c116'}});
                //     }
                //     return;
                // }

                //回家
                result = creep.moveTo(homePos,{visualizePathStyle: {stroke: '#f86b1d'},reusePath:2});
                return;
            }
            else
            {
                // @ts-ignore
                //let homeFlag = creep.memory.homeFlagName;
                // @ts-ignore
                let link = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(structure)=>{ return structure.structureType == STRUCTURE_LINK && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400}});
                if(link)
                {
                    //creep.say("Link!");
                    let dist = utilities.CalcDistance(creep.pos,link.pos);
                    // @ts-ignore
                    if(dist < 36)
                    {
                        let result = creep.transfer(link, RESOURCE_ENERGY);
                        if(result == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(link, {visualizePathStyle: {stroke: '#fcb70a'}});
                            return;
                        }
                        // @ts-ignore
                        // if(creep.store[RESOURCE_ENERGY] <= 250) 
                        // {
                        //     creep.say("🤔 快见底了");
                        //     // @ts-ignore
                        //     creep.memory.harvesting = true;
                        // }

                        if(result == OK || result == ERR_NOT_IN_RANGE) return;
                    }
                }

                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (/*structure.structureType == STRUCTURE_CONTAINER ||*/
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_LAB ||
                                structure.structureType == STRUCTURE_NUKER ||
                                structure.structureType == STRUCTURE_POWER_SPAWN ||
                                (structure.structureType == STRUCTURE_TOWER && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 200)) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            
                var result;
                if(target) 
                {
                    result = creep.transfer(target, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE || result == OK) 
                    {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#fcb70a'},reusePath:3});
                        return;
                    }
                }
                else if(terminal && terminal.store.getUsedCapacity() < terminal.store.getCapacity() * 0.95)
                {
                    //把东西送到终端
                    result = creep.transfer(terminal, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE || result == OK) 
                    {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#fcb70a'}});
                        return;
                    }
                }
                else if(storage && storage.store.getUsedCapacity() < storage.store.getCapacity())
                {
                    //把东西送到存储器
                    result = creep.transfer(storage, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE || result == OK) 
                    {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#fcb70a'},reusePath:3});
                        return;
                    }
                }
                
                let targetFlag = creep.memory.targetFlagName;
                creep.moveTo(Game.flags[targetFlag]);
                //else roleUpgrader.run(creep);
            }
        }
	}
};

module.exports = roleRemoteHarvester;