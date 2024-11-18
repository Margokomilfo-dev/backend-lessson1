import {app} from './app'
import {SETTINGS} from './settings'

// задача запустить (не создать) back
// ф-ия listen - запускает сервер и начинает прослушивать входящие запросы на указанном порту.
app.listen(SETTINGS.PORT, () => {
    console.log('...server started in port ' + SETTINGS.PORT)
})