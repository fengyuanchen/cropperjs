This example includes the ability to upload images, which transitions to cropping
with the ability to crop by aspect ratio, and has the ability to crop circles and 
ellipses.

PHP should be fairly straightforward. ImageMagick needs to be installed.

If you want to use Laravel, you would need to update the routes file, and update 
the URLs in the ajax requests to use these. In my installation Dropzone was 
located in /plugins/Dropzone and "files" was located under that and would need 
write access.

