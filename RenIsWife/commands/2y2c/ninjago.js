module.exports = {
    name: '',
    execute(bot, message, args, pathfinder)  {
        bot.on('path_update', (r) => {
            const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
            console.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick). ${r.status}`)
            const path = [bot.entity.position.offset(0, 0.5, 0)]
            for (const node of r.path) {
              path.push({ x: node.x, y: node.y + 0.5, z: node.z })
            }
            bot.viewer.drawLine('path', path, 0xff00ff)
        })
        bot.viewer.on('blockClicked', (block, face, button) => {
            if (button !== 2) return // only right click
        
            const p = block.position.offset(0, 1, 0)
        
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
        })
    }    
}