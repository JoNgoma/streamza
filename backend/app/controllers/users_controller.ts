import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const { email, fullName, phone, password, dateBirth } = request.only([
      'email',
      'fullName',
      'phone',
      'password',
      'dateBirth',
    ])

    try {
      const user = new User()
      user.fullName = fullName
      user.phone = phone
      user.email = email
      user.birthDay = dateBirth
      user.password = password

      await user.save()
      return response.status(201).json({
        message: 'Utilisateur créé avec succès',
        user,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la création de l’utilisateur',
        error: error.message,
      })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    const { phone, password } = request.only(['phone', 'password'])

    try {
      const user =
        (await User.query().where('email', phone).first()) ||
        (await User.query().where('phone', phone).first())

      if (!user) {
        return response.status(400).json({
          message: 'Identifiant inconrrect',
          type: 'INVALID_CREDENTIALS',
        })
      }

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.status(400).json({
          message: 'Mot de passe inconrrect',
          type: 'INVALID_CREDENTIALS',
        })
      }

      // User connected
      // const userAuth = await auth.use('web').login(user)

      return response.status(200).json({
        message: 'Utilisateur connecté',
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          fullName: user.fullName,
          birthDay: user.birthDay,
        },
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la connexion au serveur',
        error: error.message,
      })
    }
  }
}
