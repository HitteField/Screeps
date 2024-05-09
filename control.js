const structTower = require('struct.tower');
const structLink = require('struct.link');

const behavior = require('behavior');

var control = {

	/** @param {string} roleName @param {string} homeFlag**/ 
    spawnNewCreep: function(roleName,homeFlag) {
		var components;
		var spawnName;
		var spawnNameAnother;
		if(roleName == "soldier") components = [ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE];	//2520
		else if(roleName == "digger") components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];//1400
 		else components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE];	//300

		if(homeFlag == "E53S48")
		{
		    spawnName = "LeoSpawn";
		    spawnNameAnother = "LeoSpawn_backup";
			if(roleName == "upgrader") components =  (Game.rooms[homeFlag].controller.level >= 8) ? [WORK,CARRY,MOVE] : [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];
			else if(roleName == "harvester") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1950
			else if(roleName == "builder") components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE] //2600
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = spawnNameAnother;
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			spawnNameAnother = "LeoSpawn2_backup";
			if(roleName == "upgrader") components = (Game.rooms[homeFlag].controller.level >= 8) ? [WORK,CARRY,MOVE] : [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];
			else if(roleName == "harvester") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1950
			else if(roleName == "builder") components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]; //2600
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = spawnNameAnother;
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			spawnNameAnother = "LeoSpawn3_backup";
			if(roleName == "harvester") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1950
			else if(roleName == "upgrader") components = (Game.rooms[homeFlag].controller.level >= 8) ? [WORK,CARRY,MOVE] : [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];
			else if(roleName == "builder") components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE] //2600
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = spawnNameAnother;
		}
		else if(homeFlag == "E52S48")
		{
			spawnName = "LeoSpawn4";
			spawnNameAnother = "LeoSpawn4_backup";
			if(roleName == "harvester") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE];//1500
			else if(roleName == "upgrader") components = (Game.rooms[homeFlag].controller.level >= 8) ? [WORK,CARRY,MOVE] : [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]; 
			else if(roleName == "builder") components = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE] //2600
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		try
		{
		    // @ts-ignore
    		var result = Game.spawns[spawnName].spawnCreep(components,roleName + '_' + (Memory.creepNum),{memory:{role:roleName,targetFlagName:homeFlag,homeFlagName:homeFlag,renewing:false}});
    		console.log(homeFlag + ":Generate " + roleName +":" + result);
    		if(result == OK || result == ERR_NAME_EXISTS)
    		{
    			// @ts-ignore
    			Memory.creepNum++;
    		}
    		else if(result == -6)
    		{
    		    if(roleName == "upgrader") components = [WORK,CARRY,MOVE]
    			else if(roleName == "harvester") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE];//300
    			else if(roleName == "builder") components = [WORK,MOVE,WORK,CARRY] //300
    			result = Game.spawns[spawnName].spawnCreep(components,roleName + '_' + (Memory.creepNum),{memory:{role:roleName,targetFlagName:homeFlag,homeFlagName:homeFlag,renewing:false,Powered:false}});
    			if(result == OK || result == ERR_NAME_EXISTS)
        		{
        			// @ts-ignore
        			Memory.creepNum++;
        		}
    		}
    
    		return result == OK;
		}
		catch(error)
        {
            console.log(homeFlag + " " + spawnName + " spawnNewCreep Error: " + error);
            return false;
        }
	},
	/**@param {string} targetFlag @param {string} homeFlag*/
	spawnNewInvader:function(targetFlag,homeFlag){
		var components = [TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE];	//1120
		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		let result = Game.spawns[spawnName].spawnCreep(components,'Friendly ambassador_' + (Memory.creepNum),{memory:{role:'invader',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate invader:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result == OK;
	},

	/**@param {string} targetFlag @param {string} homeFlag*/
	spawnNewClaimer:function(targetFlag,homeFlag){
		var components = [CLAIM,ATTACK,MOVE,CLAIM,ATTACK,MOVE];

		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'claimer_' + targetFlag + '_' + (Memory.creepNum),{memory:{role:'claimer',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate " + targetFlag + " claimer:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result == OK;
	},

	/**@param {string} targetFlag @param {string} homeFlag*/
	spawnNewMiner:function(targetFlag,homeFlag){
		var components = [WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,MOVE];  		//650  
		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
        else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'miner_' + targetFlag + '_' + (Memory.creepNum),{memory:{role:'miner',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate " + targetFlag + " miner:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}
		else if(result == -6)
		{
		    components = [WORK,MOVE,WORK,MOVE]; //300
		    result = Game.spawns[spawnName].spawnCreep(components,'miner_' + targetFlag + '_' + (Memory.creepNum),{memory:{role:'miner',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		    if(result == OK || result == ERR_NAME_EXISTS)
    		{
    			// @ts-ignore
    			Memory.creepNum++;
    		}
		}

		return result == OK;
	},

	/**@param {string} targetFlag @param {string} homeFlag*/
	spawnNewRemoteHarvester:function(targetFlag,homeFlag){
		
		var components; 	//1350
		var spawnName;
		if(homeFlag == "E53S48")
		{
			if(targetFlag == "E53S48") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//2100
			else if(targetFlag == "E53S47") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1500
			else if(targetFlag == "E54S48") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//900
			else if(targetFlag == "E54S49") components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1200
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//2100
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
			components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE/*,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE */]; 	//1200- 900
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		    components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//1200
		}

		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'rH_' + targetFlag + '_' + (Memory.creepNum),{memory:{role:'remoteHarvester',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate " + targetFlag + " remoteHarvester:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result == OK;
	},

	/**@param {string} targetFlag @param {string} homeFlag*/
	spawnNewRemoteRepairer:function(targetFlag,homeFlag){
		var components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];  		//1900
		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			// @ts-ignore
			//components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,ATTACK,ATTACK,MOVE];  		//1510
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'rR_' + targetFlag + '_' + (Memory.creepNum),{memory:{role:'remoteRepairer',targetFlagName:targetFlag,homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate " + targetFlag + " remoteRepairer:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result == OK;
	},

	/**@param {string} homeFlag*/
	spawnNewHamal:function(homeFlag){
		var components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//300
		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'hamal_' + (Memory.creepNum),{memory:{role:'hamal',homeFlagName:homeFlag,renewing:false}});
		console.log(homeFlag + ":Generate hamal:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result;
	},
	
	/**@param {string} homeFlag*/
	spawnNewHamalCmd:function(homeFlag, srcIdStr, dstIdStr, resourceTypeStr, autoChangeTargetBoolean){
		var components = [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]; 	//300
		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
		    spawnName = "LeoSpawn4";
		    if(Game.spawns[spawnName].spawning || !Game.spawns[spawnName].isActive()) spawnName = "LeoSpawn4_backup";
		}
		// @ts-ignore
		var result = Game.spawns[spawnName].spawnCreep(components,'hamal_' + (Memory.creepNum),{memory:{
		    role:'hamal', homeFlagName:homeFlag, renewing:false, 
		    srcId:srcIdStr, dstId:dstIdStr, resourceType:resourceTypeStr, withdrawing:true, transfering:true, autoChangeTarget:autoChangeTargetBoolean}});
		console.log(homeFlag + ":Generate hamal:" + result);
		if(result == OK || result == ERR_NAME_EXISTS)
		{
			// @ts-ignore
			Memory.creepNum++;
		}

		return result;
	},

	/**@param {string} homeFlag*/
	maintainRoomState: function(homeFlag)
	{
        var hostile = Game.rooms[homeFlag].find(FIND_HOSTILE_CREEPS);

		if(hostile.length)
        {
            hostile = _.filter(hostile,(c)=>c.owner.username != "Invader");
		}

        if(hostile.length)
        {
            //hostile = _.filter(hostile,(c)=>c.owner.username != "Invader");
            //if(hostile.length)
            {
                Memory.roomState[homeFlag]["EnemyExistTime"] += 1;
                // if(Memory.roomState[homeFlag]["EnemyExistTime"] > 50)
                // {
                //     Memory.roomState[homeFlag]["BuilderNum"] = 3;
                // }
                //else 
                if(Memory.roomState[homeFlag]["EnemyExistTime"] > 150)
                {
                    Memory.roomState[homeFlag]["SoldierNum"] = 1;
                    //Memory.roomState[homeFlag]["BuilderNum"] = 3;
                }
            }
        }
        else
        {
            Memory.roomState[homeFlag]["EnemyExistTime"] = 0;
            Memory.roomState[homeFlag]["SoldierNum"] = 0;
			//Memory.roomState[homeFlag]["BuilderNum"] = (homeFlag == "E54S49") ? 2 : 1;
			//Memory.roomState[homeFlag]["BuilderNum"] = 2;
		}

// 		if(Memory.roomState[homeFlag]["EnemyExistTime"] > 75)
// 		{
// 			let existOrders = Game.market.getAllOrders({roomName:homeFlag, resourceType: RESOURCE_ENERGY});
// 			if(!existOrders.length)
// 			{		
// 				let otherOrder = Game.market.getAllOrders({resourceType:RESOURCE_ENERGY,type:ORDER_BUY})
// 				otherOrder.sort(function(a,b){
// 					return b['price'] - a['price'];
// 				});
				
// 				let orderPrice = otherOrder[0]['price'] + 1;
// 				let result = Game.market.createOrder({type:ORDER_BUY, resourceType: RESOURCE_ENERGY, price: orderPrice, totalAmount:100000, roomName:homeFlag});
				
// 				console.log(homeFlag + " create Buy Order with result " + result);
				
// 				if(result == -8)
// 				{
// 					behavior.clearNoActiveOrder();
// 				}
// 			}
// 		}
	},

	/** @param {string} homeFlag */
	maintainCreepNum: function(homeFlag)
	{
// 		var labs = Game.rooms[homeFlag].find(FIND_STRUCTURES,{filter:(s)=>s.structureType==STRUCTURE_LAB});
// 		try
// 		{
// 			// @ts-ignore
// 			labs[2].runReaction(labs[1],labs[0]);
// 			// @ts-ignore
// 			labs[5].runReaction(labs[4],labs[3]);

// 			Game.getObjectById('626d36e493344a3d009d63d4').produce(RESOURCE_ZYNTHIUM_BAR);
// 		}
// 		catch(error)
// 		{
			
// 		}

		// var spawnName = "LeoSpawn";
		// if(homeFlag == 'E52S47') 
		// {
		// 	spawnName = "LeoSpawn2";
		// 	if(Game.spawns[spawnName].spawning) spawnName = "LeoSpawn2_backup";
		// }
		// else if(homeFlag == "E54S49") spawnName = "LeoSpawn3";

		this.maintainRoomState(homeFlag);

		let towers_LeoSpawn = Game.rooms[homeFlag].find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_TOWER});
		for(let i in towers_LeoSpawn)
		{   
			//console.log(towers_LeoSpawn[i].id);
			// @ts-ignore
			structTower.run(towers_LeoSpawn[i]);
			if(towers_LeoSpawn[i].hits<towers_LeoSpawn[i].hitsMax)
			{
				if(towers_LeoSpawn[i].room.controller.safeMode == undefined && towers_LeoSpawn[i].room.find(FIND_HOSTILE_CREEPS).length > 0)
				{
					// @ts-ignore
					var msg = towers_LeoSpawn[i].room.controller.activateSafeMode();
					console.log("Active safemode with result:" + msg);
					Game.notify("We are under attack ,thus the safemode is activated.");
				}
			}
		}

		let links_LeoSpawn = Game.rooms[homeFlag].find(FIND_MY_STRUCTURES,{filter:(structure)=>structure.structureType==STRUCTURE_LINK});
		for(let i in links_LeoSpawn)
		{
			// @ts-ignore
			structLink.run(links_LeoSpawn[i]);
		}   

		var spawnName;
		if(homeFlag == "E53S48")
		{
			spawnName = "LeoSpawn";
			if(Game.spawns[spawnName].spawning) spawnName = "LeoSpawn_backup";
		}
		else if(homeFlag == "E52S47")
		{
			spawnName = "LeoSpawn2";
			if(Game.spawns[spawnName].spawning) spawnName = "LeoSpawn2_backup";
		}
		else if(homeFlag == "E54S49")
		{
			spawnName = "LeoSpawn3";
			if(Game.spawns[spawnName].spawning) spawnName = "LeoSpawn3_backup";
		}
		else if(homeFlag == "E52S48")
		{
			spawnName = "LeoSpawn4";
			if(Game.spawns[spawnName].spawning) spawnName = "LeoSpawn4_backup";
		}
	

		var isSpawning = Game.spawns[spawnName].spawning;
		if(isSpawning) return;

		// @ts-ignore
		var miners = _.filter(Game.creeps,(miners)=>{ return miners.memory.role == 'miner' && miners.memory.homeFlagName == homeFlag});

		// @ts-ignore
		if(miners.length < Memory.roomState[homeFlag]["MinerNum"])
		{
			this.spawnNewMiner(homeFlag,homeFlag);
			return;
		}
		
		// for(var flag in Memory.roomState[homeFlag])
		// {
		// 	//if(homeFlag == 'E52S47') console.log(flag);
		// 	// @ts-ignore
		// 	if((Memory.roomState[homeFlag][flag])["miner"] < 1)
		// 	{
		// 		var result = this.spawnNewMiner(flag,homeFlag);
		// 		if(result)
		// 		{
		// 			// @ts-ignore
		// 			(Memory.roomState[homeFlag][flag])["miner"] += 1;
		// 			console.log(homeFlag + ":A new miner is going to "+ flag);
		// 			return;
		// 		}
		// 		return;
		// 	}
		// }

		// @ts-ignore
		var harvesters = _.filter(Game.creeps,(harvesters)=>{ return harvesters.memory.role == 'harvester' && harvesters.memory.homeFlagName == homeFlag});
		// @ts-ignore
		var upgraders = _.filter(Game.creeps,(upgraders)=>{ return upgraders.memory.role == 'upgrader' && upgraders.memory.homeFlagName == homeFlag});
		// @ts-ignore
		var builders = _.filter(Game.creeps,(builders)=>{ return builders.memory.role == 'builder' && builders.memory.homeFlagName == homeFlag});
		// @ts-ignore
		var soldiers = _.filter(Game.creeps,(soldiers)=>{ return soldiers.memory.role == 'soldier' && soldiers.memory.homeFlagName == homeFlag});
		// @ts-ignore
		var invaders = _.filter(Game.creeps,(invaders)=>{ return invaders.memory.role == 'invader' && invaders.memory.homeFlagName == homeFlag});
		// @ts-ignore
		var diggers = _.filter(Game.creeps,(diggers)=>{ return diggers.memory.role == 'digger' && diggers.memory.homeFlagName == homeFlag});

		//console.log(homeFlag + "___harvester:" + harvesters.length + "; upgrader:" + upgraders.length + "; builder:" + builders.length + ";" + Memory.roomState[homeFlag]["HarvesterNum"]);

		// @ts-ignore
		if(harvesters.length < Memory.roomState[homeFlag]["HarvesterNum"])
		{
			control.spawnNewCreep("harvester",homeFlag);
			return;
		}
		
		// @ts-ignore
		// for(var flag in Memory.roomState[homeFlag])
		// {
		// 	// @ts-ignore
		// 	if((Memory.roomState[homeFlag][flag])["remoteRepairer"] < 1)
		// 	{
		// 		var result = this.spawnNewRemoteRepairer(flag,homeFlag);
		// 		if(result)
		// 		{
		// 			// @ts-ignore
		// 			(Memory.roomState[homeFlag][flag])["remoteRepairer"] += 1;
		// 			console.log(homeFlag + ":A new remoteRepairer is going to "+ flag);
		// 			return;
		// 		}
		// 	}
		// 	// @ts-ignore
		// 	if((Memory.roomState[homeFlag][flag])["remoteHarvester"] < 1)
		// 	{
		// 		var result = this.spawnNewRemoteHarvester(flag,homeFlag);
		// 		if(result)
		// 		{
		// 			// @ts-ignore
		// 			(Memory.roomState[homeFlag][flag])["remoteHarvester"] += 1;
		// 			console.log(homeFlag + ":A new remoteHarvester is going to "+ flag);
		// 			return;
		// 		}
		// 		return;
		// 	}
		// 	// @ts-ignore
		// 	if(flag!="E53S48" && flag!='E52S47' && (Memory.roomState[homeFlag][flag])["claimer"] < 1)
		// 	{
		// 		var result = this.spawnNewClaimer(flag,homeFlag);
		// 		if(result)
		// 		{
		// 			// @ts-ignore
		// 			(Memory.roomState[homeFlag][flag])["claimer"] += 1;
		// 			console.log(homeFlag + ":A new claimer is going to "+ flag);
		// 			return;
		// 		}
		// 	}
			
		// }
		// @ts-ignore
		if(builders.length < Memory.roomState[homeFlag]["BuilderNum"])
		{
			control.spawnNewCreep("builder",homeFlag);
			return;
		}
		// @ts-ignore
		if(upgraders.length < Memory.roomState[homeFlag]["UpgraderNum"] && Game.rooms[homeFlag].controller.upgradeBlocked == undefined)
		{
			control.spawnNewCreep("upgrader",homeFlag);
			return;
		}
		// @ts-ignore
		if(soldiers.length < Memory.roomState[homeFlag]["SoldierNum"])
		{
			control.spawnNewCreep("soldier",homeFlag);
			return;
		}

// 		if(homeFlag != 'E52S48')
		{
			let room = Game.spawns[spawnName].room;
			let mineral = room.find(FIND_MINERALS);
			let extractor = room.find(FIND_STRUCTURES,{filter:(s)=>s.structureType == STRUCTURE_EXTRACTOR});
			// @ts-ignore
			if(mineral[0].mineralAmount > 0 && extractor.length) Memory.roomState[homeFlag]["DiggerNum"] = 1;
			// @ts-ignore
			else Memory.roomState[homeFlag]["DiggerNum"] = 0;

			// @ts-ignore
			if(diggers.length < Memory.roomState[homeFlag]["DiggerNum"])
			{
				control.spawnNewCreep("digger",homeFlag);
				return;
			}
		}
		//Memory.roomState[homeFlag]["DiggerNum"] = 0;
		// @ts-ignore
		if(invaders.length < Memory.roomState[homeFlag]["InvaderNum"])
		{
			control.spawnNewInvader("WarTarget",homeFlag);
		}

	},

	/**@param {string} homeName */
	showInformation:function(homeName){
		let Spawn = Game.spawns[homeName];

		var offset = 0;
		var homeFlag = "E53S48"
		if(homeName == "LeoSpawn2")
		{
			offset = 7;
			homeFlag = "E52S47";
		}
		else if(homeName == "LeoSpawn3")
		{
			offset = 14;
			homeFlag = "E54S49";
		}
		else if(homeName == "LeoSpawn4")
		{
		    offset = 21;
		    homeFlag = "E52S48";
		}

		let roomVisual = new RoomVisual();
		roomVisual.rect(2,2 + offset,9,6.5,{fill:'#b0d5df',stroke:'#1491a8',opacity:0.2});


		let creepsNum = 0;
		for(var name in Game.creeps)
		{
			// @ts-ignore
			if(Game.creeps[name].memory.homeFlagName == homeFlag) creepsNum++;
		}
		
		if(creepsNum == 0)
		{
			// @ts-ignore
			var result = Game.spawns[homeName].spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],'harvester' + '_' + (Memory.creepNum),{memory:{role:'harvester',targetFlagName:homeFlag,homeFlagName:homeFlag,renewing:false}});
			console.log(homeFlag + ":Generate harvester:" + result);
			if(result == OK || result == ERR_NAME_EXISTS)
			{
				// @ts-ignore
				Memory.creepNum++;
			}
		}

		roomVisual.text("🔧 Creeps Num : "+ creepsNum,2.2,3 + offset,{color:'#b0d5df',font:0.8,align:'left',opacity:0.9});
		//roomVisual.text("📦 Cpu Bucket : "+ Game.cpu.bucket,2.2,4 + offset,{color:'#b0d5df',font:0.8,align:'left',opacity:0.9});
		let percent = Spawn.room.controller.progress / Spawn.room.controller.progressTotal * 100;
		roomVisual.text("⚡ Upgrade : "+ percent.toFixed(2) + "%",2.2,4 + offset,{color:'#b0d5df',font:0.8,align:'left',opacity:0.9});

		if(Spawn.room.storage) roomVisual.text("💾 Storage : "+ Spawn.room.storage.store.getUsedCapacity(),2.2,5 + offset,{color:'#b0d5df',font:0.8,align:'left',opacity:0.9});

		let UnderAttackTime = Memory.roomState[homeFlag]["EnemyExistTime"];
		if(UnderAttackTime) roomVisual.text("🔥 UnderAttack : "+ UnderAttackTime, 2.2,6 + offset,{color:'#f4f780',font:0.8,align:'left',opacity:0.9});

		let spawningCreep = Spawn.spawning;
		if(spawningCreep)
		{
			const _creep = Game.creeps[spawningCreep.name];
			// @ts-ignore
			let str = "⚙️ " + _creep.memory.role + ' ';
			let str2 = "📏 ";
			// @ts-ignore
			if(_creep.memory.targetFlagName)
			{
				// @ts-ignore
				str2 += _creep.memory.targetFlagName + ' ';
			}
			str2 += spawningCreep.remainingTime + 'ticks'

			roomVisual.text(str,2.2,7 + offset,{color:'#f4ce69',font:0.8,align:'left',opacity:0.8});
			roomVisual.text(str2,2.2,8 + offset,{color:'#f4ce69',font:0.8,align:'left',opacity:0.8});
		}
	}
};

module.exports = control;