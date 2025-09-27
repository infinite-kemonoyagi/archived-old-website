const signature = document.getElementById('my-signature');
const signatureWidthOG = signature.offsetWidth;
let mouseSignature = false;

const image = document.getElementById('image');
const imageBG = document.getElementById('bg-image');
var imageWidth = image.offsetWidth;
var imageHeight = image.offsetHeight;
var imageBGW = imageBG.offsetWidth;
var imageBGH = imageBG.offsetHeight;

const ringElement = document.getElementById('rings');
const ringWidth = ringElement.offsetWidth;
let signature_interval = null;
let ytVideo_interval = null;
let music_plaer_interval = null;
let image_interval = null;
let rings_interval = null;
let images_interval = new Map();
let contents_interval = new Map();
let contentTabs_interval = new Map();

const musicPlayer = document.getElementById('music-player');
const musicPlayerBG = document.getElementById('music-player-bg');
const musicElements = document.getElementsByClassName('music-element');
const musicBarBG = document.getElementById('music-bar-bg');
const musicBar = document.getElementById('music-bar');
const musicBarCircle = document.getElementById('music-circle');
const musicBarHitbox = document.getElementById('music-bar-hitbox');
const musicTime = document.getElementById('music-player-time');

// let curMusic = new Audio();
const music = document.getElementById('music');
let curMusicPath = ``;
let musicPaused = false;
// const music = new Audio();

const images = document.getElementsByClassName('image-sel');
const contents = document.getElementsByClassName('all-contents');
const contentsTabs = document.getElementsByClassName('name-content-sel');

ringElement.style.left = `calc(100% - ${ringWidth}px - 25px)`;
image.style.left = `calc(50% - ${(imageWidth / 2)}px)`;
image.style.top = `calc(50% - ${(imageHeight / 2)}px)`;
imageBG.style.left = `calc(50% - ${(imageBGW / 2)}px)`;
imageBG.style.top = `calc(50% - ${(imageBGH / 2)}px)`;

window.addEventListener("resize", (_) => {resizeImagePreview();});

musicPlayerBG.style.top = "100vh";
musicPlayerBG.style.opacity = "0";
musicPlayerBG.style.left = `${(screen.width - musicPlayerBG.clientWidth) / 2}px`;

function resizeImagePreview() 
{
    imageWidth = image.offsetWidth;
    imageHeight = image.offsetHeight;
    imageBGW = imageBG.offsetWidth;
    imageBGH = imageBG.offsetHeight;

    image.style.left = `calc(50% - ${(imageWidth / 2)}px)`;
    image.style.top = `calc(50% - ${(imageHeight / 2)}px)`;
    imageBG.style.left = `calc(50% - ${(imageBGW / 2)}px)`;
    imageBG.style.top = `calc(50% - ${(imageBGH / 2)}px)`;

    musicPlayerBG.style.left = `${(screen.width - musicPlayerBG.clientWidth) / 2}px`;
}

ringElement.style.opacity = 0;

signature.style.transform = `scale(1)`;

var bgColorsArt = {};
var musicList = {};

fetch("scripts/colorsArts.json")
 .then(a => a.json())
 .then(b => bgColorsArt = b)
 .catch(error => console.error(error));

fetch("scripts/musicList.json")
 .then(a => a.json())
 .then(b => musicList = b)
 .catch(error => console.error(error));

var channelID = "UCNCFay8HB5XBx1zAZaRMIEg";
var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

