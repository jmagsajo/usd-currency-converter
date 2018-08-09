@extends('layouts.app')

@section('content')
<section id="converter-div" class="container">
	<div class="row">
		<div class="col-md-12">
			<!--Card-->
			<div class="card">
				
			    <!--Card content-->
			    <div class="card-body">
			    	<div class="row">
				    	<div class="col-md-6">
					        <!--Title-->
					        <h4 class="card-title">Currency Converter</h4>

							<form id="calculator">
								<div class="md-form">
							        <i class="fa fa-calendar-alt prefix grey-text"></i>
							        <input type="text" id="date" class="form-control date datepicker" readonly="">
							        <label for="date">Date</label>
							    </div>

							    <div class="form-group">
							    	<label for="currency">Currency</label>
							        <select v-model="selected" id="currency" class="form-control currency">
							        	<option value="">SELECT CURRENCY</option>
							        	<option v-if="Object.keys(codes).length > 0" v-for="code in codes" :value="code.id">@{{ code.targetCurrency }}</option>
							        </select>
							    </div>

								<div class="md-form">
							        <i class="fa fa-dollar-sign prefix grey-text"></i>
							        <input type="text" id="amount" class="form-control amount" v-model="amount" maxlength="15">
							        <label for="amount">Amount</label>
							    </div>
							</form>
							<button id="btn-convert" class="btn btn-default" v-on:click="compute()">
								<i id="btn-convert-loader" class="fas fa-circle-notch fa-spin" v-if="converterLoader"></i>Convert
							</button>
						</div>
						<div class="col-md-6">
							<div class="converted-amount-container">
								<h4 class="card-title">Total computation</h4>
								<form>
									<div class="md-form">
								        <input v-model="computation" type="text" id="computation" class="form-control computation" readonly="">
								        <label for="date">Amount <span v-if="targetCode" v-cloak>in @{{ targetCode }}</span></label>
								    </div>
								</form>
							</div>
						</div>
					</div>
			    </div>

			</div>
			<!--/.Card-->
		</div>
	</div>
</section>
@endsection

@push('scripts')
	<script src="/js/converter.js"></script>
@endpush
