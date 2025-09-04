import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		cached.promise = mongoose
			.connect(`${process.env.MONGODB_URI}/quickcart`, opts)
			.then(mongoose => {
				return mongoose
			})
	}

	cached.conn = await cached.promise
	return cached.conn
}

export default connectDB

// import mongoose from 'mongoose'

// let cached = global.mongoose

// if (!cached) {
// 	cached = global.mongoose = { conn: null, promise: null }
// }

// async function connectDB() {
// 	if (cached.conn) {
// 		return cached.conn
// 	}
// 	if (!cached.promise) {
// 		const uri = process.env.MONGODB_URI
// 		const opts = {
// 			bufferCommands: false,
// 		}

// 		if (!uri) {
// 			throw new Error('MONGODB_URI is not defined in .env')
// 		}

// 		cached.promise = mongoose.connect(uri, opts).then(mongoose => mongoose)
// 	}

// 	cached.conn = await cached.promise
// 	return cached.conn
// }

// export default connectDB
