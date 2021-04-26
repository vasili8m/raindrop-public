export async function copyText(text) {
    await navigator.permissions.query({name: 'clipboard-write'})
    await navigator.clipboard.writeText(text)
}