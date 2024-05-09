// @ts-ignore
var roleUpgrader = require("role.upgrader");
var behavior = require('behavior');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        //if(behavior.renewSelf(creep,150)) return;

        //var sourceIndex = 1;
        // @ts-ignore
        // if(creep.memory.role == "builder") 
        // {
        //     var source = creep.room.find(FIND_SOURCES)[0];
        //     sourceIndex = 0;
        // }
        // else var source = creep.room.find(FIND_SOURCES)[1];

        // @ts-ignore
        if(creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < creep.store.getCapacity() * 0.85)
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
        
        if(!creep.memory.lastTarget)
        {
            creep.memory.lastTarget = "others";
        }

        {
            // @ts-ignore
            if(creep.memory.harvesting) 
            {
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
                
                if(container.length > 0)
                {
                    // @ts-ignore
                    if(container.length > 1 && container[1].store[RESOURCE_ENERGY] > (container[0].store[RESOURCE_ENERGY])) targetIndex = 1;
                    
                    if(container[targetIndex].store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(RESOURCE_ENERGY) - 200)
                    {
                        let result = creep.withdraw(container[targetIndex],RESOURCE_ENERGY);
                        if(result==ERR_NOT_IN_RANGE || result == OK)
                        {
                            creep.moveTo(container[targetIndex], {visualizePathStyle: {stroke: '#ffffff'}});
                            return;
                        }
                    }
                
                }

                let terminal = creep.room.terminal;
                if(terminal && terminal.store[RESOURCE_ENERGY] > terminal.store.getCapacity(RESOURCE_ENERGY) * 0.1)
                //if(terminal && terminal.store[RESOURCE_ENERGY] > 0)
                {
                    let result = creep.withdraw(terminal,RESOURCE_ENERGY);
                    if(result==ERR_NOT_IN_RANGE || result == OK)
                    {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
                
                let storage = creep.room.storage;
                if(storage)
                {
                    let result = creep.withdraw(storage,RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE || result == OK) 
                    {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
                
                // 啥都没有，采个勾八
                creep.memory.harvesting = false;
                
                //behavior.harvestTarget(creep,Game.getObjectById(creep.memory.targetSourceId),Game.flags[creep.memory.targetFlagName]);
            }
            else 
            {
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (/*structure.structureType == STRUCTURE_CONTAINER ||*/
                                (structure.structureType == STRUCTURE_TOWER &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 700)  ||
                                (structure.structureType == STRUCTURE_SPAWN &&
                                structure.store[RESOURCE_ENERGY] <= 260) ||
                                structure.structureType == STRUCTURE_EXTENSION ) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
        
                //把东西送到能量站
                var result = creep.transfer(target, RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    return;
                }
                else if(result == OK)
                {
                    creep.memory.lastTarget = "others";
                    return;   
                }

                //------------------

                let labs = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>{
                    return (structure.structureType == STRUCTURE_LAB && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 200 )}});

                if(labs.length)
                {
                    if(creep.transfer(labs[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(labs[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }

                //------------------

                let tower = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>{
                    return (structure.structureType == STRUCTURE_TOWER && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 200 )}});

                if(tower.length)
                {
                    if(creep.transfer(tower[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }

                //-------------------

                let storage = creep.room.storage;
                let terminal = creep.room.terminal;
                let controller = creep.room.controller;
                let terminalRatio = creep.memory.lastTarget == "terminal" ? 0.9 : 0.95;
                //let storageRatio = creep.memory.lastTarget == "storage" ? 0.9 : 1;
                let storageRatio = 1;
                // @ts-ignore
                if(controller.level >= 4 && storage && storage.store.getUsedCapacity() < storage.store.getCapacity() * storageRatio)
                {
                    //把东西送到存储器
                    result = creep.transfer(storage, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#dcdc9f'}});
                        return;
                    }
                    else if(result == OK)
                    {
                        creep.memory.lastTarget = "storage";
                        return;   
                    }
                }
                //如果采集完了发现没有能量站需要，就去存起来
                if(controller.level >= 6 && terminal && terminal.store.getUsedCapacity() < terminal.store.getCapacity() * terminalRatio)
                {
                    //把东西送到终端
                    result = creep.transfer(terminal, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#dcdc9f'}});
                        return;
                    }
                    else if(result == OK)
                    {
                        creep.memory.lastTarget = "terminal";
                        return;   
                    }
                }
                
                //roleUpgrader.run(creep);
                //roleBuilder.run(creep);
            }
        }
	}
};

module.exports = roleHarvester;