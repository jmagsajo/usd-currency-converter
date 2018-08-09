@extends('layouts.app')

@section('content')

<section id="currency-table" class="container">
	<div class="row">
		<div class="col-md-12 update-btn-container">
			<button id="update-currency" class="btn btn-info update-currency" v-on:click="updateCurrency()">
				<i id="btn-update-loader" class="fas fa-circle-notch fa-spin hidden"></i>Update Currency	
			</button>
		</div>
		<div class="col-md-12">
			<table id="example" class="table table-striped table-bordered table-responsive-md" cellspacing="0" width="100%">
			    <thead>
			        <tr class="table-success">
			            <th>Currency Name</th>
			            <th>Code</th>
			            <th>Rate per 1 USD</th>
			        </tr>
			    </thead>
			    <tfoot>
			        <tr>
			            <th>Currency Name</th>
			            <th>Code</th>
			            <th>Rate per 1 USD</th>
			        </tr>
			    </tfoot>
			    <tbody>
			    	<tr v-if="tableLoader" v-cloak>
						<td class="text-center" colspan="3"> <i id="table-loader" class="fas fa-spin fa-sync"></i> </td>
						<td class="hidden"></td>
						<td class="hidden"></td>
					</tr>
			        <tr id="currency-list" v-if="Object.keys(records).length > 0 && !tableLoader" v-for="d in records" v-cloak>
			            <td>@{{ d.targetName }}</td>
			            <td>@{{ d.targetCurrency }}</td>
			            <td>@{{ d.exchangeRate }}</td>
			        </tr>
			        <tr v-if="Object.keys(records).length <= 0 && !tableLoader" v-cloak>
						<td class="text-center" colspan="3">No Records found.</td>
						<td class="hidden"></td>
						<td class="hidden"></td>
					</tr>
			    </tbody>
			</table>

		</div>
	</div>
</section>

@endsection

@push('scripts')
	<script src="/js/home.js"></script>
@endpush