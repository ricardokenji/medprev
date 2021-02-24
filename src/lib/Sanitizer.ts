class Sanitizer {
    documentNumber(target: string): string {
        const clean = target.replace(/[^0-9]/g, "")
        return clean
    }
}

const sanitizer = new Sanitizer()

export default sanitizer