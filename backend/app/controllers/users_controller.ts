import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
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
      // Créer un nouvel utilisateur

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
}
