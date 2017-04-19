<?php
namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use App\Images;
use DB;

class ImageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    } 

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $images=[];
      if(isset(Auth::user()->id)){
        $images = Images::where('userId', Auth::user()->id )
        ->GET();
      }        

        return $images;


    }

    public function storeImages(Request $request)
    {
        //return $request->all();

        $images_data = new Images;
        $userId = 0;
        if(isset(Auth::user()->id)){
          $userId = Auth::user()->id;
        }        
        $title = $request->title;
        $directory = $request->directory;
        $tags = $request->tags;
        $uploadedName = $request->uploadedName;
        $originalName = $request->originalName;
        $size = $request->size;
        $height = $request->height;
        $width = $request->width;
        $id = DB::table('images')->insertGetId(
            ['userId' => $userId, 'originalName' => $originalName, 'uploadedName' => $uploadedName, 'directory' => $directory, 'title' => $title, 'size' => $size,'height' => $height,'width' => $width, 'tags' => $tags]
        );
        return array('id' => $id, 'title' => $originalName, 'originalName' => $originalName, 'uploadedName' => $uploadedName, 'directory' => $directory, 'size' => $size, 'height' => $height, 'width' => $width,);
        
    }
   public function updateImage(Request $request)
    {
        if ($request->task == "delete"){
            $query = Images::where('id', $request->id);
            $query->delete();   
            $directory = $request->directory;
            $uploadedName = $request->uploadedName;
              echo  exec("rm ." . $directory . $uploadedName);
              echo  exec("rm ." . $directory . "thumb/thumb_" . $uploadedName);
          return array('id' => $request->id, 'uploadedName' => $uploadedName, 'directory' => $directory);

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
