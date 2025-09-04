import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

mongoose
	.connect(uri)
	.then(() => {
		console.log('✅ Успешное подключение к MongoDB')
		process.exit()
	})
	.catch(err => {
		console.error('❌ Ошибка подключения:', err)
		process.exit(1)
	})
