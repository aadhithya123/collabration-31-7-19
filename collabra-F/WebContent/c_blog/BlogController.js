myApp.controller("blogController",function($scope,$location,$rootScope,$http,$cookieStore)
	{

	$scope.blog={"blogid":"","blogname":"","blogcontent":"","username":"","createdate":"","status":"","likes":"","dislike":""};
	
	$scope.blogDetail;
	
	$rootScope.blog1={"blogid":"","blogname":"","blogcontent":"","username":"","createdate":"","status":"","likes":"","dislike":""};
	
	$rootScope.blogid;
	
	$scope.addBlog=function()
	{
		console.log("I'm in Add Blog");
		
		$scope.Blog=$rootScope.currentUser.username;
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/addBlog',$scope.Blog)
		.then(function(response)
		{
			alert("Blog Added");
			showAllBlog();
		},function(errorresponse)
		{
			alert("Error Ocurred While Blog Adding");
		});
	}
	
	$scope.updateBlog=function()
	{
		console.log("I'm in Update Blog");
		
		$rootScope.blog1.username=$rootScope.currentUser.username;
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/updateBlog',$rootScope.blog1)
		.then(function(response)
		{
			alert("Blog Updated");
			$location.path("/showAllBlog")
		},function(errorresponse)
		{
			alert("Error Ocurred While Updating the Blog");
		});
	}
	
	$scope.blogComments=function(blogid)
	{
		console.log("I'm in Blog Comment");
		$rootScope.blogid=blogid;
		$location.path("/BlogComments")
	}
	
	$scope.incrementLikes=function(blogid)
	{
		console.log("I'm in Increment Likes");
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/incrementLikes/'+blogid)
		.then(function(response)
		{
			alert("Thank You For Incrementing the Blog");
			showAllBlog();
		},function(errorresponse)
		{
			alert("Error Ocurred While incrementing the Blog");
		});
	}
	
	$scope.incrementDisLikes=function(blogid)
	{
		console.log("I'm in Increment DisLikes");
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/incrementDisLikes/'+blogid)
		.then(function(response)
		{
			alert("OOP'S We will try to improve.Thanks for your Feedback!!!");
			showAllBlog();
		},function(errorresponse)
		{
			alert("Error Ocurred While incrementing the DisLikes the Blog");
		});
	}
	
	
	$scope.accept=fuction(blogid)
	{
		console.log("I'm in Accept Method");
		$http.post('http://localhost:8080/ConnectPeopleMiddle/approveBlog/'+blogid)
		.then(function(response)
		{
			alert("Blog Approved")
		},function(errorresponse)
		{
			alert("Blog Not Approved")
		});
		
	}
	
	$scope.reject=fuction(blogid)
	{
		console.log("I'm in Reject Method");
		$http.post('http://localhost:8080/ConnectPeopleMiddle/rejectBlog/'+blogid)
		.then(function(response)
		{
			alert("Blog Rejected")
		},function(errorresponse)
		{
			alert("Blog Not Rejected")
		});
		
	}
	
	$scope.deleteBlog=function(blogid)
	{
		console.log("I'm in Deleting Blog");
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/deleteBlog/'+blogid)
		.then(function(response)
		{
			alert("!!!Blogis Successfully Deleted");
			showAllBlog();
		},function(errorresponse)
		{
			alert("Error Ocurred While Deleting the Blog");
			showAllBlog();
		});
	}
	
	$scope.editBlog=function(blogid)
	{
		console.log("I'm in Edit Blog");
		
		$http.post('http://localhost:8080/ConnectPeopleMiddle/getSingleBlog/'+blogid)
		.then(function(response)
		{
			$rootScope.blog1=response.data;
			console.log(response.data);
			console.log("--------------");
			console.log($rootscope.blog1);
			$location.path("/editBlog");
		},function(errorresponse)
		{
			alert("Error Ocurred While Deleting the Blog");
			showAllBlog();
		});
	}
	
	function showAllBlog()
	{
	console.log("I'm in Show All Blog");
	
	$http.post('http://localhost:8080/ConnectPeopleMiddle/showAllBlog')
	.then(function(response)
	{
		$scope.blogDetail=response.data;
	},function(errorresponse)
	{
		alert("Error Ocurred While Blog Retrieving the  Blogs");
	});
	}
	showAllBlog();
});