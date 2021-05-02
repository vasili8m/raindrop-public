export function parseQueryParams(string) {
    const obj = Object.fromEntries(new URLSearchParams(string||''))
    for(const i in obj)
        try{
            obj[i] = JSON.parse(obj[i])
        }catch(e){}

    return obj
}