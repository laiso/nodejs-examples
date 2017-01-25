import Koa from 'koa'
import cors from 'kcors'
import KoaRouter from 'koa-router';

const api = KoaRouter()
    .get('/users/:id', function (ctx, next) {
        ctx.body = ctx.params['id'];
    })

const app = new Koa()
    .use(cors())
    .use(async(ctx, next) => {
        try {
            await next()
            console.log(`${ctx.method} ${ctx.url}`)
        } catch (err) {
            ctx.body = err.message
            ctx.status = err.status || 500
            console.error(err.message)
        }
    })
    .use(api.routes())
    .use(api.allowedMethods())


const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

app.listen(port)