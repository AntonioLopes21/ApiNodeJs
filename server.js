/**
 * 1) tipo de rota / método http
 * 2) endereço da rota
 * 3) 
 */

import express from 'express'
//importar no package.json
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()
app.use(express.json())

/**criar api de usuarios
 * 
 * criar users
 * listar users
 * editar users
 * deletar users
 */


//STATUS DAS RESPOSTAS
/**
 * 200 A 299 -> SUCESSO
 * 400 A A 499 -> ERRO CLIENTE
 * 500 A 599 -> ERROS SERVIDOR
 */


app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let usuarios = []

    if(req.query) {
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.Email,
                age : req.query.age
            }
        })
    } else {

    }
    
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})


app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res)=> {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: " Usuário deletado com sucesso"})
})

app.listen(5000)




//user
//antonioLopes
//pwd
//DalacdxZ5PQXhrCD