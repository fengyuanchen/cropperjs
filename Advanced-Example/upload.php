<?php
$ds          = DIRECTORY_SEPARATOR;  //1
$storeFolder = 'files';   //2
$chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
$length = 10;
$randomname = '';
for($i = 0; $i < $length; $i++)
{
     $randomname .= $chars[mt_rand(0, 36)];
}

$abspath = realpath(dirname(__FILE__));
$uploadpath = $abspath.'./files/';

if (!empty($_FILES)) {
  $returnData = array();
  $tempFile = $_FILES['file']['tmp_name']; 
  $file_name = $_FILES['file']['name']; //Get file name with extension
  $file_type = $_FILES['file']['type']; //Get only extension
  $file_size = $_FILES['file']['size']; //Get File Size
  $file_tmp = $_FILES['file']['tmp_name']; //Temporary file name that saves in the computer to be processed
  $filesplit = pathinfo($file_name, PATHINFO_FILENAME); //Get only the name of file without extension
  $file = $uploadpath.$file_name;
  $newname = $randomname.'.png'; //Rename file and set extension
  move_uploaded_file($file_tmp,$file);
  $imagick = new Imagick(); //Define imagick function
  $imagick->readImage($file); //Read the file
  $size = $imagick->getImageGeometry(); 
  $image = $imagick->writeImages('files/'.$newname, false); //Write the file to uploads folder
  $width = $size["width"];
  $height = $size["height"];
  $returnData["targetFile"] = $newname;
  $returnData["targetPath"] = $uploadpath;
  $returnData["name"] = $file_name;
  $returnData["height"] = $height;
  $returnData["width"] = $width;
  $returnData["newName"] = $newname;
  shell_exec("rm  " . $file);
  $trimmed_array=array_map('trim',$returnData);
  echo json_encode($trimmed_array);
}

if (isset($_REQUEST["filename"]))    
{ 
  if ($_REQUEST["filename"] == "cropped.jpg") {
    $returnData = array();
    $originalName = $_REQUEST["originalName"];
    $oldFile = end(split('\/',$originalName));
    $returnData["originalName"] = $originalName;
    $width = $_REQUEST["width"];
    $height = $_REQUEST["height"];
    shell_exec("rm -v ./files/" . strtolower(end(split('\/',$originalName))));
    shell_exec("rm -v ./files/thumb/thumb_" . strtolower(end(split('\/',$originalName))));

  	define('UPLOAD_DIR', 'files/');
  	$img = $_POST['imgBase64'];
  	$img = str_replace('data:image/png;base64,', '', $img);
  	$img = str_replace(' ', '+', $img);
  	$data = base64_decode($img);
    $filesplit = pathinfo($originalName, PATHINFO_FILENAME); //Get only the name of file without extension
    $file = UPLOAD_DIR .$randomname.'.png'; //Rename file and set extension

    $imagick = new Imagick(); //Define imagick function
    $imagick->readimageblob($data); //Read the file
    $imagick->scaleImage($_REQUEST["width"], $_REQUEST["height"], true);;
    $newWidth = $imagick->getImageWidth(); 
    $newHeight = $imagick->getImageHeight(); 
    
    $image = $imagick->writeImages($file, false); //Write the file to uploads folder

    $thumb = new Imagick();
    $thumb->readimageblob($data); 
    $thumb->scaleImage(150, 150, true);;
    $thumb->writeImage('files/thumb/thumb_' .$randomname.'.png');
    $thumb->clear();
    $thumb->destroy(); 
    
    $returnData["width"] = $newWidth;
    $returnData["height"] = $newHeight;
    $returnData["oldFile"] = $oldFile;
    $returnData["file"] = $file;
    $returnData["newFile"] = $randomname . '.png';
    $trimmed_array=array_map('trim',$returnData);
    echo json_encode($trimmed_array);
  }
}
if (isset($_REQUEST['type']))    
{  
  if ($_REQUEST["type"] == "storeImages") {
      $myPDO = new PDO('mysql:host=localhost;dbname=images', 'root', '');
      $userId = 0;     
      $title = $_REQUEST["title"];
      $directory = $_REQUEST["directory"];
      $uploadedName = $_REQUEST["uploadedName"];
      $originalName = $_REQUEST["originalName"];
      $size = $_REQUEST["size"];
      $height = $_REQUEST["height"];
      $width = $_REQUEST["width"];

      $sql = $myPDO->prepare("INSERT INTO images (userId, originalName, uploadedName, directory, title, size, height, width)
      VALUES (:userId, :originalName, :uploadedName, :directory, :title, :size, :height, :width)");
      // use exec() because no results are returned
      $sql->execute(array('userId' => $userId, 'title' => $originalName, 'originalName' => $originalName, 'uploadedName' => $uploadedName, 'directory' => $directory, 'size' => $size, 'height' => $height, 'width' => $width));
      $id = $myPDO->lastInsertId(); 
      
      echo json_encode(array('id' => $id, 'title' => $originalName, 'originalName' => $originalName, 'uploadedName' => $uploadedName, 'directory' => $directory, 'size' => $size, 'height' => $height, 'width' => $width));
      
      
  }

  if ($_REQUEST["type"] == "updateImage") {
     $myPDO = new PDO('mysql:host=localhost;dbname=images', 'root', '');
     if ($_REQUEST["task"] == "delete"){
          $id = $_REQUEST["id"];
          $sql = "DELETE FROM images WHERE id = :id";
          $stmt = $myPDO->prepare($sql);
          $stmt->bindParam(':id', $id, PDO::PARAM_INT);
          // use exec() because no results are returned
          $stmt->execute();
          $directory = $_REQUEST["directory"];
          $uploadedName = $_REQUEST["uploadedName"];
          echo  exec("rm ." . $directory . $uploadedName);
          echo  exec("rm ." . $directory . "thumb/thumb_" . $uploadedName);
          echo json_encode(array('id' => $_REQUEST["id"], 'uploadedName' => $uploadedName, 'directory' => $directory));

      } else{
          $query = Images::where('id', $request->id);
          $query->update([
              'title' => $request->title,
              'uploadedName' => $request->uploadedName,
              'originalName' => $request->originalName,
              'tags' => $request->tags,
              'directory' => $request->directory
          ]);
      }
  }
}
?>  