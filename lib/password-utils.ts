import crypto from 'crypto'

// Generate a simple, memorable password (6-8 characters)
export function generateSimplePassword(): string {
    const adjectives = ['blue', 'red', 'big', 'cool', 'fast', 'new', 'top', 'hot', 'fun', 'nice']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const number = numbers[Math.floor(Math.random() * numbers.length)]
    const randomSuffix = Math.floor(Math.random() * 99).toString().padStart(2, '0')

    return `${adjective}${number}${randomSuffix}`
}

// Hash password for storage
export function hashPassword(password: string): string {
    return crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
}

// Simple encryption for reversible storage (so we can show it in admin)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-char-secret-key-here-12345'
const ALGORITHM = 'aes-256-cbc'

export function encryptPassword(password: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv)

    let encrypted = cipher.update(password, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return iv.toString('hex') + ':' + encrypted
}

export function decryptPassword(encryptedPassword: string): string {
    try {
        const parts = encryptedPassword.split(':')
        const iv = Buffer.from(parts[0], 'hex')
        const encrypted = parts[1]

        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv)

        let decrypted = decipher.update(encrypted, 'hex', 'utf8')
        decrypted += decipher.final('utf8')

        return decrypted
    } catch (error) {
        console.error('Error decrypting password:', error)
        return 'Error decrypting'
    }
}