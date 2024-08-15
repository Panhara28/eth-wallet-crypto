export function formatEth(value: string) {
    return (Number(value) / 10 ** 18).toFixed(2)
}