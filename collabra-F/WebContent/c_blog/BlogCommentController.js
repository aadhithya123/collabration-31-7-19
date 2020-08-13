myApp.controller("BlogCommentController",function($scope,$rootScope,$http,$location)
{
	$scope.blog={"blogid":"","blogname":"","blogcontent":"","username":"","createdate":"","status":"","likes":"","dislike":""};	

	$scope.blogComments;
	
	$scope.blogComment={"blogcommentid":0,"blogcomment":"","username":"","commentdate":"" ,"blogid":0};
	
    function loadAllComments()
    {
    	console.log("I'm in the Comment");
    	$http.get('http://localhost:8080/ConnectPeopleMiddle/getAllBlogComment/'+$rootScope.blogid)
		.then(function(response)
		{
			$scope.blogComments=response.data;
		});   	
    }
    
    function blogInfo()
    {
    	console.log("I'm in the BlogInfo");
    	$http.get('http://localhost:8080/ConnectPeopleMiddle/getSingleBlog/'+$rootScope.blogid)
		.then(function(response)
		{
			$scope.blog=response.data;
		});
    }
    
    $scope.addComment=function()
    {
    	console.log("I'm in  Add Comment");
    	$scope.blogcomment.blogid=$rootScope.blogid;
    	$scope.blogcomment.username=$rootScope.currentUser.username;
    	$http.post('http://localhost:8080/ConnectPeopleMiddle/addBlogComment/'+$rootScope.blogid)
		.then(function(response)
		{
			alert("Blog Comment Added");
			
			 loadAllComments();
			 blogInfo();
		});
    }
    
    $scope.deleteComment=function(blogcommentid)
    {
    	console.log("I'm in Delete Comment");
    	$http.post('http://localhost:8080/ConnectPeopleMiddle/deleteBlogComment/'+$rootScope.blogid)
		.then(function(response)
		{
			alert("Blog Comment is Deleted");
			 loadAllComments();
			 blogInfo();
		},function(errorresponse)
		{
			alert("Error Occured While Deleting the Command");
		});
    }
    
    loadAllComments();
    blogInfo();
});