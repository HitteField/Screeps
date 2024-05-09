// @ts-ignore
var roleBuilder = require('role.builder');
var roleUpgrader = require("role.upgrader");
var behavior = require('behavior');
var utilities = require('utilities');
// @ts-ignore
const { filter } = require('lodash');

var roleRemoteRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        //if(behavior.renewSelf(creep,280)) return;

        //creep.say("helloThere",true);

        // @ts-ignore
        if(creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY)==0)
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
        if(creep.memory.harvesting) 
        {
            if(behavior.withdrawTomb(creep)) return;

            // @ts-ignore
            var flag = Game.flags[creep.memory.targetFlagName];
            if(creep.room!=flag.room)
            {
                creep.moveTo(flag);
                return;
            }

            // 舔包
            if(behavior.pickupResource(creep)) return;

            
            // 盗墓
            var targetRuin = creep.pos.findClosestByRange(FIND_RUINS,{filter:(ruins)=>ruins.store[RESOURCE_ENERGY] > 0});
            if(targetRuin)
            {
                behavior.withdrawRemains(creep,targetRuin); 
                return;
            }
            
            
            var targetIndex = 0;
            var container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            // @ts-ignore
            if(container.length > 1 && container[1].store[RESOURCE_ENERGY] > container[0].store[RESOURCE_ENERGY]) targetIndex = 1;

            try
            {
                // @ts-ignore
            if(/*container[targetIndex].pos.lookFor(LOOK_CREEPS).length && */container[targetIndex].store[RESOURCE_ENERGY] > creep.store.getFreeCapacity() - 100)
            {
                var result = creep.withdraw(container[targetIndex],RESOURCE_ENERGY);
                if(result==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(container[targetIndex],{visualizePathStyle: {stroke: '#f86b1d'}});
                }
            }
            else creep.moveTo(flag,{visualizePathStyle: {stroke: '#f86b1d'}});
            }
            catch(error)
            {
                console.log(creep.id + ' ' + error);
            }
        }
        else 
        {
            // @ts-ignore
            let homePos = Game.flags[creep.memory.homeFlagName].pos;
            let isInHome = creep.pos.roomName==homePos.roomName;

            //兼职修补  
            if(!isInHome && behavior.repairNearbyStructure(creep)) 
            {
                // @ts-ignore
                if(creep.store[RESOURCE_ENERGY] < 200) creep.memory.harvesting = true;
                return;
            }

            //兼职建造
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                var index = 0;
                if(creep.build(targets[index]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[index], {visualizePathStyle: {stroke: '#f9c116'}});
                }
                return;
            }

            if(!isInHome)
            {
                //回家
                creep.moveTo(homePos,{visualizePathStyle: {stroke: '#fcb70a'}});
            }
            else
            {
                // @ts-ignore
                //if(creep.memory.upgrading) roleUpgrader.run(creep);

                let link = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(structure)=>{ return structure.structureType == STRUCTURE_LINK && structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store[RESOURCE_ENERGY]}});
                if(link)
                {
                    //creep.say("Link!");
                    let dist = utilities.CalcDistance(creep.pos,link.pos);
                    // @ts-ignore
                    if(dist < 40)
                    {
                        let result = creep.transfer(link, RESOURCE_ENERGY);
                        if(result == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(link, {visualizePathStyle: {stroke: '#fcb70a'}});
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
                                (structure.structureType == STRUCTURE_TOWER && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 150)) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                var storage = creep.room.storage;
                //var terminal = creep.room.terminal;
            
                if(target) 
                {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#fcb70a'},reusePath:3});
                    }
                }
                // else if(terminal && terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal.store.getCapacity(RESOURCE_ENERGY) * 0.4)
                // {
                //     //把东西送到终端
                //     if(creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                //     {
                //         creep.moveTo(terminal, {visualizePathStyle: {stroke: '#fcb70a'}});
                //     }
                // }
                else if(storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) < storage.store.getCapacity(RESOURCE_ENERGY))
                {
                    //把东西送到存储器
                    if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#fcb70a'},reusePath:3});
                    }
                }
                else roleUpgrader.run(creep);
            }
        }
	}
};

module.exports = roleRemoteRepairer;