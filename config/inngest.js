import User from '@/models/User'
import { Inngest } from 'inngest'
import { connect } from 'mongoose'

// Create a client to send and receive events
export const inngest = new Inngest({ id: 'quickcart-next' })

// Inngest function ri save user data to a database

export const syncUserCreation = inngest.createFunction(
	{
		id: 'sync-user-form-clerk',
	},
	{
		event: 'clerk/user.created',
	},

	async ({ event }) => {
		const { id, first_name, last_name, email_addresses, image_url } = event.data
		const userData = {
			_id: id,
			email: email_addresses[0].email_address,
			name: first_name + ' ' + last_name,
			imageUrl: image_url,
		}
		await connectDB()
		await User.create(userData)
		await connectDB()
		await User.findByIdAndUpdate(id, userData, { new: true })
	}
)

// Inngest Function to update user data in database

export const syncUserUpdation = inngest.createFunction(
	{
		id: 'update-user-form-clerk',
	},
	{
		event: 'clerk/user.updated',
	},
	async ({ event }) => {
		const { id, first_name, last_name, email_addresses, image_url } = event.data
		const userData = {
			_id: id,
			email: email_addresses[0].email_address,
			name: first_name + ' ' + last_name,
			imageUrl: image_url,
		}
		await connectDB()
		await User.findByIdAndUpdate(id, userData)
	}
)

// Inngest Function to delete user data in database

export const syncUserDeletion = inngest.createFunction(
	{
		id: 'delete-user-with-clerk',
	},
	{
		event: 'clerk/user.deleted',
	},
	async ({ event }) => {
		const { id } = event.data
		await connectDB()
		await User.findByIdAndDelete(id)
	}
)