try
{
    $.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+channelID, function(data) {
        var link = data.items[0].link;
        document.getElementById("youtube_vid_information").innerHTML = 
            "<a> Last video uploaded <br /> <br />" + 
            `<span style=\"color: white\"> Title: <a id="__link__name__youtube__" href=\"${link}\" style="text-decoration: none; color: rgb(153, 130, 170);">` + data.items[0].title + "<a /> <br /> <br />" +
            "<span style=\"color: white\"> Date: <span style=\"color: rgb(153, 130, 170);\">" + data.items[0].pubDate.split(" ")[0] + "<br /> <br />" +
            "<a />";
        
        const link_name = document.getElementById("__link__name__youtube__");

        link_name.addEventListener("mouseover", function(_)
        {
            link_name.style.color = "yellow";
        });

        link_name.addEventListener("mouseout", function(_)
        {
            link_name.style.color = "rgb(153, 130, 170)";
        });

        var id = link.substr(link.indexOf("=")+1);
        $("#youtube_video").attr("src","https://youtube.com/embed/"+id + "?controls=0&showinfo=0&rel=0");

        const ytVid = document.getElementById("youtube_video");
        ytVid.addEventListener("mouseover", function(_) 
        {
            var scaleX = ytVid.getBoundingClientRect().width / ytVid.offsetWidth;
            var width = parseFloat(scaleX);
    
            clearInterval(ytVideo_interval);
            ytVideo_interval = setInterval(frame, 10);
    
            function frame() 
            {
                if (width.toFixed(2) == 1.05) 
                {
                    clearInterval(ytVideo_interval);
                } 
                else 
                {
                    width += (1.05 - width) * 0.2;
                    ytVid.style.transform = `scale(${width})`;
                    ytVid.style.transformOrigin = "center center";
                }
            }
        });
    
        ytVid.addEventListener("mouseout", function(_) 
        {
            var scaleX = ytVid.getBoundingClientRect().width / ytVid.offsetWidth;
            var width = parseFloat(scaleX);
    
            clearInterval(ytVideo_interval);
            ytVideo_interval = setInterval(frame, 10);
    
            function frame() 
            {
                if (width.toFixed(2) == 1) 
                {
                    clearInterval(ytVideo_interval);
                } 
                else 
                {
                    width += (1 - width) * 0.2;
                    ytVid.style.transform = `scale(${width})`;
                    ytVid.style.transformOrigin = "center center";
                }
            }
        });
    });
}
catch(_)
{
    console.warn("no internet connection");
    document.getElementById("media-content").outerHTML = "";
}

signature.addEventListener("mouseover", function(_) 
{
    signature.style.cursor = "pointer"; 
    mouseSignature = true;

    var scaleX = signature.getBoundingClientRect().width / signature.offsetWidth;
    var width = parseFloat(scaleX);

    clearInterval(signature_interval);
    signature_interval = setInterval(frame, 10);

    function frame() 
    {
        if (width.toFixed(2) == 1.1) 
        {
            clearInterval(signature_interval);
        } 
        else 
        {
            width += (1.1 - width) * 0.2;
            signature.style.transform = `scale(${width})`;
            signature.style.transformOrigin = "center center";
        }
    }
});

document.addEventListener("keypress", (ev) => {
    if (ev.key === 'R' && ev.shiftKey)
        coinsSystem.current.rings = 0;
});

signature.addEventListener("click", function() 
{
    document.getElementById("sonic-ring").currentTime = 0;
    document.getElementById("sonic-ring").play();
    coinsSystem.current.addRings(1);

    ringElement.innerHTML = 'Rings: <span style="color: white;"> ' + coinsSystem.current.getRings();
    ringElement.style.left = `calc(100% - ${ringWidth}px - 25px)`;
    ringElement.style.opacity = 1;
});

signature.addEventListener("mouseout", function(_) 
{
    mouseSignature = false;

    var scaleX = signature.getBoundingClientRect().width / signature.offsetWidth;
    var width = parseFloat(scaleX);

    clearInterval(signature_interval);
    signature_interval = setInterval(frame, 10);

    function frame() 
    {
        if (width.toFixed(2) == 1) 
        {
            clearInterval(signature_interval);
        } 
        else 
        {
            width += (1 - width) * 0.2;
            // signature.style.width = width + 'px';
            signature.style.transform = `scale(${width})`;
            signature.style.transformOrigin = "center center";
        }
    }
});

imageBG.addEventListener("click", function() 
{
    const imageStyle = window.getComputedStyle(image);

    var scaleX = image.getBoundingClientRect().width / image.offsetWidth;
    var width =  parseFloat(scaleX);
    var opacity = parseFloat(imageStyle.opacity);

    clearInterval(image_interval);
    image_interval = setInterval(frame, 10);

    function frame() 
    {
        if (opacity.toFixed(2) == 0) 
        {
            clearInterval(image_interval);
            image.style.visibility = imageBG.style.visibility = "hidden";
        } 
        else 
        {
            width -= 1 * (1 / 60);
            opacity += (0 - opacity) * 0.3;
            image.style.opacity = `${opacity}`;
            imageBG.style.opacity = `${opacity * 0.5}`;
            image.style.transform = `scale(${width})`;
            image.style.transformOrigin = "center center";
        }
    }
});

