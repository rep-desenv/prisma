const epxress = require('express')
const router = epxress.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/user', async (req, res) => {
    const { name, email, profileId } = req.body

    const user = await prisma.user.create ({
        data: {
            name,
            email,
            profileId
        }
    })

    return res.json(user)
})

router.post('/profile', async (req, res) => {
    const { nome, status } = req.body

    const profile = await prisma.profile.create ({
        data: {
            nome,
            status
        }
    })

    return res.json(profile)
})


router.post('/post',async(req, res)=>{
    const { content, idUser } = req.body

    const post = await prisma.post.create({
        data:{
            content,
            idUser
        }
    })

    return res.json(post)
})

module.exports = router