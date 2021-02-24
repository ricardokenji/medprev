class Sanitizer {
    documentNumber(target: string): string {
        if (target == null || target == undefined) {
            return ""
        }
        const clean = target.replace(/[^0-9]/g, "")
        return clean
    }
}

const sanitizer = new Sanitizer()

export default sanitizer