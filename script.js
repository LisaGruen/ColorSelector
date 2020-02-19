"use strict";

//get color from colorpicker
//get picked color in .box

function getColor() {
  let color = document.getElementById("color_head").value;
  //let hexcolor = document.getElementsByClassName(".Hex").innerHtml;
  document.body.style.backgroundColor = color;
  document.querySelector(".hex").innerHTML = "HEX " + color;
  let rgbColor = hexToRgb(color);
  console.log(rgbColor);
  document.querySelector(".rgb").innerHTML =
    "RGB " + rgbColor.r + ", " + rgbColor.g + ", " + rgbColor.b;
  let hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
  document.querySelector(".hsl").innerHTML =
    "HSL " + hslColor.h + ", " + hslColor.s + "%, " + hslColor.l + "%";
}

document.querySelector("#color_head").addEventListener("change", getColor);

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l)
  };
}
