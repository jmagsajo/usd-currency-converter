const currency = new Vue({
    el: '#currency-table',
    data : {
    	token:"",
    	records: {},
    	tableLoader: true,
    	token: "",
    },
    methods: {
    	fetchToken : function(){
            let that = this;
            return $.get(
                '/api/v1/getToken',
                function(data){
                    that.token = data.access_token;
                }
            );
        },
        updateCurrency: function () {
        	let that = this;
        	$("#btn-update-loader").removeClass('hidden');
            $('#update-currency').attr('disabled', true);
            $('#example_wrapper').find('.odd').addClass('hidden');
			$('#example_wrapper').find('.even').addClass('hidden');
        	that.tableLoader = true;
        	that.fetchToken().then(function(){
				$.ajax({
					method: "GET",
					url: "/api/v1/update-currency",
					headers: {
				        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
				        'Authorization':'Bearer: ' + that.token
				    },	
					success: function(d){
						$('#example_wrapper').find('.odd').removeClass('hidden');
						$('#example_wrapper').find('.even').removeClass('hidden');
						that.records = d.data;
						that.tableLoader = false;
						alert('Currency successfully updated!');
						$("#btn-update-loader").addClass('hidden');
						$('#update-currency').attr('disabled', false);
						setTimeout(function(){
							let datatable = $('#example').DataTable();
							let obj = that.parseObj();
							datatable.clear();
						    datatable.rows.add(obj);
						    datatable.draw();
						},0);
					},
					error: function(){
						$("#btn-update-loader").addClass('hidden');
						$('#update-currency').attr('disabled', false);
					}
				});
			});
        },
        parseObj(){
        	let that = this;
        	let arr1 = [];
        	$.each(that.records, function(i, val){
        		let arr2 = [];
        		arr2.push(val.exchangeRate);
        		arr2.push(val.targetCurrency);
        		arr2.push(val.targetName);
        		arr1.push(arr2);
        	});

        	return arr1;
        }
    },
    mounted: function () {
        let that = this;

        that.fetchToken().then(function(){
	        $.ajax({
				method: "GET",
				url: "/api/v1/get-currency",
				headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
			        'Authorization':'Bearer: ' + that.token
			    },	
				success: function(d){
					that.records = d.data;
					that.tableLoader = false;
					$("#btn-update-loader").addClass('hidden');
					$('#update-currency').attr('disabled', false);
					setTimeout(function(){
						let datatable = $('#example').DataTable();
						let obj = that.parseObj();
						datatable.clear();
					    datatable.rows.add(obj);
					    datatable.draw();
					},0);
				},
				error: function(){
					$("#btn-update-loader").addClass('hidden');
					$('#update-currency').attr('disabled', false);
				}
			});
    	});
    },
	created(){
		
	}

});