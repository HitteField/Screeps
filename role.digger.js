// @ts-ignore
// @ts-ignore
var roleUpgrader = require("role.upgrader");
// @ts-ignore
var behavior = require('behavior');

var roleDigger = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        // @ts-ignore
        if((creep.memory.harvesting && creep.store.getFreeCapacity()==0)||creep.ticksToLive < 50)
        {
            // @ts-ignore
            creep.memory.harvesting = false;
            creep.say('🚚 运输');
        }
        // @ts-ignore
        if(!creep.memory.harvesting && creep.store.getUsedCapacity()==0)
        {
            // @ts-ignore
            creep.memory.harvesting=true;
            creep.say('🔄 挖掘')
        }

        // @ts-ignore
        if(creep.memory.harvesting)
        {
            // 盗墓
            // let roomMineral = creep.room.find(FIND_MINERALS);
            // if(roomMineral.length)
            // {
            //     let resType = roomMineral[0].mineralType;
            //     let targetRuin = creep.pos.findClosestByRange(FIND_RUINS,{filter:(ruins)=>ruins.store[resType] > 0});
            //     if(targetRuin)
            //     {
            //         behavior.withdrawMineRemains(creep,targetRuin,resType); 
            //         return;
            //     }
            // }
            
            let mineral = creep.room.find(FIND_MINERALS);
            if(mineral.length)
            {
                let result = creep.harvest(mineral[0]);
                if(result == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(mineral[0]);
                    return;
                }
                else if(result == OK || result == ERR_TIRED) return;
            }
            
            //let targetFlag = creep.memory.targetFlagName;
            //creep.moveTo(Game.flags[targetFlag]);
        }
        else
        {
            let terminal = creep.room.terminal;
            if(terminal)
            {
                for(const resourceType in creep.store)
                {
                    if(terminal.store.getUsedCapacity(resourceType) < terminal.store.getCapacity() * 0.5)
                    {
                        //把东西送到终端
                        // @ts-ignore
                        let result = creep.transfer(terminal, resourceType);
                        if(result == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#fcb70a'}});
                            return;
                        }
                        else if(result == OK) return;
                        
                    }
                }
            }
            
            let storage = creep.room.storage;
            if(storage)
            {
                //把东西送到存储器
                for(const resourceType in creep.store)
                {
                    // @ts-ignore
                    let result = creep.transfer(storage, resourceType);
                    if(result == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#fcb70a'}});
                    }
                }
            }
            else creep.say("🐟 发呆呆");
        }
        
	}
};

module.exports = roleDigger;