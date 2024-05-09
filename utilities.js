var utilities = {
    /**@param {RoomPosition} pos1 @param {RoomPosition} pos2*/
    CalcDistance(pos1,pos2)
    {
        let dx = pos1.x - pos2.x;
        let dy = pos1.y - pos2.y;
        return dx*dx+dy*dy;
    }
}

module.exports = utilities;