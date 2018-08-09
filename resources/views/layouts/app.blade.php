<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="/css/jquery-ui.min.css">
        <link rel="stylesheet" href="/css/fontawesome-all.min.css">
        <link rel="stylesheet" href="/css/mdb.min.css">
        <link rel="stylesheet" type="text/css" href="/css/dataTables.bootstrap4.min.css"/>
        <link rel="stylesheet" href="/css/styles.css">
        @yield('styles')
        <title>{{ config('app.name') }}</title>
    </head>
    <body>
		<div id="main-wrapper">
			@include('includes.navbar')
			<div class="page-content">
		        @yield('content')
		        
		        
		        <a id="back-to-top" title="Back to top"><span class="fas fa-angle-up"></span></a>

		        <!-- footer -->
		        <footer class="site-footer">
					<div class="container-fluid footer-container">
		                <div class="row">
							<div class="col-md-12 footer-text text-center">
		                        {{ date('Y') }} &copy;Joseph Magsajo, All Rights Reserved.
		                    </div>
						</div>
					</div>
				</footer>
			</div>
		</div>
        
        <script src="/js/app.js"></script>
        <script src="/js/jquery-ui.min.js"></script>
        <script src="/js/scrollreveal.min.js"></script>
        <script src="/js/mdb.min.js"></script>
        <script src="/js/jquery.dataTables.min.js"></script>
		<script src="/js/dataTables.bootstrap4.min.js"></script>
        @stack('scripts')
    </body>
</html>