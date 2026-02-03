import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: 'Chybí nastavení Cloudinary v prostředí' },
        { status: 500 }
      )
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    try {
      await cloudinary.api.ping()
    } catch (authError) {
      console.error('Cloudinary auth error:', authError)
      const authMessage = authError instanceof Error ? authError.message : 'Chyba ověření Cloudinary'
      return NextResponse.json(
        {
          error: 'Chyba ověření Cloudinary',
          details: authMessage,
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Žádný soubor nebyl nahrán' },
        { status: 400 }
      )
    }

    // Kontrola typu souboru
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Soubor musí být obrázek' },
        { status: 400 }
      )
    }

    // Kontrola velikosti (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Soubor je příliš velký (max 5MB)' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: 'uploads',
      resource_type: 'image',
    })

    return NextResponse.json({ url: uploadResult.secure_url })
  } catch (error) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Chyba při nahrávání souboru'
    const httpCode = (error as { http_code?: number }).http_code
    const cloudinaryError = (error as { error?: { message?: string; http_code?: number } }).error
    const rawError =
      typeof error === 'object'
        ? JSON.stringify(error, Object.getOwnPropertyNames(error))
        : String(error)
    return NextResponse.json(
      {
        error: 'Chyba při nahrávání souboru',
        details: message,
        httpCode: httpCode ?? null,
        cloudinaryMessage: cloudinaryError?.message ?? null,
        cloudinaryHttpCode: cloudinaryError?.http_code ?? null,
        rawError,
      },
      { status: 500 }
    )
  }
}
