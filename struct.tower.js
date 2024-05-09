var structTower = {

    /** @param {StructureTower} tower **/
    run: function(tower) {
        
        //治疗
        var damagedCreep = tower.room.find(FIND_MY_CREEPS,{filter:(creep)=>creep.hits<creep.hitsMax});
        damagedCreep.sort((a,b)=>a.hits-b.hits);
        if(damagedCreep.length)
        {
            tower.heal(damagedCreep[0]);
            return;
        }
        
        //紧急修复
        var hostile = tower.room.find(FIND_HOSTILE_CREEPS);

        if(hostile.length)
        {
            //let randMod = Math.floor(Math.random() * 4) * 2 + 3;
            if(Math.random() < 0.3 && tower.store[RESOURCE_ENERGY] > 750)
            {
                //hostile = _.filter(hostile,(c)=>(c.getActiveBodyparts(HEAL)==0));
			    //if(hostile.length)
			    {
                    let target = Math.floor(Math.random() * hostile.length)
                    tower.attack(hostile[target]);
                    return;
                }
            }
            
            var dangeousWall = tower.room.find(FIND_STRUCTURES, { filter: (structure) => (
                ((structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) ||
                (structure.hits < structure.hitsMax * 0.04 && structure.structureType == STRUCTURE_RAMPART) || 
                (structure.hits < structure.hitsMax * 0.02 && structure.structureType == STRUCTURE_WALL && (
                    structure.id!= "625e97c42fd82812f079b6b7" &&
                    structure.id!= "625ee6281af160190244b9ea" &&
                    structure.id!= "625ee6f9c5005959532d28fe"
                ))  ))});
            
			if(dangeousWall.length)
			{
			    dangeousWall.sort((a,b)=>a.hits-b.hits);
				tower.repair(dangeousWall[0]);
			}
			return;
        }
        
        if(tower.store[RESOURCE_ENERGY] > 400)
        {
           //修复
            var damagedStructure = tower.room.find(FIND_STRUCTURES, { filter: (structure) => (
                ((structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) ||
                (structure.hits < structure.hitsMax * 0.05 && structure.structureType == STRUCTURE_RAMPART) || 
                (structure.hits < structure.hitsMax * 0.025 && structure.structureType == STRUCTURE_WALL && (
                    structure.id!= "625e97c42fd82812f079b6b7" &&
                    structure.id!= "625ee6281af160190244b9ea" &&
                    structure.id!= "625ee6f9c5005959532d28fe"
                ))  ))});
            if(damagedStructure.length) {
                damagedStructure.sort((a,b)=>a.hits-b.hits);
                tower.repair(damagedStructure[0]);
            }
        }
	}
};

module.exports = structTower;