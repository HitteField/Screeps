const { filter } = require("lodash");
var roleUpgrader = require("role.upgrader");
var roleHarvester = require('role.harvester');
var behavior = require("behavior");
var utilities = require("utilities");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) 
	{
	    if(!creep.memory.Powered)
        {
            let lab = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_LAB && (structure.store[RESOURCE_CATALYZED_LEMERGIUM_ACID] >= 30 || structure.store[RESOURCE_LEMERGIUM_ACID] >= 30 || structure.store[RESOURCE_LEMERGIUM_HYDRIDE] >= 30) && (structure.store[RESOURCE_ENERGY] >= 20)});
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
	    
		//if(behavior.renewSelf(creep,180)) return;
		var container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
		// @ts-ignore
		var homePos = Game.flags[creep.memory.homeFlagName].pos;
		var isInHome = creep.pos.roomName==homePos.roomName;

	    // @ts-ignore
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            // @ts-ignore
            creep.memory.building = false;
            creep.say('🔄 采集');
	    }
	    // @ts-ignore
	    if(!creep.memory.building && (creep.store.getFreeCapacity() == 0)) {
	        // @ts-ignore
	        creep.memory.building = true;
	        creep.say('🚧 施工');
	    }

	    // @ts-ignore
	    if(creep.memory.building) {
	
			//建筑
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) 
			{
				var index = 0;
				//var index = targets.length - 1;
				// @ts-ignore
				//if(creep.memory.role != 'builder') index = targets.length - 1;
				let result = creep.build(targets[index]);
				if(result == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[index], {visualizePathStyle: {stroke: '#f9c116'}});
					return;
				}
				else if(result == OK) return;
			}

			var rampartHit = 0.025;
			var wallHit = 0.025;
			//if(creep.room.name == 'E53S48' || creep.room.name == 'E52S47') rampartHit = 0.05;


			//维修
			var damagedBuildings = creep.room.find(FIND_STRUCTURES, {filter: (structure) => (
				(structure.hits < structure.hitsMax * rampartHit && structure.structureType == STRUCTURE_RAMPART) ||
				(structure.hits < structure.hitsMax  && (structure.structureType == STRUCTURE_CONTAINER /*|| structure.structureType == STRUCTURE_ROAD*/ )) || 
				(structure.hits < structure.hitsMax * wallHit && structure.structureType == STRUCTURE_WALL && (
					structure.id!= "625e97c42fd82812f079b6b7" &&
					structure.id!= "625ee6281af160190244b9ea" &&
					structure.id!= "625ee6f9c5005959532d28fe"
				)) 
			)});
			
			//creep.say(damagedBuildings.length);
			
			var times = 1;
			while(damagedBuildings.length == 0)
			{
			    times++;
			    
			    damagedBuildings = creep.room.find(FIND_STRUCTURES, {filter: (structure) => (
				(structure.hits < structure.hitsMax * rampartHit * 0.75 * times && structure.structureType == STRUCTURE_RAMPART) ||
				(structure.hits < structure.hitsMax * wallHit * times && structure.structureType == STRUCTURE_WALL && (
					structure.id!= "625e97c42fd82812f079b6b7" &&
					structure.id!= "625ee6281af160190244b9ea" &&
					structure.id!= "625ee6f9c5005959532d28fe"
				)) 
			)});
			}
			
			//creep.say(times);
			
			// @ts-ignore
			if(damagedBuildings.length)
			{
				//creep.say(damagedBuilding.id);
				
				dangeousWall = _.filter(damagedBuildings,(c)=>(c.structureType == STRUCTURE_WALL && c.hits < c.hitsMax * wallHit * (times - 1)));
				if(dangeousWall.length)
				{
				    creep.say('🔧 紧急'+ dangeousWall[0].pos.x +',' + dangeousWall[0].pos.y);
					let result = creep.repair(dangeousWall[0]);
					if(result==ERR_NOT_IN_RANGE){
						creep.moveTo(dangeousWall[0],{visualizePathStyle:{stroke:'#10aec2'}});
						return;
					}
					if(result == OK) return;
				}
				
				//damagedBuildings =  _.filter(damagedBuildings,(c)=>c.structureType == STRUCTURE_WALL);
				
				//creep.say(damagedBuildings.length);
				//damagedBuildings.sort((a,b)=>a.hits-b.hits);
				if(damagedBuildings.length)
				{
					creep.say('🔧 修理'+ damagedBuildings[0].pos.x +',' + damagedBuildings[0].pos.y);
					let result = creep.repair(damagedBuildings[0]);
					if(result==ERR_NOT_IN_RANGE){
						creep.moveTo(damagedBuildings[0],{visualizePathStyle:{stroke:'#10aec2'}});
						return;
					}
					if(result == OK) return;
				}
			}
			else
			{
				//回家
				if(!isInHome)
				{
					creep.moveTo(homePos,{visualizePathStyle: {stroke: '#fcb70a'}});
				}
				else
				{
					// var storage = creep.room.storage;

					// // @ts-ignore
					// if(storage && storage.store.getFreeCapacity() > 0)
					// {
					// 	//把东西送到存储器
					// 	if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
					// 	{
					// 		creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
					// 	}
					// }
					// //莫得活儿
					// else 
					roleHarvester.run(creep);
				}
			}
	    }
	    else 
	    {
			var sourceIndex = 0;
			//舔包
 			if(behavior.pickupResource(creep)) return;

 			if(behavior.withdrawTomb(creep)) return;
			
			var targetIndex = 0;
            var container = creep.room.find(FIND_STRUCTURES,{filter:(structure)=>structure.structureType == STRUCTURE_CONTAINER});
            // @ts-ignore
            if(container.length > 0)
            {
                if(container.length > 1 && container[1].store[RESOURCE_ENERGY] > container[0].store[RESOURCE_ENERGY]) targetIndex = 1;
            
                if(container[targetIndex].store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(RESOURCE_ENERGY) - 200)
                {
                    let result = creep.withdraw(container[targetIndex],RESOURCE_ENERGY);
                    if(result==ERR_NOT_IN_RANGE || result == OK)
                    {
                        creep.moveTo(container[targetIndex]);
                        return;
                    }
                }
            }

			let terminal = creep.room.terminal;
			if(terminal && terminal.store[RESOURCE_ENERGY] > terminal.store.getCapacity(RESOURCE_ENERGY) * 0.1)
			//if(terminal && terminal.store[RESOURCE_ENERGY] > 20000)
			{
				let result = creep.withdraw(terminal,RESOURCE_ENERGY);
				if(result==ERR_NOT_IN_RANGE)
				{
					creep.moveTo(terminal, {visualizePathStyle: {stroke: '#41ae3c'}});
					return;
				}
				if(result == OK) return;
			}	
            
            let storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] > storage.store.getCapacity() * 0.2)
            {
                let result = creep.withdraw(storage,RESOURCE_ENERGY);
                if(result==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#41ae3c'}});
                    return;
                }
                if(result == OK) return;
            }
            
            let targetFlag = creep.memory.targetFlagName;
            creep.moveTo(Game.flags[targetFlag]);
			
	    }
	}
};

module.exports = roleBuilder;