for (let i = 0; i < images.length; ++i)
{
    const element = images.item(i);
    const elementByID = document.getElementById(element.id);

    const element2 = window.getComputedStyle(element);

    if (elementByID.id.startsWith('music-'))
    {
        elementByID.style.width = "30%";
    }

    element.addEventListener("click", function() 
    {
        switch (elementByID.id.split('-')[0]) 
        {
            case 'image':

                image.setAttribute('src', elementByID.getAttribute('src'));

                const imageStyle = window.getComputedStyle(image);
    
                image.style.transform = "scale(0.5)";
    
                var scaleX = image.getBoundingClientRect().width / image.offsetWidth;
                var width =  parseFloat(scaleX);
    
                image.style.visibility = "visible";
                imageBG.style.visibility = "visible";
                image.style.opacity = 0;
                imageBG.style.opacity = 0;
    
                resizeImagePreview();
    
                var opacity = parseFloat(imageStyle.opacity);
    
                clearInterval(image_interval);
                image_interval = setInterval(frame, 10);
            
                function frame() 
                {
                    if (opacity.toFixed(2) == 1) 
                    {
                        clearInterval(image_interval);
                    } 
                    else 
                    {
                        width += (1 - width) * 0.2;
                        opacity += (1 - opacity) * 0.1;
                        image.style.opacity = `${opacity}`;
                        imageBG.style.opacity = `${opacity / 2}`;
                        image.style.transform = `scale(${width})`;
                        image.style.transformOrigin = "center center";
                    }
                }
                break;

            case 'music':

                const rect = musicBarBG.getClientRects()[0];
                const barX = rect.left + window.scrollX;
                const barY = rect.top + window.scrollY;

                for (let i = 0; i < musicElements.length; ++i)
                {
                    const musicElem = musicElements.item(i);
                    const musicElemID = document.getElementById(musicElem.id);
                
                    const musicElem2 = window.getComputedStyle(musicElem);

                    let musicTop = parseFloat(musicPlayerBG.style.top.replace('vh', ''));
                    let musicOpacity = parseFloat(musicPlayerBG.style.opacity);

                    music.src = curMusicPath = `assets/music/${musicList[elementByID.id].path}`;
                    music.volume = 0.25;
                    music.load();
                    music.addEventListener('canplaythrough', () => 
                    {
                        music.play();
                    });

                    music.addEventListener("timeupdate", (ev) =>
                    {
                        if (!musicBarPressed && music.src !== '') 
                        {
                            musicBar.style.width = `calc(${musicBarBG.offsetWidth}px * ${music.currentTime / music.duration} - 20px)`;
                            musicBar.style.left = `calc(${musicBarBG.offsetLeft}px + 4px)`;
    
                            if (music.currentTime > 0) 
                                musicBarCircle.style.left = `calc(${musicBarBG.offsetLeft}px + (${musicBarBG.offsetWidth - 15}px 
                                    * ${music.currentTime / music.duration}))`;
                            else
                                musicBarCircle.style.left = `${musicBarBG.offsetLeft}px`;

                            musicTime.innerText = `${getTime(music.currentTime)} / ${getTime(music.duration)}`;
                        }
                    });

                    if (musicElemID.id === "music-player-name")
                    {
                        musicElemID.innerHTML = musicList[elementByID.id].name;
                    }

                    musicBar.style.width = `${musicBarBG.offsetWidth}px`;
                    musicBar.style.left = `calc(${musicBarBG.offsetLeft}px + 4px)`;
                    musicBarHitbox.style.left = `calc(${musicBarBG.offsetLeft}px)`;
                    musicBarCircle.style.left = `${musicBarBG.clientLeft}px`;
                    musicBarCircle.style.top = `${musicBarBG.clientTop + 15}px`;
                    musicBar.style.width = '0px';

                    clearInterval(music_plaer_interval);
                    music_plaer_interval = setInterval(frame, 10);

                    musicPlayerBG.style.visibility = "visible";

                    function frame()
                    {
                        if (musicTop.toFixed(2) == 80) 
                        {
                            clearInterval(music_plaer_interval);
                        } 
                        else 
                        {
                            musicTop += (80 - musicTop) * 0.1;
                            musicOpacity += (1 - musicOpacity) * 0.15;
                            musicPlayerBG.style.top = `${musicTop}vh`;
                            musicPlayerBG.style.opacity = `${musicOpacity}`;
                        }
                    }
                }

                break;
        
            default:
                break;
        }
    });

    elementByID.addEventListener("mouseover", function(_) 
    {
        element.style.cursor = "pointer";

        var scaleX = elementByID.getBoundingClientRect().width / elementByID.offsetWidth;
        var width = parseFloat(scaleX);
        var opacity = parseFloat(element2.opacity);

        clearInterval(images_interval.get(elementByID.id));
        images_interval.set(elementByID.id, setInterval(frame, 10));

        gsap.to(document.getElementById('art'), 
        {
            duration: 0.4,
            backgroundColor: bgColorsArt[elementByID.id],
            ease: 'power1.inOut'
        });

        gsap.to(document.getElementsByClassName('images-title'), 
        {
            duration: 0.4,
            backgroundColor: bgColorsArt[elementByID.id],
            ease: 'power1.inOut'
        });
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(images_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (1 - opacity) * 0.2;
                width += (1.05 - width) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
                elementByID.style.transform = `scale(${width})`;
                elementByID.style.transformOrigin = "center center";
            }
        }
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        var scaleX = elementByID.getBoundingClientRect().width / elementByID.offsetWidth;
        var width = parseFloat(scaleX);
        var opacity = parseFloat(element2.opacity);

        clearInterval(images_interval.get(elementByID.id));
        images_interval.set(elementByID.id, setInterval(frame, 10));

        gsap.to(document.getElementById('art'), 
        {
            duration: 0.4,
            backgroundColor: '#6f5b7a',
            ease: 'power1.inOut'
        });

        gsap.to(document.getElementsByClassName('images-title'), 
        {
            duration: 0.4,
            backgroundColor: '#6f5b7a',
            ease: 'power1.inOut'
        });
    
        function frame() 
        {
            if (opacity.toFixed(2) == 0.7) 
            {
                clearInterval(images_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (0.7 - opacity) * 0.2;
                width += (1 - width) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
                elementByID.style.transform = `scale(${width})`;
                elementByID.style.transformOrigin = "center center";
            }
        }
    });
}

