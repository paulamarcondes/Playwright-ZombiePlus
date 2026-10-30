import path from 'path'

const FIXTURES_DIR = path.join(__dirname, 'fixtures')

export function fixturePath(relativePath: string) {
    return path.join(FIXTURES_DIR, relativePath)
}
