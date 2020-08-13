myApp.controller("UserController",function($scope,$http,$rootScope,$location,$cookieStore)
		
	{
	
	$scope.userDetails={"username":"","password":"","emailid":"","useraddress":"","userphone":"","role":"","status":"","isonline":""};
	
	$rootScope.userDetails1={"username":"","password":"","emailid":"","useraddress":"","userphone":"","role":"","status":"","isonline":""};
	
	
	
  //===============================================REGISTER===================================================================================
	
	
	
	$scope.register=function()
	
	{
		console.log("I'm in Register page");
	
		$http.post('http://localhost:8080/ConnectPeopleMiddle/addUser',$scope.UserDetails)
		.then(function(response)
		{
			alert("User Added");
		}, function(errorresponse)
		{
			alert("Problem Occured");
		});
	}
	
	
  //===============================================CHECK USER=================================================================================
	
	
	$scope.cheakUser=function()
	
	{
		console.log("I'm in checkUser");
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/checkUser',$scope.UserDetails)
		.then(function(response)
		{
			$rootscope.currentUser=response.data;
			console.log($rootScope.currentUser);
			cookieStore.put('UserDetails',response.data)
			$location.path("/userHome");
		},function(errorresponse)
		{
			alert("User Name and Password is Not Match");
		});
	}
	
	
	 //===============================================EDIT USER===============================================================================
	
	
	$scope.editUser=function()
	{
		console.log("I'm in Edit User");
		
		$http.get('http://localhost:8080/ConnectPeopleMiddle/get/'+$rootScope.currentUser.username)
		.then(function(response)
		{
			$rootscope.UserDetails=response.data;
			$location.path("/updateProfile");
		},function(errorresponse)
		{
			alert("Problem Occured");
		});
		
	}
	
	
	 //===============================================UPDATE PROFILE==========================================================================
	
	
	
	$scope.updateprofile=function()
	{
		$http.post('http://localhost:8080/ConnectPeopleMiddle/updateUser',$rootScope.userDetails1)
		.then(function(response)
		{
			alert(response.data);
		},function(errorresponse)
		{
			alert(errorresponse.data);
			alert(errorresponse.statusText);
		});
	}
	
	
    //=======================================================-LOGOUT==========================================================================
	
	
	$scope.logout=function()
	{
		console.log("I'm in Logout Function")
		
		$cookieStore.remove('UserDetails');
		delete $rootScope.currentUser;
		
		alert.log("User has Logged Out");
		$location.path("/Login");
	}
	
});
  