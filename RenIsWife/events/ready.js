module.exports = (client) => {
    console.log('Ren is wake up!')

    client.user.setActivity({
        name: 'Learning with Hosuly',
        type: 'STREAMING'
    })
}