function collison(c1,c2) {
    let dst
	const dx = c1.x - c2.x
	const dy = c1.y - c2.y
	dst = Math.sqrt(dx*dx + dy*dy)
    return (dst < c1.radius + c2.radius)
} 
function playAudio(src,vlm=10) {
    const ad = new Audio()
    ad.src = src
    ad.volume = vlm / 10
    ad.play()
}
function newImage(src) {
    const img = new Image()
    img.src = src 
    return img
}