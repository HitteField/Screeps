var utilities = require('utilities');

var behavior = {

	/** @param {Creep} creep @param {number} indexOfSource**/ 
    harvest: function(creep, indexOfSource) 
    {
        //creep.say("work");
		var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[indexOfSource]) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(sources[indexOfSource], {visualizePathStyle: {stroke: '#1772b4'}});
        }
	},

    /** @param {Creep} creep  @param {Source} target @param {Flag} flag**/ 
    harvestTarget: function(creep, target, flag) 
    {
        
        if(!target)
        {
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#fcb70a'}});
            return;
        }

        var result = creep.harvest(target);
        if(result == ERR_NOT_IN_RANGE || result == ERR_NOT_ENOUGH_RESOURCES) 
        {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#fcb70a'}});
        }
	},
	withdrawMineRemains: function(creep,target,resType)
	{
	    if(creep.withdraw(target,resType) == ERR_NOT_IN_RANGE)
        {
            creep.say("🙏 舔包");
            creep.moveTo(target);
        }
	},

    /** @param {Creep} creep @param {Object} target**/ 
    withdrawRemains: function(creep,target)
    {
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.say("🙏 舔包");
            creep.moveTo(target);
        }
    },

    /** @param {Creep} creep**/ 
    withdrawTomb:function(creep)
    {
        let targetTomb = creep.room.find(FIND_TOMBSTONES);
        targetTomb.sort((a,b)=>a.ticksToDecay-b.ticksToDecay);
        if(targetTomb.length) 
        {
            let dist = utilities.CalcDistance(creep.pos,targetTomb[0].pos);
            if(dist < 34 && targetTomb[0].store[RESOURCE_ENERGY] > 3) 
            {
                behavior.withdrawRemains(creep,targetTomb[0]); 
                return true;
            }  
        }
        return false;
    },

    /** @param {Creep} creep**/ 
    pickupResource: function(creep)
    {
        var resources = creep.room.find(FIND_DROPPED_RESOURCES);
        for(let i = 0; i < resources.length; ++i)
        {
            let resource = resources[i];
            let dist = utilities.CalcDistance(creep.pos,resource.pos);
            if(dist < 100)
            {
                if((resource.amount > 1000 && resource.amount > creep.store.getCapacity(RESOURCE_ENERGY) * 0.8) || (resource.amount > creep.store.getFreeCapacity(RESOURCE_ENERGY) * 0.4))
                {
                    var result = creep.pickup(resource);
                    if(result == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(resource);
                        return true;
                    } 
                    else return result == OK;
                }
            }
        }
        
        return false;
        
        // var resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        // if(resource && resource.amount > 100)
        // {
        //     var result = creep.pickup(resource);
        //     if(result == ERR_NOT_IN_RANGE)
        //     {
        //         creep.moveTo(resource);
        //         return true;
        //     } 
        //     else return result == OK;
        // }
        // return false;
    },
    
    /** @param {Creep} creep @param {string} targetId */
    transferEnergyByID: function(creep, targetId)
    {
        var extension1 = Game.getObjectById(targetId);
        if(extension1!=null && extension1.store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            var path = creep.room.findPath(creep.pos,extension1.pos);
            if(path.length > 8) return false;           // 太远了就不去了

            if(creep.transfer(extension1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(extension1, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        else return false;
    },

    /** @param {Creep} creep @param {StructureExtension} target */
    transferEnergy: function(creep, target)
    {
        if(target == null || target.structureType != STRUCTURE_EXTENSION) return false;
        if(target.store.getFreeCapacity(RESOURCE_ENERGY)>0)
        {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reusePath:4});
            }
            return true;
        }
        else return false;
    },

    /** @param {Creep} creep*/
    repairNearbyStructure: function(creep)
    {
        if(creep.room.name == "E52S46") return false;

        //修理附近道路
        var damagedBuilding;
        if(creep.room.name == "E52S48") damagedBuilding = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && (structure.pos.x > 12 || structure.pos.y > 18) && (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER)});
        else damagedBuilding = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER)});

        if(damagedBuilding)
        {
            //var pathLength = creep.room.findPath(creep.pos,damagedBuilding.pos).length;
            let dist = utilities.CalcDistance(creep.pos,damagedBuilding.pos);
            if(dist < 26)
            {
                creep.say('🔩 兼职修理');
                // @ts-ignore
                var result = creep.repair(damagedBuilding);
                
                if(result == OK) return true;
                else if(result==ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedBuilding,{visualizePathStyle:{stroke:'#ee3f4d'}}); 
                    return true;
                }
                else return false;
            }
        }

        return false;
    },

    /** @param {Creep} creep @param {number} tickLimit*/
    // @ts-ignore
    renewSelf: function(creep,tickLimit)
    {
        //被揍了
        if(creep.hits < creep.hitsMax * 0.7)
        {
            // @ts-ignore
            creep.memory.renewing = true;
            // @ts-ignore
            creep.memory.harvesting = false;
            // @ts-ignore
            creep.memory.upgrading = false;
            // @ts-ignore
            creep.memory.building = false;
            creep.say("😨 HELP!",true);
        }

        // @ts-ignore
        if(!creep.memory.renewing && creep.ticksToLive <= tickLimit)
        {
            // @ts-ignore
            creep.memory.renewing = true;
            // @ts-ignore
            creep.memory.harvesting = false;
            // @ts-ignore
            creep.memory.upgrading = false;
            // @ts-ignore
            creep.memory.building = false;
            creep.say("🩹 包扎");
        }
        // @ts-ignore
        if(creep.memory.renewing && creep.ticksToLive >= 1400 && creep.hits >= creep.hitsMax * 0.99)
        {
            // @ts-ignore
            creep.memory.renewing = false;
        }

        //回家吃奶
       // @ts-ignore
       if(creep.memory.renewing)
       {
            var homeSpawn = Game.spawns["LeoSpawn"];

            if(homeSpawn.spawning && creep.ticksToLive >=750)
            {
                // @ts-ignore
                creep.memory.renewing = false;
                return false;
            }

            var result = homeSpawn.renewCreep(creep);
            if(result != ERR_FULL && result != OK)
            {
                creep.moveTo(homeSpawn,{visualizePathStyle: {stroke: '#ff0000'}});
            }
            else if(result == OK && creep.store[RESOURCE_ENERGY]>0)
            {
                creep.transfer(homeSpawn,RESOURCE_ENERGY);
            }
            return true;
       }
       return false;
    },

    /** @param {Creep} creep @param {number} tickLimit*/
    // @ts-ignore
    recycleSelf: function(creep,tickLimit)
    {
        if(creep.ticksToLive < tickLimit)
        {
            var homeSpawn = Game.spawns["LeoSpawn"];
            var result = homeSpawn.recycleCreep(creep);
            if(result == ERR_NOT_IN_RANGE) creep.moveTo(homeSpawn);

            return result == OK || result == ERR_NOT_IN_RANGE;
        }
        return false;
    },
    
    clearNoActiveOrder: function()
    {
        for(const id in Game.market.orders) {
            if(!Game.market.orders[id].isActive) Game.market.cancelOrder(id);
        }  
    },
    
    /** @param {string} homeFlag*/
    // @ts-ignore
    createMarketOrder: function(homeFlag)
    {
        try
        {
            var rm = Game.rooms[homeFlag];
            
            if(rm.controller.level < 8) return;
            
            for(const resType in rm.terminal.store)
            {
                if(resType == RESOURCE_ENERGY)
                {
                    if(rm.terminal && rm.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > rm.terminal.store.getCapacity() * 0.34 && rm.storage && rm.storage.store.getUsedCapacity(RESOURCE_ENERGY) > rm.storage.store.getCapacity() * 0.8)
                    {
                        let existOrders = Game.market.getAllOrders({roomName:homeFlag, resourceType: RESOURCE_ENERGY});
                    
                        let otherOrder = Game.market.getAllOrders({resourceType:RESOURCE_ENERGY,type:ORDER_SELL})
                                otherOrder.sort(function(a,b){
                                    return a['price'] - b['price'];
                                });
                                
                        let orderPrice = otherOrder[0]['price'];
                        if(existOrders.length  == 0)
                        {
                            if(orderPrice > 12.98) orderPrice = 12.98;
                            //else if(orderPrice < 4.98) orderPrice = 4.98;
                            
                            let result = Game.market.createOrder({type:ORDER_SELL, resourceType: RESOURCE_ENERGY, price: orderPrice, totalAmount:30000, roomName:homeFlag});
                            
                            console.log(homeFlag + " createOrder " + resType + " with result " + result);
                            
                            if(result == -8)
                            {
                                behavior.clearNoActiveOrder();
                            }
                        }
                        else
                        {
                            if(existOrders[0]['price'] > orderPrice)
                            {
                                if(rm.terminal)
                                {
                                    let divide = rm.terminal.store.getUsedCapacity(RESOURCE_ENERGY) / rm.terminal.store.getCapacity();
                                    let resultPrice = 12.98;
                                    if(divide > 0.9) resultPrice = 4.198;
                                    else if(divide > 0.8) resultPrice = 4.698;
                                    else if(divide > 0.7) resultPrice = 5.698;
                                    
                                    if(orderPrice > resultPrice) orderPrice = resultPrice;
                                }
                                
                                let result = Game.market.changeOrderPrice(existOrders[0]['id'], orderPrice);
                                
                                console.log(homeFlag + " changeOrderPrice " + resType + " with result " + result);
                            }
                        }
                    }
                }
                else
                {
                    if(resType == "XLH2O") continue;
                    
                    let existOrders = Game.market.getAllOrders({roomName:homeFlag, resourceType: resType});
                    let otherOrder = Game.market.getAllOrders({resourceType:resType,type:ORDER_SELL})
                    otherOrder.sort(function(a,b){
                        return a['price'] - b['price'];
                    });
                    
                    let orderPrice = otherOrder[0]['price'];
                    if(existOrders.length  == 0)
                    {
                        if(rm.terminal && rm.terminal.store.getUsedCapacity(resType) > rm.terminal.store.getCapacity() * 0.1)
                        {
                            if(resType == RESOURCE_HYDROGEN && orderPrice > 100) orderPrice = 99.98;
                            
                            let result = Game.market.createOrder({type:ORDER_SELL, resourceType: resType, price: orderPrice, totalAmount:30000, roomName:homeFlag});
                            
                            console.log(homeFlag + " createOrder " + resType + " with result " + result);
                            
                            if(result == -8)
                            {
                                behavior.clearNoActiveOrder();
                            }
                        }
                    }
                    else
                    {
                        if(existOrders[0]['price'] > orderPrice)
                        {
                            let result = Game.market.changeOrderPrice(existOrders[0]['id'], orderPrice);
                            
                            console.log(homeFlag + " changeOrderPrice " + resType + " with result " + result);
                        }
                    }
                }
            }
            
            
        }
        catch(error)
        {
            console.log(homeFlag + " createMarketOrder Error : " + error);
        }
    }
};

module.exports = behavior;