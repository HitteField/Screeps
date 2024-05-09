var behavior = require("behavior");

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        // @ts-ignore
        var flag = Game.flags[creep.memory.targetFlagName];

        if(!flag)
        {
            creep.say("Invalid flag!");
            return;
        }
        else
        {
            if(creep.pos.roomName!=flag.pos.roomName)
            {
                creep.moveTo(flag);
            }
            else
            {
                let result = creep.reserveController(creep.room.controller);
                if(result==ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller,{visualizePathStyle:{stroke:'#41b349'},reusePath:3});
                }
                else if(result == ERR_INVALID_TARGET)
                {
                    creep.attackController(creep.room.controller);
                }
                //else creep.signController(creep.room.controller,"昨夜星落如雨，怒放飞花千树");
            }
        }
	}
};

module.exports = roleClaimer;