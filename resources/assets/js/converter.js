const converter = new Vue({
    el: '#converter-div',
    data : {
        token: "",
    	amount: 0,
        codes: {},
        selected: "",
        date: "",
        computation: 0,
        targetCode: "",
        converterLoader : false,
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
        compute: function(){
            let that = this;

            if(!that.selected){
                alert("Please select a currency.");
                return false;
            }

            if( $.trim(that.amount) == "" || that.amount <= 0 || !$.isNumeric(that.amount) ) {
                alert("Please enter a valid amount.");
                return false;
            }

            that.converterLoader = true;
            $('#btn-convert').attr('disabled', true);
            that.fetchToken().then(function(){
                $.ajax({
                    method: "POST",
                    url: "/api/v1/compute",
                    data:{
                        code_id: that.selected,
                        amount: that.amount,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Authorization':'Bearer: ' + that.token
                    },  
                    success: function(d){
                        $('#btn-convert').attr('disabled', false);
                        that.targetCode = d.code;
                        that.computation = d.data;
                        that.converterLoader = false;
                    },
                    error: function(){
                        $('#btn-convert').attr('disabled', false);
                        alert('Server Error!');
                        that.converterLoader = false;
                    }
                });
            });
        },
        fetchCode: function(){
            let that = this;
            that.fetchToken().then(function(){
                $('#currency').attr('disabled',true);
                $.ajax({
                    method: "POST",
                    url: "/api/v1/fetch-codes",
                    data:{
                        date: that.date,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Authorization':'Bearer: ' + that.token
                    },  
                    success: function(d){
                        $('#currency').attr('disabled',false);
                        if(d.dataCount > 0){
                            that.codes = d.data;
                        }else{
                            if(Object.keys(that.codes).length > 0){
                                that.codes = {};
                            }
                            alert("Date doesn't have convertion rate.");
                        }
                        setTimeout(function(){
                            if($('#currency option:eq(0)').attr('selected') != "selected"){
                                $('#currency option:eq(0)').attr('selected','selected').trigger('change');
                            }
                        },0);
                    },
                    error: function(){
                        alert('Server Error!');
                        $('#currency').attr('disabled',false);
                    }
                });
            }); 
        },
        onSelect: function(){
            let that = this;
            $(".datepicker").datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function(dateText, inst) {
                    var date = $(this).val();
                    that.date = date;
                    $(".datepicker").focus();
                    $(".datepicker").blur();
                    that.fetchCode();
                }
            });
            $('#currency option:eq(0)').attr('selected','selected').trigger('change');
        }
    },
    mounted: function () {
        this.onSelect();
    },
	created(){
		
	}

});