import {req} from './test-helpers'
import {setDb} from '../src/db/db'
// import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'

describe('/videos', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDb()
    })

    it('should get empty array', async () => {
        // setDb() // очистка базы данных если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200) // проверяем наличие эндпоинта

        console.log(res.status) // можно посмотреть статус эндпоинта
        console.log(res.body) // можно посмотреть ответ эндпоинта

        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        const dataset1 = {
            videos: [{id: 'id1', author: 'author', title: 'title', availableResolutions: ['P1440']}]
        }
        setDb(dataset1) // заполнение базы данных начальными данными если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('should create', async () => {
        setDb()
        const newVideo: any /*InputVideoType*/ = {
            id: 'id1',
            title: 't1',
            author: 'a1',
            availableResolution: ['P144' /*Resolutions.P144*/]
            // ...
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo) // отправка данных
            .expect(201) //если 201, то будет ошибка, так как такого ендпоинта еще нет
            // .expect(404) //если 201, то будет ошибка, так как такого ендпоинта еще нет

        console.log(res.status)
        console.log(res.body)

        // expect(res.body.availableResolution).toEqual(newVideo.availableResolution)
    })
   it('shouldn\'t find', async () => {
       const dataset1 = {
           videos: [{id: 'id1', author: 'author', title: 'title', availableResolutions: ['P1440']}]
       }
       setDb(dataset1) // заполнение базы данных начальными данными если нужно

       const res = await req
           .get(SETTINGS.PATH.VIDEOS + '/1')
           // .expect(404) // проверка на ошибку

       console.log(res.status)
       console.log(res.body)
        })

})