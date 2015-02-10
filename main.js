function forced_reload(){localStorage.clear();}

function supports_html5_storage() {
  try {
    var sup = 'localStorage' in window && window['localStorage'] !== null;
      if(sup){
          localStorage.setItem("t", "");
          localStorage.removeItem("t");
      }
  } catch (e) {
    return false;
  }
}
function get_image_from_server(img_name, image)
{
        var xhr = new XMLHttpRequest(), blob, fileReader = new FileReader();
        xhr.open("GET", img_name, true);
        xhr.responseType = "arraybuffer";
        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                blob = new Blob([xhr.response], {type: "image/jpg"});
                fileReader.onload = function (evt) {
                    var result = evt.target.result;
                    image.setAttribute("src", result);
                    try {
                        localStorage.setItem(img_name, result);
                    }
                    catch (e) {
                        console.log("Storage failed: " + e);
                    }
                };
                // Load blob as Data URL
                fileReader.readAsDataURL(blob);
            }
        }, false);
        // Send XHR
        xhr.send();
}
function img_from_strg(image)
{
var dataImage = localStorage.getItem(image.getAttribute('data-src'));
    if(dataImage == null || dataImage === "undefined" )
    {
        
       get_image_from_server(image.getAttribute('data-src'), image);
    }
    else
    {
    image.src = dataImage;
    }
}

function init()
{
if(!supports_html5_storage())
{
var cells = document.getElementsByTagName("img"); 
    for(var i = 0; i < cells.length; i++)
    {
        img_from_strg(cells.item(i));
    }
}
    else //fallback for inprivate where localstorage is disabled
    {
    var cells = document.getElementsByTagName("img"); 
    for(var i = 0; i < cells.length; i++)
    {
        cells.item(i).src = cells.item(i).getAttribute("data-src");
    }
    }
}



