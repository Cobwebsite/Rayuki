@echo off

REM Configuration des variables d'environnement
setx RAYUKI_APP_PATH "D:\Rayuki\Core\Core\bin\Debug\net8.0\apps"
setx RAYUKI_WWW_PATH "D:\Rayuki\Core\Core\wwwroot"
setx RAYUKI_THEME "D:\Rayuki\Core\Core\Front\static\autoload\themes\_default.gs.avt"
setx RAYUKI_FUNCTIONS "D:\Rayuki\Core\Core\Front\static\_functions.gs.avt"
setx RAYUKI_CORE_PACKAGE " D:\Rayuki\Libs\RayukiCore\Core.package.avt"
setx RAYUKI_CORE_DLL "D:\Rayuki\Libs\RayukiCore\Core.dll"
setx RAYUKI_SHARP_DLL "D:\Rayuki\Libs\AventusSharp\AventusSharp.dll"

echo Les variables d'environnement ont ete configurees.
