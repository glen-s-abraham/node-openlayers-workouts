export const getDetailContent = (data)=>{
    return `<h2>Name:{$name}</h2><h2>Owner:{$owner}</h2><h2>Contact:{$contact}</h2>`
    .replace("{$name}",data.name)
    .replace("{$owner}",data.owner)
    .replace("{$contact}",data.contact)
} 