var structLink = {

    /** @param {StructureLink} link **/
    run: function(link) {
        // if(link.store[RESOURCE_ENERGY]>=link.store.getCapacity(RESOURCE_ENERGY) * 0.8)
        // {
        //     let another = link.room.find(FIND_MY_STRUCTURES,{filter:(s)=>s.structureType == STRUCTURE_LINK && s != link});
        //     // @ts-ignore
        //     if(another.length && another[0].store.getFreeCapacity(RESOURCE_ENERGY) > link.store[RESOURCE_ENERGY] * 0.97)
        //     {
        //         // @ts-ignore
        //         link.transferEnergy(another[0]);
        //     }
        // }
        
        var another;

        if(link.room.name == "E53S48")
            another = Game.getObjectById("62623687c677b990f18a7d55");
        else if(link.room.name == "E52S47")
            another = Game.getObjectById("62678e654760dc3a8ce77900");
            
        if(link == another) return;
        //@ts-ignore
        if(another && another.store.getFreeCapacity(RESOURCE_ENERGY) > link.store[RESOURCE_ENERGY] * 0.97)
        {
            // @ts-ignore
            link.transferEnergy(another);
        }
	}
};

module.exports = structLink;