import connectDB from '@/config/db'
import User from '@/models/User'
import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { userId } = getAuth(request)

    await connectDB()

    let user = await User.findById(userId)

    if (!user) {
      const clerk = await clerkClient()
      const clerkUser = await clerk.users.getUser(userId)

      user = await User.create({
        _id: userId,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
        cartItems: {},
      })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    })
  }
}
