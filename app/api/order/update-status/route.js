import connectDB from '@/config/db'
import Order from '@/models/Order'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Не авторизован',
      })
    }

    const { orderId, status } = await request.json()

    await connectDB()

    await Order.findByIdAndUpdate(orderId, {
      status,
    })

    return NextResponse.json({
      success: true,
      message: 'Статус обновлён',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    })
  }
}
