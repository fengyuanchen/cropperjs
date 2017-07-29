<div class="mainContent"></div>
<BR><BR>
<div class="row form-group">
  <div class="storedImagesList col-md-12">  
  <?PHP
  $mysqli = new mysqli("localhost", "root", "", "images");
  $images = $mysqli->query("SELECT * FROM images");
  foreach ($images as $image){
  print('<div class="col-sm-3 m-0 p-0">            
          <div class="col-sm-12 m-0 p-0" style="position:relative;height:85px;">            
            <div class="col-sm-7 text-center m-0 p-0">            
            <img class="imgList" src="' . $image["directory"] . '/thumb/thumb_' . $image["uploadedName"] . '" title="Size: ' . $image["size"] . 'kb" >
            </div>
            <div class="col-sm-5 m-0 p-0" style="overflow: hidden;margin-bottom:4px;"> 
            Height: ' . $image["height"] . '<br>
            Width:  ' . $image["width"] . ' <br>
            Title: ' . $image["title"] . ' 
            </div>
          </div>

          <div class="col-sm-12">            
            <div class="col-sm-1">            
              <input type="checkbox" id="' . $image["id"] . '" class="deleteImage"  data-uploadedname="' . $image["uploadedName"] . '" data-directory="' . $image["directory"] . '">
            </div>          
            <div class="col-sm-10">            
              <span id="' . $image["id"] . '" class="editImage btn btn-sm btn-primary" data-title="' . $image["title"] . '" data-directory="' . $image["directory"] . '" data-link="' . $image["link"] . '" data-height="' . $image["height"] . '" data-width="' . $image["width"] . '" data-uploadedName="' . $image["uploadedName"] . '" data-originalName="' . $image["originalName"] . '">Edit</span>
              <span id="' . $image["id"] . '" class="recrop btn btn-sm btn-primary" data-title="' . $image["title"] . '" data-directory="' . $image["directory"] . '" data-link="' . $image["link"] . '" data-tags="' . $image["tags"] . '" data-uploadedName="' . $image["uploadedName"] . '" data-originalName="' . $image["originalName"] . '">Crop / Scale</span>
            </div>          
          </div>          
        </div>'); 
      }
    ?>
  </div> 
  <span class="btn-primary btn deleteImageBtn">Delete Selected</span>
 
  <BR><div class="horizontalBar"></div><BR>
  <label class="col-sm-2 control-label">Upload New</label>
  <div class="col-sm-10">
    <div class="col-sm-12 panel panel-success">
      <Span class="dropzone" name="userfile" id="my-awesome-dropzone"></span>
      <input type="hidden" class="uploadedImage" name="image">
    </div>
  </div>
</div>
<div class="datGUI"></div>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/dropzone.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.1/cropper.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.4/dat.gui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/dropzone.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.1/cropper.min.js"></script>

<style type="text/css">
.m-0 {
    margin: 0px;
}
.p-0 {
    padding: 0px;
  }
.imgList {
    max-height: 80px;
    max-width: 120px;
}
.storedImagesList {
    max-height: 200px;
    width: 100%;
    position: relative;
    overflow: auto;
    overflow-x: hidden;
    margin-bottom: 10px;
}
.deleteImageBtn{
  margin-left: 35px;
}
.horizontalBar {
    position: relative;
    width: 100%;
    height: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #337ab7;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

</style>
<script type="text/javascript">
<!--
var cropper;
var imageData = {};
var cropBoxData;
var canvasData;
var cropper;
var result = document.getElementById('formresults');
var croppedCanvas, croppedImage, cropStyle;
var selectedId;
var removeDiv;

Dropzone.options.myAwesomeDropzone = {
  init: function() {
    this.on("success", function(file, response) { 
        responseData = JSON.parse(response);
        imageData["uploadedName"] = responseData.newName;
        $("#newUploadedImage").attr("src", "./files/" +responseData.newName); 
        $("#image").attr("src", "./files/" +responseData.newName); 
        $(".uploadedImage").val("./files/" +responseData.newName); 
        $(".uploadedImage").attr("name", file.name); 
        $(".oldImageHeight").html(responseData.height); 
        $(".oldImageWidth").html(responseData.width); 
        $(".newImageHeight").val(responseData.height); 
        $(".newImageWidth").val(responseData.width); 
        $(".newCropImageHeight").html(responseData.height); 
        $(".newCropImageWidth").html(responseData.width); 
        $(".cropper-view-box").css("border-radius", "0%");
        $(".cropper-face").css("border-radius", "0%");
        var image = document.getElementById('newUploadedImage');
        imageData["originalName"] = file.name;
        var croppable = false;        
        cropper = new Cropper(image, {
          autoCropArea: 1,
          viewMode: 1,  
          ready: function() {
            // Strict mode: set crop box data first
            croppable = true;
            imageRefreshInfo();
            image.addEventListener('zoom', function (e) {
              imageRefreshInfo();
            });
            image.addEventListener('cropmove', function (e) {
              imageRefreshInfo();
            });
          }
        });
        $('.imageModal').show();
    });
  }
};

function imageRefreshInfo(){
  currentWidth = cropper.getImageData().width;
  oldWidth = cropper.getImageData().naturalWidth;
  zoomLevelCropper = (currentWidth / oldWidth);
  outputWidth = cropper.getCropBoxData().width;
  outputHeight = cropper.getCropBoxData().height;
  cropBoxData = cropper.getCropBoxData();
  canvasData = cropper.getCanvasData();
  croppedCanvas = cropper.getCroppedCanvas();
  resizedCanvas = getCroppedCanvas(croppedCanvas);
  croppedImage = document.createElement('img');
  croppedImage.src = resizedCanvas.toDataURL();
  if (zoomLevelCropper < 1) {
    $(".newCropImageHeight").html(Math.round(outputHeight / zoomLevelCropper)); 
    $(".newCropImageWidth").html(Math.round(outputWidth / zoomLevelCropper)); 
    $(".newImageHeight").val(Math.round(outputHeight / zoomLevelCropper)); 
    $(".newImageWidth").val(Math.round(outputWidth / zoomLevelCropper)); 

  } else {
    $(".newCropImageHeight").html(Math.round(cropper.getCropBoxData().height)); 
    $(".newCropImageWidth").html(Math.round(cropper.getCropBoxData().width)); 
    $(".newImageHeight").val(Math.round(cropper.getCropBoxData().height)); 
    $(".newImageWidth").val(Math.round(cropper.getCropBoxData().width)); 
  }
  $(".zoomLevelCropper").html((zoomLevelCropper*100).toFixed(2) +'%');
}
function imageManagementBtns(){
  $('.deleteImageBtn').unbind('click').on('click', function(e) {
    var confirmBox = confirm("Do you want to delete these items?");
    if (confirmBox == true) {
      var deleteItems=[];
      $('.deleteImage').each(function (item) {
        if ($('.deleteImage')[item].checked) {
          deleteItems.push({id:$('.deleteImage')[item].id});
        }
      });
      for (D = 0; D < deleteItems.length; D++) {
      var selectedId = deleteItems[D].id;
      var removeDiv = $('#'+selectedId+'.deleteImage').parent().parent().parent();
      var directory = $('#'+selectedId+'.deleteImage').data().directory;
      var uploadedName = $('#'+selectedId+'.deleteImage').data().uploadedname;
          $.ajax({
            type: "POST",
            url: "./upload.php",
            data: {
              type: "updateImage",
              id: selectedId,
              directory: directory,
              uploadedName: uploadedName,
              task: "delete"
            },
            success: function(data) {
              data = JSON.parse(data);
              //need to fix it since as it deletes items it can't go to the next
              console.log(data);
              $('#'+data.id+'.deleteImage').parent().parent().parent().remove();
              $('option[value="'+data.uploadedName.split("\/").pop(-1)+'"]').remove();

            }
          });
        }
    } 
  });
  $('.recrop').unbind('click').on('click', function(e) {
        imageData["uploadedName"] = $(this).attr("data-uploadedname");
        currentImage = $(this).attr("data-uploadedname")
        currentImageName = $(this).attr("data-originalname")
        $("#newUploadedImage").attr("src", "./files/" +currentImage); 
        $("#image").attr("src", "./files/" +currentImage); 
        $(".uploadedImage").attr("name", currentImageName); 
        var image = document.getElementById('newUploadedImage');
        var croppable = false;        
        cropper = new Cropper(image, {
          autoCropArea: 1,
          viewMode: 1,
          ready: function() {
            // Strict mode: set crop box data first
            croppable = true;
          }
        });
        $('.imageModal').show();  
  });  

  $('.editImage').unbind('click').on('click', function(e) {
    var clickedItemData = $(e.target)[0].dataset;
    imageData = {
      id:e.target.id,
      height:clickedItemData.height,
      width:clickedItemData.width,
      title:clickedItemData.title,
      originalName:clickedItemData.originalname,
      uploadedName:clickedItemData.uploadedname,
      tags:clickedItemData.tags,
      link:clickedItemData.link,
      directory:clickedItemData.directory,
      size:clickedItemData.size
    };
    datGuiImages(e, imageData);
  });  
}
function datGuiImages(e, imageData) {
    targetDiv = e.target;
    var currentMousePos = { "x": "", "y": "" };
    currentMousePos.x = e.pageX;
    currentMousePos.y = e.pageY;
    $('.datGUI').css({ "position": "absolute", "z-index": "999999", "top": currentMousePos.y - 100, "left": currentMousePos.x - 250, "visibility": "visible" });
    $(".datGUI").show();
    gui = new dat.GUI({ autoPlace: false });
    $('.datGUI').html(gui.domElement);

    var disabled = gui.add(imageData, 'originalName', -5, 5);
    disabled.domElement.style.pointerEvents = "none"
    disabled.domElement.style.opacity = .5;    
    var disabled = gui.add(imageData, 'uploadedName', -5, 5);
    disabled.domElement.style.pointerEvents = "none"
    disabled.domElement.style.opacity = .5;    
    var disabled = gui.add(imageData, 'height', -5, 5);
    disabled.domElement.style.pointerEvents = "none"
    disabled.domElement.style.opacity = .5;    
    var disabled = gui.add(imageData, 'width', -5, 5);
    disabled.domElement.style.pointerEvents = "none"
    disabled.domElement.style.opacity = .5;    

    gui.add(imageData, 'title').listen();
   // gui.add(imageData, 'directory').listen();
    ((imageData.link) ? gui.add(imageData, 'link').listen() : "");
    // add a button
    var obj = {
        Save: function() {
          updateImageinDB("update");
        }
    };
    gui.add(obj, 'Save');
    var deleteImage = {
        Delete: function() {
          updateImageinDB("delete");
          $('#'+imageData.id +'.deleteImage').parent().parent().parent().remove()
          $('option[value="'+imageData.uploadedName+'"]').remove();

          $(".datGUI").hide();
        }
    };
    gui.add(deleteImage, 'Delete');

    $('.close-button').click(function() { $('.datGUI').html("") });
    var ele = document.getElementsByTagName("*");
    for (var id = 0; id < ele.length; ++id) { ele[id].oncontextmenu = null; };
    document.oncontextmenu = null;
    window.oncontextmenu = null;
    $(".datGUI").show();
    clickOutsideOf($(".datGUI"));
}

function updateImageinDB(task) {
  if(task == "update"){
    imageData["type"] = 'updateImage';
    console.log(imageData);
    $.ajax({
      type: "POST",
      url: "./upload.php",
      data: imageData,
      success: function(data) {
        //do something with the return of the php script
      }
    });
  } else if(task == "delete"){
  var confirmBox = confirm("Really delete this item?");
    if (confirmBox == true) {    
      $.ajax({type: "POST",url: "./upload.php",data: {id: imageData.id,directory: $.trim(imageData.directory),uploadedName: $.trim(imageData.uploadedName),task: "delete", type:"updateImage"}});
    }
  }
}

function getCroppedCanvas(sourceCanvas) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  if (zoomLevelCropper < 1) {
    var width = Math.round(outputWidth / zoomLevelCropper);
    var height = Math.round(outputHeight / zoomLevelCropper);    
  } else {
    var width = Math.round(cropper.getCropBoxData().width);
    var height = Math.round(cropper.getCropBoxData().height);  
  }  


  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  return canvas;
}
function storeImagetoDB() {
  var floatSize = imageData.size.toFixed(1);
  var fileName = $(".uploadedImage").attr("name"); 
    $.ajax({
      type: "POST",
      url: "./upload.php",
      data: {
        type:"storeImages",
        height: imageData.height,
        width: imageData.width,
        uploadedName: imageData.uploadedName,
        originalName: imageData.originalName,
        directory: "./files/",
        title: imageData.originalName,
        size: floatSize
      },
      success: function(data) {
        data = JSON.parse(data);
        //do something with the return of the php script
      $(".storedImagesList").append('\
        <div class="col-sm-3">\
          <div class="col-sm-12 m-0 p-0" style="position:relative;height:85px;">\
            <div class="col-sm-7 text-center m-0 p-0">\
            <img src="'+data.directory+'/thumb/thumb_'+data.uploadedName+'" title="Size: '+data.size+'kb" class="imgList">\
          </div>\
          <div class="col-sm-5 m-0 p-0" style="overflow: hidden;margin-bottom:4px;">\
            Height: '+data.height+'<br>\
            Width:  '+data.width+' <br>\
            Title: '+data.title+' \
          </div>\
          <div class="col-sm-12 text-center" style="margin-bottom:4px;">\
            '+data.title+'\
          </div>\
        <div class="col-sm-12">\
          <div class="col-sm-1">\
            <input id="'+data.id+'" class="deleteImage"  data-uploadedname="'+data.uploadedName+'" data-directory="'+data.directory+'" type="checkbox">\
          </div>\
          <div class="col-sm-10">\
            <span id="'+data.id+'" class="editImage btn btn-sm btn-primary" data-title="'+data.title+'" data-directory="'+data.directory+'" data-link="" data-tags="" data-uploadedname="'+data.uploadedName+'" data-height="'+data.height+'" data-width="'+data.width+'" data-originalname="'+fileName+'">Edit</span>\
            <span id="'+data.id+'" class="recrop btn btn-sm btn-primary" data-title="'+data.title+'" data-directory="'+data.directory+'" data-link="" data-tags="" data-uploadedname="'+data.uploadedName+'" data-originalname="'+fileName+'">Crop / Scale</span>\
          </div>\
        </div>\
      </div>');
 
      $('<option value="'+data.uploadedName+'"></option>').html(data.title).appendTo('.imagesMulti')

      imageManagementBtns();
      }
    });
}


$('.resizeImage').on('click', function() {
  var image = document.getElementById('newUploadedImage');
  cropper = new Cropper(image, {
    autoCropArea: 0.5,
    ready: function() {

      // Strict mode: set crop box data first
      cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
    }
  });
  $('.imageModal').show();

});

// Buttons Setup
imageManagementBtns();
</script>

<script type="text/javascript">
  var imageModal = `<div class="imageModal col-sm-10" style="z-index: 99999;position: absolute;top: 150px;left:5%;display:none">
  <div class="" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Image Sizing / Cropper</h5>
      </div>
      <div class="modal-body">
        <div class="img-container">
          <img id="newUploadedImage">
        </div>
      </div>
      <div class="row" id="actions">
        <div class="col-md-12 docs-buttons">
          <div class="btn-group col-md-5 p-0 m-0">
            <div class="col-md-12">
              <div class="btn-group" style="padding: 3px;">
                <button type="button" class="btn btn-primary btn-sm" data-method="setDragMode" data-option="move" title="Move">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;move&quot;)">
                    <span class="fa fa-arrows"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="setDragMode" data-option="crop" title="Crop">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;crop&quot;)">
                    <span class="fa fa-crop"></span>
                  </span>
                </button>
              </div>
              <div class="btn-group" style="padding: 3px;">
                <button type="button" class="btn btn-primary btn-sm" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(-10, 0)">
                    <span class="fa fa-arrow-left"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="move" data-option="10" data-second-option="0" title="Move Right">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(10, 0)">
                    <span class="fa fa-arrow-right"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, -10)">
                    <span class="fa fa-arrow-up"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="move" data-option="0" data-second-option="10" title="Move Down">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, 10)">
                    <span class="fa fa-arrow-down"></span>
                  </span>
                </button>
              </div>
              <div class="btn-group" style="padding: 3px;">
                <button type="button" class="btn btn-primary btn-sm" data-method="rotate" data-option="-45" title="Rotate Left">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(-45)">
                    <span class="fa fa-rotate-left"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="rotate" data-option="45" title="Rotate Right">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(45)">
                    <span class="fa fa-rotate-right"></span>
                  </span>
                </button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-primary btn-sm" data-method="scaleX" data-option="-1" title="Flip Horizontal">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleX(-1)">
                    <span class="fa fa-arrows-h"></span>
                  </span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-method="scaleY" data-option="-1" title="Flip Vertical">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleY(-1)">
                    <span class="fa fa-arrows-v"></span>
                  </span>
                </button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-primary btn-sm" data-method="reset" title="Reset">
                  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.reset()">
                    <span class="fa fa-refresh"></span>
                  </span>
                </button>
              </div>
            </div>
            <div class="col-md-12">
              <div class="btn-group docs-aspect-ratios" data-toggle="buttons" style="margin-left:3px">
                <label class="btn btn-primary active btn-sm">
                  <input type="radio" class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.7777777777777777">
                  <span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 16 / 9">
                    16:9
                  </span>
                </label>
                <label class="btn btn-primary btn-sm">
                  <input type="radio" class="sr-only" id="aspectRatio2" name="aspectRatio" value="1.3333333333333333">
                  <span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 4 / 3">
                    4:3
                  </span>
                </label>
                <label class="btn btn-primary btn-sm">
                  <input type="radio" class="sr-only" id="aspectRatio3" name="aspectRatio" value="1">
                  <span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 1 / 1">
                    1:1
                  </span>
                </label>
                <label class="btn btn-primary btn-sm">
                  <input type="radio" class="sr-only" id="aspectRatio5" name="aspectRatio" value="NaN">
                  <span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: NaN">
                    Free
                  </span>
                </label>
              </div>
              <div class="btn-group" style="margin-left:5px">
                <button type="button" class="btn btn-primary imageCropRound btn-sm" title="Crop Round">
                  Round
                </button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-primary imageCropSquare btn-sm" title="Crop Square">
                  Square
                </button>
              </div>
            </div>
          </div>
          <div class="btn-group col-md-7 p-0 m-0 pull-right">
            <div class="col-md-4 p-0 m-0"> 
              <div class="col-md-12 p-0 m-0 text-center" style="background-color: #337ab7;color:#FFF;height:22px; margin-bottom:8px;"> 
                  <span title="Change only one value, aspect ratio will be preserved." style="margin-left:4px;"> Resize Max Height / Width:</span>
              </div>
              <div class="col-md-12 p-0 m-0 text-center"> 
                Max Height: <input class="newImageHeight" size="7"><BR style="margin-bottom:5px;"> 
                Max Width: &nbsp;<input class="newImageWidth" size="7">
              </div>
            </div>
            <div class="col-md-2 p-0 m-0"> 
              <div class="col-md-12 p-0 m-0 text-center" style="background-color: #337ab7;color:#FFF;height:22px; margin-bottom:8px;"> 
                  Original Size:
              </div>
              <div class="col-md-12 p-0 m-0 text-center"> 
                  Height: <span  class="oldImageHeight"></span><BR>
                  Width: <span  class="oldImageWidth"></span><BR>
              </div>
            </div>
            <div class="col-md-3 p-0 m-0 text-center"> 
              <div class="col-md-12 p-0 m-0 text-center" style="background-color: #337ab7;color:#FFF;height:22px; margin-bottom:8px;"> 
                  Output Size:
              </div>
              <div class="col-md-12 p-0 m-0 text-center"> 
                  Height: <span  class="newCropImageHeight"></span><BR>
                  Width: <span  class="newCropImageWidth"></span><BR>
              </div>
            </div> 
            <div class="col-md-3 p-0 m-0"> 
              <div class="col-md-12 p-0 m-0 text-center" style="background-color: #337ab7;color:#FFF;height:22px; margin-bottom:8px;"> 
                  Current Zoom:
              </div>
              <div class="col-md-12 p-0 m-0 zoomLevelCropper text-center" style="text-align: center;"></div>      
            </div>      
          </div>      
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default saveImageModal">Save and Close</button>
        <button type="button" class="btn btn-default closeImageModal">Cancel</button>
      </div>
    </div>
  </div>
</div>`;

$('.mainContent').append(imageModal);


var Cropper = window.Cropper;
var URL = window.URL || window.webkitURL;
var container = document.querySelector('.img-container');
var download = document.getElementById('download');

function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  offsetTop = Math.round(cropper.getCropBoxData().top);
  offsetLeft = Math.round(cropper.getCropBoxData().left);  
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.ellipse(width/2, height/2, width/2, height/2, 0 * Math.PI, 0, 45 * Math.PI);
  context.fill();
  return canvas;
}


