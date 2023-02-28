import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'

export async function createUserController(req: Request, res: Response) {
    try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		}) 
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
}