for (let i = 0; i < contents.length; ++i)
{
    const element = contents.item(i);
    const elementByID = document.getElementById(element.id);

    const element2 = window.getComputedStyle(element);

    elementByID.addEventListener("mouseover", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contents_interval.get(elementByID.id));
        contents_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(contents_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (1 - opacity) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
            }
        }
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contents_interval.get(elementByID.id));
        contents_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 0.5) 
            {
                clearInterval(contents_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (0.5 - opacity) * 0.03;
                elementByID.style.opacity = `${opacity}`;
            }
        }
    });
}

for (let i = 0; i < contentsTabs.length; ++i)
{
    const element = contentsTabs.item(i);
    const elementByID = document.getElementById(element.id);

    const element2 = window.getComputedStyle(element);

    elementByID.style.cursor = 'pointer';

    elementByID.addEventListener("click", function(ev)
    {
        const parent = elementByID.parentElement;
        const name = elementByID.id.split('-')[2];
        const section = document.getElementById(`content-${name}-section`);
        console.trace(section.offsetTop);

        parent.scrollTo({top: section.offsetTop, behavior: 'smooth'});
    });

    elementByID.addEventListener("mouseover", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contentTabs_interval.get(elementByID.id));
        contentTabs_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(contentTabs_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (1 - opacity) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
            }
        }
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contentTabs_interval.get(elementByID.id));
        contentTabs_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 0.5) 
            {
                clearInterval(contentTabs_interval.get(elementByID.id));
            } 
            else 
            {
                opacity += (0.5 - opacity) * 0.03;
                elementByID.style.opacity = `${opacity}`;
            }
        }
    });
}

