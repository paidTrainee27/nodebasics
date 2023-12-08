function sum(a, b) {
    return a + b
}

function diff(a, b) {
    if (b > a) {
        return b - a
    }
    return a - b
}

exports.sum = sum
exports.diff = diff
