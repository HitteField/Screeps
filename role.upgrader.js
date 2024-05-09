var behavior = require("behavior");
var utilities = require('utilities');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        //if(behavior.renewSelf(creep,100)) return;
        
        let targetFlag = creep.memory.targetFlagName;
        if(creep.room.name!=targetFlag)
        {
            creep.moveTo(Game.flags[targetFlag]);
            return;
        }

        // @ts-ignore
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            // @ts-ignore
            creep.memory.upgrading = false;
            //creep.say('🔄 采集');
	    }
	    // @ts-ignore
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        // @ts-ignore
	        creep.memory.upgrading = true;
	        //creep.say('⚡ 升级');
	    }
	    if(!creep.memory.upgrading)
	    {
	        creep.memory.upgrading = false;
	    }

        // // @ts-ignore
        // if(source.energy == 0 && !creep.memory.upgrading)
        // {
        //     // @ts-ignore
	    //     creep.memory.upgrading = true;
	    //     creep.say("🧱 矿空了");
        // }

	    // @ts-ignore
	    if(creep.memory.upgrading) {
            // if(creep.signController(creep.room.controller,"技巧司机不翻车")== ERR_NOT_IN_RANGE)
            // {
            //     // @ts-ignore
            //     creep.moveTo(creep.room.controller);
            // }
            // @ts-ignore
            let result = creep.upgradeController(creep.room.controller);
            //creep.say(result);
            if(result == ERR_NOT_IN_RANGE) {
                // @ts-ignore
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#41ae3c'}});
            }
        }
        else {
            // let sourceIndex = 1;
            // // @ts-ignore
            // if(creep.memory.role == "builder") sourceIndex = 0;

            //if(behavior.pickupResource(creep)) return;

            //if(behavior.withdrawTomb(creep)) return;

            let link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter:(structure)=>{return structure.structureType == STRUCTURE_LINK}});
            // @ts-ignore
            if(link && link.store[RESOURCE_ENERGY] > 0)
            {
                //creep.say("Link!");
                let dist = utilities.CalcDistance(creep.pos,link.pos);
                // @ts-ignore
                if(dist < 20)
                {
                    let result = creep.withdraw(link,RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#41ae3c'}});
                        return;
                    }
                    if(result == OK) return;
                }
                
            }
            
            //if(behavior.pickupResource(creep)) return;

            var terminal = creep.room.terminal;
            //if(terminal && terminal.store[RESOURCE_ENERGY] > terminal.store.getCapacity(RESOURCE_ENERGY) * 0.05)
            if(terminal && terminal.store[RESOURCE_ENERGY] > 20000)
            {
                let result = creep.withdraw(terminal,RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(terminal);
                    return;
                }
                else if(result == OK) return;
            }
			
			//var container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            let storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] > storage.store.getCapacity() * 0.1)
            {
                let result = creep.withdraw(storage,RESOURCE_ENERGY);
                if(result==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#41ae3c'}});
                    return;
                }
                if(result == OK) return;
            }

            // let targetIndex = 0;
            // let container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            // // @ts-ignore
            // if(container.length > 1 && container[1].store[RESOURCE_ENERGY] > (container[0].store[RESOURCE_ENERGY] + 200)) targetIndex = 1;
            // let result2 = creep.withdraw(container[targetIndex],RESOURCE_ENERGY);
            // if(result2==ERR_NOT_IN_RANGE)
            // {
            //     creep.moveTo(container[targetIndex],{reusePath:2});
            // }

            let container = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            if(container)
            {
                let result = creep.withdraw(container,RESOURCE_ENERGY);
                if(result==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#41ae3c'},reusePath:2});
                    //return;
                }
                //if(result == OK) return;
            }
            
            creep.moveTo(Game.flags[targetFlag]);
        }
	}
};

module.exports = roleUpgrader;