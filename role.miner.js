// @ts-ignore
// @ts-ignore
// @ts-ignore
var behavior = require('behavior');

var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        // @ts-ignore
        let targetFlag = creep.memory.targetFlagName;
        if(creep.room.name!=targetFlag)
        {
            creep.moveTo(Game.flags[targetFlag]);
            return;
        }

        // @ts-ignore
        if(!creep.memory.harvesting)
        {
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            var source;
            
            if(!container)
            {
                container = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            }
            
            if(!container)
            {
                source = creep.pos.findClosestByRange(FIND_SOURCES);
                
                let test = PathFinder.search(creep.pos,source);
                if(test.incomplete)
                {
                    creep.memory.path = test.path;
                    source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE,{filter:(s)=>s!=source});
                }
                
                // @ts-ignore
                creep.memory.targetSourceId = source.id;
            }
            else{
                source = container.pos.findClosestByRange(FIND_SOURCES);
                let _creep = container.pos.lookFor(LOOK_CREEPS);

                if(_creep.length && _creep[0] != creep)
                {
                    container = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER && structure!=container});
                    
                    if(!container)
                    {
                        container = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER && structure!=container});
                    }
                    
                    if(!container)
                    {
                        source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE,{filter:(s)=>s!=source});
                        if(!source)
                        {
                            creep.moveTo(Game.flags[targetFlag]);
                            return;
                        }
                        // @ts-ignore
                        creep.memory.targetSourceId = source.id;
                    }
                    else
                    {
                        source = container.pos.findClosestByRange(FIND_SOURCES_ACTIVE,{filter:(s)=>s!=source});
                    }
                }
                try {
                    // @ts-ignore
                    creep.memory.targetSourceId = source.id;
                } catch (error) {
                    console.log(creep.id + ' ' + error);
                }
            }
            //console.log(source.id + " " + container.id);

            // @ts-ignore
            let result = creep.harvest(source);
            if(result == ERR_NOT_IN_RANGE || result == ERR_NOT_ENOUGH_RESOURCES)
            {
                if(container)
                {
                    creep.moveTo(container,{visualizePathStyle: {stroke: '#d2357d'}});
                }
                // @ts-ignore
                else 
                {
                    creep.moveTo(source,{visualizePathStyle: {stroke: '#d2357d'}});
                }
                return;
            }
            // @ts-ignore
            else if(result == OK) creep.memory.harvesting = true;
        }
        else
        {
            // @ts-ignore
            let target = Game.getObjectById(creep.memory.targetSourceId);
            // @ts-ignore
            if(creep.harvest(target) == ERR_NOT_IN_RANGE)
            {
                // @ts-ignore
                creep.moveTo(target);
                return;
            }
        }
	}
};

module.exports = roleMiner;