for (let i = 0; i < musicElements.length; ++i)
{
    const musicElemItem = musicElements.item(i);
    const musicElem = document.getElementById(musicElemItem.id);

    const musicElem2 = window.getComputedStyle(musicElemItem);

    const musicID = musicElem.id;

    musicElem.addEventListener("mouseover", ev => 
    {
        if (!musicID.startsWith('music-button')) return;
        musicElem.style.cursor = "pointer";
        musicElem.style.opacity = 1;
    });

    musicElem.addEventListener("click", ev =>
    {
        if (musicPlayerBG.style.visibility === "visible")
        {
            switch (musicID)
            {
                case 'music-button-player-pause':
                    
                    musicPaused = true;
                    music.pause();

                    break;

                case 'music-button-player-stop':

                    music.src = "";

                    break;

                case 'music-button-player-play':

                    if (!musicPaused && !music.playing)
                    {
                        music.src = curMusicPath;
                        music.load();
                    }

                    musicPaused = false;

                    music.play();

                    break;

                case 'music-button-player-close':

                    music.src = "";

                    let musicTop = parseFloat(musicPlayerBG.style.top.replace('vh', ''));
                    let musicOpacity = parseFloat(musicPlayerBG.style.opacity);

                    musicPaused = false;

                    clearInterval(music_plaer_interval);
                    music_plaer_interval = setInterval(frame, 10);

                    function frame()
                    {
                        if (musicTop.toFixed(2) == 100) 
                        {
                            clearInterval(music_plaer_interval);
                        } 
                        else 
                        {
                            musicTop *= 1.005;
                            musicOpacity += (0 - musicOpacity) * 0.2;
                            musicPlayerBG.style.top = `${musicTop}vh`;
                            musicPlayerBG.style.opacity = `${musicOpacity}`;
                        }
                    }

                    break;
            }
        }
    });

    musicElem.addEventListener("mouseout", ev => 
    {
        if (!musicID.startsWith('music-button')) return;
        musicElem.style.opacity = 0.6;
    });
}

let mouseX = 0;
let mouseY = 0;
let musicBarPressed = false;

musicBarHitbox.addEventListener('mousedown', (e) => 
{
    musicBarPressed = true;
    musicBarCircle.style.left = `${musicBarBG.offsetLeft + mouseX - (musicBarCircle.offsetWidth / 2)}px`;
});

document.addEventListener('mouseup', () => 
{
    if (musicBarPressed)
    {
        music.currentTime = ((musicBarCircle.offsetLeft - musicBarBG.offsetLeft) 
            / (musicBarBG.offsetWidth - Math.ceil(musicBarCircle.offsetWidth / 2))) * music.duration;
    }

    musicBarPressed = false;
});

musicBarHitbox.addEventListener('mousemove', (e) => 
{
    if (musicBarPressed) 
    {
        const newX = e.offsetX;

        musicBarCircle.style.left = `${musicBarBG.offsetLeft + newX - (musicBarCircle.offsetWidth / 2)}px`;

        if ((musicBarCircle.offsetLeft) < musicBarBG.offsetLeft) musicBarCircle.style.left = `${musicBarBG.offsetLeft}px`;

        if ((musicBarCircle.offsetLeft) > ((musicBarBG.offsetLeft + musicBarBG.offsetWidth) - (musicBarCircle.offsetWidth / 2)))
            musicBarCircle.style.left = `${(musicBarBG.offsetLeft + musicBarBG.offsetWidth) - (musicBarCircle.offsetWidth / 2)}px`;

        musicBar.style.width = `${musicBarCircle.offsetLeft - musicBarBG.offsetLeft}px`;

        const time = ((musicBarCircle.offsetLeft - musicBarBG.offsetLeft) 
            / (musicBarBG.offsetWidth - Math.ceil(musicBarCircle.offsetWidth / 2))) * music.duration;
        
        musicTime.innerText = `${getTime(time)} / ${getTime(music.duration)}`;
    }
    mouseX = e.offsetX;
});



/**
 * 
 * @seconds {number} seconds 
 * @param {string} [format='HH:mm:ss'] 
 * @returns {string}
 */
function getTime(seconds, format = 'HH:mm:ss') 
{
    // seconds %= 60;
    seconds = Math.floor(seconds);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 12);

    seconds %= 60;
  
    if (format === 'DD:HH:mm:ss' && days >= 1)
    {
        hours %= 12;
        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    else if (format === 'HH:mm:ss' && hours >= 1)
    {
        minutes %= 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    else if (format === 'mm:ss' || (format === 'HH:mm:ss' && hours < 1))
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    else if (format === 'ss')
        return `${seconds.toString().padStart(2, '0')}`;
    else
        throw new Error('Format don\'t available');
  }