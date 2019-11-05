<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="csrf-token" content="{{ csrf_token() }}">


        <title>Laravel</title>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

  
    </head>
    <body class="bg-gray-100">
        <div id="root"></div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
