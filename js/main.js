const submit = document.querySelector('#submit')

submit.addEventListener('click', checkServerStatus)

function checkServerStatus() {
    const serverDomain = document.querySelector('#serverDomain').value
    const onlineDisplay = document.querySelector('#online')
    const playersOnlineDisplay = document.querySelector('#playersOnline')
    const playersMaxDisplay = document.querySelector('#playersMax')
    const pluginsDisplay = document.querySelector('#plugins')
    const versionDisplay = document.querySelector('#version')
    const serverStatusHeader = document.querySelector('#serverStatusHeader span')
    const list = document.querySelector('ul')

    if (serverDomain == '') {
        serverStatusHeader.classList.add('red')
        serverStatusHeader.innerHTML = `&nbsp;&nbsp;please input a server domain / address`
        return
    }
    fetch(`https://api.mcsrvstat.us/2/${serverDomain}`)
        .then(res => res.json())
        .then(data => {
            console.log('Minecraft API:')
            console.log(data)

            const plugins = data.plugins || 'None detected'
            const online = data.online ? 'Yes' : 'No'
            const playersList = data.players.list || 'None'

            onlineDisplay.innerHTML = online
            playersOnlineDisplay.innerHTML = playersList
            playersMaxDisplay.innerHTML = data.players.max 
            pluginsDisplay.innerHTML = plugins
            versionDisplay.innerHTML = data.version
            serverStatusHeader.classList.remove('red')
            serverStatusHeader.innerHTML = `&nbsp;&nbsp;for server: ${serverDomain}`
            list.classList.add('listItemWithData')

            if (online == 'Yes') {
                onlineDisplay.classList.add('green')
            } else {
                onlineDisplay.classList.add('red')
            }
        })
        .catch(err => console.log(`error: ${err}`))
}