$(".imageCropRound").unbind("click").on('click', function() {
  $(".cropper-view-box").css("border-radius", "50%");
  $(".cropper-face").css("border-radius", "50%");
  cropper.setAspectRatio(0);
  croppedImage = document.createElement('img');
  cropStyle = "round";
});
$(".imageCropSquare").unbind("click").on('click', function() {
  $(".cropper-view-box").css("border-radius", "0%");
  $(".cropper-face").css("border-radius", "0%");
  cropper.setAspectRatio(0);
  croppedImage = document.createElement('img');
  cropStyle = "square";
});

$(".saveImageModal").unbind("click").on('click', function() {

  croppedImage.height = Math.round(cropper.getCropBoxData().height);
  croppedImage.width = Math.round(cropper.getCropBoxData().width);  
  if (cropStyle == "round") {
    croppedImage.src = getRoundedCanvas(croppedCanvas).toDataURL();
  }else{
    croppedImage.src = getCroppedCanvas(croppedCanvas).toDataURL();
  }
  console.log(croppedCanvas);
  filesize = $(croppedImage).attr("src").length * 0.75/1000;
  imageData.size = filesize;
  saveImageAction();
  $('.imageModal').hide();
  cropper.destroy();
});
function saveImageAction(){
  resize =$(".newImageResize").val();
  width=$(".newImageWidth").val();
  height=$(".newImageHeight").val();
  $.ajax({
    type: "POST",
    url: "./upload.php",
    data: {
      resize: resize,
      height: height,
      width: width,
      filename: "cropped.jpg",
      size: filesize,
      originalName: $(".uploadedImage").val(),
      name: "file",
      imgBase64: croppedImage.src
    },
    success: function(response) {
      data = JSON.parse(response);
      imageData.uploadedName = data.newFile;
      imageData.height = data.height;
      imageData.width = data.width;
      storeImagetoDB();
    }
  });
}
$(".closeImageModal").on('click', function() {
  $('.imageModal').hide();
  cropper.destroy();
});

