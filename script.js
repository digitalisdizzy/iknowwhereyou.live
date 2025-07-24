function setInfo(info){
    if(info == null){
        document.getElementById("ip").textContent = "105.16.207.142"
        document.getElementById("other").textContent = ""
    } else {
        document.getElementById("ip").textContent = info.ipAddress
        document.getElementById("other").innerHTML = `${info.cityName}, ${info.countryName}<br>Latitude ${info.latitude}, Longitude ${info.longitude}<br>ISP: ${info.asnOrganization}`
    }
}

function getInfo(){return new Promise((resolve, reject) => {
    fetch("https://free.freeipapi.com/api/json").then(r => r.json().then(d => {
        if(!r.ok){
            reject(d)
        }
        resolve(d)
    })).catch(e => {
        reject(e)
        return
    })
})}

async function getAndSetInfo(){
    getInfo().then(setInfo).catch(setInfo.bind(null, null))
}

function show(el){
    el.classList.remove("hidden")
    el.classList.add("visible")
}
function hide(el){
    el.classList.add("hidden")
    el.classList.remove("visible")
}

getAndSetInfo()

document.getElementById("play").addEventListener("click", () => {
    hide(document.getElementById("play"))
    document.getElementById("mainvideo").play()
})
document.getElementById("mainvideo").addEventListener("timeupdate", () => {
    if(document.getElementById("mainvideo").currentTime >= 34){
        document.getElementById("mainvideo").currentTime = 12.5
    } else if(document.getElementById("mainvideo").currentTime >= 12) {
        show(document.getElementById("ip"))
        show(document.getElementById("other"))
    } else {
        hide(document.getElementById("ip"))
        hide(document.getElementById("other"))
    }
})
