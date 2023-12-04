function rand(min, max) {
    return parseInt(Math.random() * (max-min+1), 10) + min;
}

function randomColor() {
    var h = rand(MINE_COLORS[0], MINE_COLORS[1]);
    var s = rand(MINE_COLORS[2], MINE_COLORS[3]);
    var l = rand(MINE_COLORS[4], MINE_COLORS[5]);
    return `hsl(${h},${s}%,${l}%)`;
}

const settingsButton = document.querySelector(".settings");
const settingsMenu = document.querySelector(".settings-menu");
const closeModal = document.querySelector("#close-modal");
const resetModal = document.querySelector("#reset-modal");
const submitModal = document.querySelector("#submit-modal");

const primaryClosed = document.querySelector("#dark-closed");
const secondaryClosed = document.querySelector("#light-closed");
const primaryOpen = document.querySelector("#dark-open");
const secondaryOpen = document.querySelector("#light-open");

const numberColors = document.querySelectorAll(".number-color-input");

const minHue = document.querySelector("#min-hue");
const maxHue = document.querySelector("#max-hue");
const minSat = document.querySelector("#min-sat");
const maxSat = document.querySelector("#max-sat");
const minLig = document.querySelector("#min-lig");
const maxLig = document.querySelector("#max-lig");
const mineColor = document.querySelector("#mine-color");

const flagBgcolor = document.querySelector("#flag-bgcolor");
const flagColor = document.querySelector("#flag-color");

const displayBorder = document.querySelector("#display-border");
const borderColor = document.querySelector("#border-color");
const borderSize = document.querySelector("#bordrr-size");


function resetTileColors(){
    for( i = 0; i < Height; i++){ 
        for(j = 0; j < Width; j++){ 
            const tile =  board[j][i];
            if(tile.clicked ){
                tile.element.style.backgroundColor = TILE_COLORS[ (i + j)%2 + 2 ];
                tile.element.style.color = COLORS[tile.number-1];
            } else if( !tile.flag ){
                tile.element.style.backgroundColor = TILE_COLORS[ (i + j)%2 ];
            } else if( tile.flag){
                tile.element.style.backgroundColor = FLAG_COLORS[0];
                tile.element.firstChild.style.borderRight = `24px solid ${FLAG_COLORS[1]}`;
            }
            tile.openColor = TILE_COLORS[ (i+j) % 2 + 2];
            tile.closedColor =  TILE_COLORS[ (i + j)%2 ];
        }
    }
}

settingsButton.addEventListener("click", () => {
    settingsMenu.showModal()
});

closeModal.addEventListener("click", () => {
    settingsMenu.close();
})

resetModal.addEventListener("click", () => {
    primaryClosed.value = "#a4ffa4";
    secondaryClosed.value = "#61fd6d";
    primaryOpen.value = "#ffffff";
    secondaryOpen.value = "#F0F8FF";

    minHue.value = "0";
    maxHue.value = "360";
    minSat.value = "90";
    maxSat.value = "100";
    minLig.value = "50";
    maxLig.value = "70";

    COLORS = ["#0000ff","#008000","#ff0000","#00008b","#a52a2a","#00ffff","#000000","#808080"];
    numberColors.forEach( (input,index) => input.value = COLORS[index]);
    
    mineColor.value = "#000000";

    flagBgcolor.value = "#ffff00";
    flagColor.value = "#000000";

    displayBorder.checked = true;
    borderColor.value = "#000000";
})

submitModal.addEventListener("click", () => {
    settingsMenu.close();
    TILE_COLORS[0] = primaryClosed.value;
    TILE_COLORS[1] = secondaryClosed.value;
    TILE_COLORS[2] = primaryOpen.value;
    TILE_COLORS[3] = secondaryOpen.value;

    numberColors.forEach( (input,index) => COLORS[index] = input.value);

    MINE_COLORS[0] = parseInt(minHue.value);
    MINE_COLORS[1] = parseInt(maxHue.value);
    MINE_COLORS[2] = parseInt(minSat.value);
    MINE_COLORS[3] = parseInt(maxSat.value);
    MINE_COLORS[4] = parseInt(minLig.value);
    MINE_COLORS[5] = parseInt(maxLig.value);
    MINE_COLOR[0] = mineColor.value;

    FLAG_COLORS[0] = flagBgcolor.value;
    FLAG_COLORS[1] = flagColor.value;

    document.documentElement.style.setProperty('--border-color', borderColor.value);
    DisplayBorder = displayBorder.checked;
   
    checkAllBorders();
    resetTileColors();
});
