const epxress = require('express')
const router = epxress.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/user', async (req, res) => {
    try {
        const { name, email, profileId } = req.body

        let user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return res.json({ msg: 'Já existe um usuário com este nome.' })
        }

        user = await prisma.user.create({
            data: {
                name,
                email,
                profileId
            }
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.json({ error })
    }
})

router.post('/profile', async (req, res) => {
    try {
        const { nome, status } = req.body

        let profile = await prisma.profile.findFirst({
            where: {
                nome
            }
        })

        if (profile) {
            if (profile.status == true) {
                return res.json({ msg: 'Este profile já existe e não poderá ser recriado.' })
            }

            return res.json({ msg: 'Este profile está desativado na base.' })
        }

        profile = await prisma.profile.create({
            data: {
                nome,
                status
            }
        })

        return res.status(201).json(profile)
    } catch (error) {
        return res.json({ error })
    }

})


router.post('/post', async (req, res) => {
    const { content, idUser } = req.body

    const post = await prisma.post.create({
        data: {
            content,
            idUser
        }
    })

    return res.json(post)
})


router.get('/userWithProfile', async (req, res) => {

    const userWithProfile = await prisma.user.findMany({
        include: {
            profile: true,
        },
    })

    return res.json(userWithProfile)
})


router.get('/postWithUser', async (req, res) => {

    const postWithUser = await prisma.post.findMany({
        include: {
            user: true,
        }
    })

    return res.json(postWithUser)
})

// router.post('/userCreate', async (req, res) => {

//     const user = await prisma.user.create({
//         data: {
//             name: 'teste de verificação',
//             email: 'testesss@teste.com.br'
//         }
//     })
// })


module.exports = router