$('.docs-aspect-ratios').on('click', function(event) {
    var e = event || window.event;
    var target = $(e.target).parent().find("input") || e.srcElement;
    console.log(e, target.val());
    cropper.setAspectRatio(target.val());
    });
$('.docs-buttons').on('click', function(event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  var result;
  var input;
  var data;

  if (!cropper) {
    return;
  }

  while (target !== this) {
    if (target.getAttribute('data-method')) {
      break;
    }

    target = target.parentNode;
  }

  if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
    return;
  }

  data = {
    method: target.getAttribute('data-method'),
    target: target.getAttribute('data-target'),
    option: target.getAttribute('data-option'),
    secondOption: target.getAttribute('data-second-option')
  };

  if (data.method) {
    if (typeof data.target !== 'undefined') {
      input = document.querySelector(data.target);

      if (!target.hasAttribute('data-option') && data.target && input) {
        try {
          data.option = JSON.parse(input.value);
        } catch (e) {
          console.log(e.message);
        }
      }
    }

    if (data.method === 'getCroppedCanvas') {
      data.option = JSON.parse(data.option);
    }

    result = cropper[data.method](data.option, data.secondOption);

    switch (data.method) {
      case 'scaleX':
      case 'scaleY':
        target.setAttribute('data-option', -data.option);
        break;
      case 'getCroppedCanvas':
        if (result) {
          // Bootstrap's Modal
          $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
          if (!download.disabled) {
            download.href = result.toDataURL('image/jpeg');
          }
        }
        break;
      case 'destroy':
        cropper = null;
        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
          uploadedImageURL = '';
          image.src = originalImageURL;
        }
        break;
    }
    if (typeof result === 'object' && result !== cropper && input) {
      try {
        input.value = JSON.stringify(result);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
});
function clickOutsideOf(container){
  $(document).mouseup(function(e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {container.hide();}
  });
}
</script>

