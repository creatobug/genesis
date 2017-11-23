var globalAuthenticationToken ='';
var genesisController = angular.module('genesisController',[]);
var dataToDeploy;


genesisController.controller('SourceController', function($scope, $rootScope, $location, $http,$window,$route) {

  //Fetch Exsiting ORG login information - Currently from the JSON file

  $http.get('data/orgInformation.json').success(function(data) {

    console.log(data);
    $scope.companies = data;
  });
  
  $rootScope.title = "Registered Orgs: ";
  // FetchCampaigns.fetchAllUser().then(function(value) {
  //     console.log(value);
  //     $scope.companies = value.data;
  // }) 

// When New org needs to be created 
$scope.addRow = function(){ 
  var data = {
      orgName : $scope.orgName,
      clientId: $scope.clientid,
      clientSecret: $scope.clientsecret,
      action : 'create'
  }

  
 if($scope.id !== '' && $scope.orgName !== '', $scope.clientsecret !== '') {

    // $http.post('data/orgInformation.json',data).success(function(data) {

    console.log('Success');
    // Insert the New Org Details into the JSON file
    // Enhancment - Authenticate

    $http.post('/updateJsonFile',data).success(function(response){

      console.log('Data inserted into Json '+response);
      $location.path('/source');  
      $window.location.reload();    

    })


 }

}


// };
$scope.clear= function(){   

$scope.orgName='';
$scope.clientid='';
$scope.clientsecret='';

};

$scope.login=function()
{
  console.log($scope.selectedValue);
    var clientIdandSecret = $scope.selectedValue;
 
    var data = {
    clientId: clientIdandSecret.substring(0,clientIdandSecret.indexOf(':')).trim(),
    clientSecret: clientIdandSecret.substring(clientIdandSecret.indexOf(':')+1).trim(),
};

     //$http({method: 'POST', url: '/loginservice',params: {$scope.user}});
     // var data =$scope.user;
      $http.post("loginservice", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
        $scope.accessToken = response;
        console.log($scope.accessToken);
        if($scope.accessToken!='' && $scope.accessToken!=null){
          globalAuthenticationToken = $scope.accessToken;
          $location.path('/components');
          $route.reload();
        }

    });

}

$scope.removeRow = function(name){  
var r = confirm("Are you sure you want to remove this org?");
if (r == true) {
  console.log(name);
    var data = {
        orgName : name,
        action : 'delete'
    };

    $http.post('/updateJsonFile',data).success(function(response){

      console.log('Data inserted into Json '+response);
      $location.path('/source');  
      $window.location.reload();    

    })

      
}     
    
}
});


genesisController.controller('componentsController', function($scope, $rootScope, $location, $http,$window,$route) {
  
 
  $rootScope.title = "Component Selection";
  $scope.table=false;
  $scope.response=null;
  $scope.showTable = function(){

     $scope.table=true;
  };
  $scope.previous=function(){
    $location.path('/source');  
  };
  $scope.next=function(){
    $location.path('/destinationOrg');  

  };
  $scope.proceed = function(){
    console.log($scope.selectedValue);
    // dataToDeploy.customerKey - delete
    // dataToDeploy.category - delete
   
    dataToDeploy = $scope.selectedValue;
    delete dataToDeploy['customerKey'];
    delete dataToDeploy['category'];
    console.log(dataToDeploy);
    $location.path('/destinationOrg');  

  }
  $scope.fetch= function(type){
    console.log('Reached');
    // if($scope.response != null)
    // {
       console.log('not set yet');

       // Make callout 

       var data = {
    ObjectType: type,
    AuthenticationToken: globalAuthenticationToken,
};

      $http.post("retrieveService", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
       console.log('Reached here');
      $scope.response=response;


        

    });

    // }
    //make a callout to fetch all Emails , if the Json is not created yet
  }

  
  
  // Declare the array for the selected items
  $scope.selected = []; 
  
  // Function to get data for all selected items
  $scope.selectAll = function (collection) {
    
    // if there are no items in the 'selected' array, 
    // push all elements to 'selected'
    if ($scope.selected.length === 0) {
      
      angular.forEach(collection, function(val) {
        
          $scope.selected.push(val.id); 
        
      });
      
    // if there are items in the 'selected' array, 
    // add only those that ar not
    } else if ($scope.selected.length > 0 && $scope.selected.length != $scope.data.length) {
      
      angular.forEach(collection, function(val) {
        
        var found = $scope.selected.indexOf(val.id);
        
        if(found == -1) $scope.selected.push(val.id);
        
      });
      
    // Otherwise, remove all items
    } else  {
      
      $scope.selected = [];
      
    }
    
  };
  
  // Function to get data by selecting a single row
  $scope.select = function(id) {
    
    var found = $scope.selected.indexOf(id);
    
    if(found == -1) $scope.selected.push(id);
    
    else $scope.selected.splice(found, 1);
    
  }
  
    // Generating Smart Table Data Below
  
    var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
    var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
    var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
    var id = 1;

    function generateRandomItem(id) {
   
      var firstname = firstnames[Math.floor(Math.random() * 3)];
      var lastname = lastnames[Math.floor(Math.random() * 3)];
      var birthdate = dates[Math.floor(Math.random() * 3)];
      var balance = Math.floor(Math.random() * 2000);

      return {
          
          id: id,
          firstName: firstname,
          lastName: lastname,
          birthDate: new Date(birthdate),
          balance: balance
      }
    }

    $scope.rowCollection = [];

    for (id; id < 11; id++) {
      $scope.rowCollection.push(generateRandomItem(id));
    }

    $scope.data = [].concat($scope.rowCollection);
    
} 
  
);





  genesisController.controller('LoginController',['$scope','$http','$location','$route', function($scope,$http,$location,$route) {

  $scope.name='Tarun';
  // $scope.accessToken = '';

// $rootScope.title = "Source Authentication: ";
//     $scope.method = 'GET';
//   $scope.url1 = 'http://localhost:3000/';
//   $scope.register = {};
//     $scope.formSubmit = function() {
//       if(LoginService.login($scope.clientid, $scope.clientsecret)) {
//         $scope.error = '';
//         $scope.username = '';
//         $scope.password = '';
//     $scope.endpoint = '';
//         $state.transitionTo('home');
//       } else {
//         $scope.error = "Incorrect username/password !";
//       }   
//     };
$scope.user = {};
$scope.user.clientId = 'ycv0vh5sh27nsbfwy9nz0won';
$scope.user.clientSecret = 'fLdvlDZuIWKuDrptyP9CTHAT';
$scope.formSubmit=function()
{

    var data = {
    clientId: $scope.user.clientId,
    clientSecret: $scope.user.clientSecret,
};
       console.log($scope.user);
       console.log($scope.user.clientId);
       console.log($scope.user.clientSecret);
     //$http({method: 'POST', url: '/loginservice',params: {$scope.user}});
     // var data =$scope.user;
      $http.post("loginservice", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
        $scope.accessToken = response;
        console.log($scope.accessToken);
        if($scope.accessToken!='' && $scope.accessToken!=null){
          globalAuthenticationToken = $scope.accessToken;
          $location.path('/home');
          $route.reload();
        }

    });

}

   }]);
  
genesisController.controller('HomeController',['$scope','$http','$location','$route', function($scope,$http,$location,$route) {



  // $scope.name='Home Page';
  $scope.names = ["Simple Text Email"];
  $scope.selectedName= "";

  $scope.fetch = function(){
    console.log($scope.selectedName);
    console.log(globalAuthenticationToken);


    var data = {
    ObjectType: $scope.selectedName,
    AuthenticationToken: globalAuthenticationToken,
};
    // Call the server to fetch the assets from source 

    $http.post("retrieveService", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
       console.log('Reached here');
      $scope.response=response;
        

    });


    // FetchCampaigns.fetch().then(function(result){
    //   console.log(result);
      
    //   $scope.Campaigns = result.data;
    //   angular.forEach($scope.Campaigns, function(item){
    //                item.selected = false; 
    //            })
    // });
  }

}]);

genesisController.controller('Login1Controller', function($scope, $rootScope, $location, $http,$window,$route) {
  
  $scope.error=false;
  $rootScope.title = "SFMC Automation Tool: ";
  $scope.login=function(){
      if($scope.id=="Admin" && $scope.password =="123"){
        $location.path('/source');
          // $state.transitionTo('source');
      }
    else{
      $scope.error=true;
    }
  };
 
  
});

genesisController.controller('destinationOrgController', function($scope, $rootScope, $location, $http,$window,$route) {
  
 
  $rootScope.title = "Destination Org: ";
  
   $http.get('data/orgInformation.json').success(function(data) {

    console.log(data);
    $scope.companies = data;
  });

  $scope.previous=function(){
    // $state.transitionTo('components');
    $location.path('/components');
  };
  $scope.deploy=function(){
    // $state.transitionTo('successPage');

    // login to the destination environment

 console.log($scope.selectedValue);
    var clientIdandSecret = $scope.selectedValue;
 
    var data = {
    clientId: clientIdandSecret.substring(0,clientIdandSecret.indexOf(':')).trim(),
    clientSecret: clientIdandSecret.substring(clientIdandSecret.indexOf(':')+1).trim(),
};

     //$http({method: 'POST', url: '/loginservice',params: {$scope.user}});
     // var data =$scope.user;
      $http.post("loginservice", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
        $scope.accessToken = response;
        console.log($scope.accessToken);
        if($scope.accessToken!='' && $scope.accessToken!=null){
          globalAuthenticationToken = $scope.accessToken;
          // $location.path('/components');
//           $route.reload();


            // Login successfull, now deploy
            //Hard coding for testing
      var recsToDeploy = {"customerKey": "Unique1",
"objectID": "dd209aa4-64f3-4b50-88e1-fdfa427e5ff9",
"contentType": "application/vnd.etmc.email.Message; kind=textOnly",
"assetType": {
"id": 209,
"name": "textonlyemail",
"displayName": "Text Only Email"
},
"name": "New Email Created via REST and Node ",
"description": "",
"owner": {
  "id": 7386708,
  "email": "hchatti@deloitte.com",
  "name": "HYD Team",
  "userId": "7386708"
},
"enterpriseId": 7236752,
"memberId": 7236752,
"status": {
"id": 1,
"name": "Draft"
},
"thumbnail": {
"thumbnailUrl": "/v1/assets/75473/thumbnail"
},
"category": {
"id": 93933
},
"views": {
"subjectline": {
"contentType": "application/vnd.etmc.email.View; kind=subjectline",
"content": "HI ",
"meta": {},
"data": {
"email": {
"options": {
"generateFrom": ""
}
}
},
"modelVersion": 2,
"indexVersion": 3
},
"text": {
"content": "HI",
"data": {
"email": {
"options": {
"generateFrom": ""
}
}
},
"modelVersion": 2,
"indexVersion": 3
},
"subscriptioncenter": {
"data": {
"email": {
"options": {
"generateFrom": ""
}
}
},
"modelVersion": 2,
"indexVersion": 3
},
"forwardText": {
"data": {
"email": {
"options": {
"generateFrom": ""
}
}
},
"modelVersion": 2,
"indexVersion": 3
}
},
"data": {
"email": {
"options": {
"characterEncoding": "utf-8"
},
"legacy": {
"legacyId": 156307,
"legacyKey": "38f7b364-cb66-4525-96c3-ad27dd52a736",
"legacyType": "email",
"legacyCategoryId": 94450
}
},
"approvals": {
"approvalStatus": {
"id": 2,
"name": "Pending",
"displayName": "Pending Approval"
}
}
},
"legacyData": {
"legacyId": 156307,
"legacyKey": "38f7b364-cb66-4525-96c3-ad27dd52a736",
"legacyType": "email",
"legacyCategoryId": 94450
},
"modelVersion": 2,
"indexVersion": 3
};

       var data = {
          AuthenticationToken: globalAuthenticationToken,
          recordsToDeploy : dataToDeploy
      };

      $http.post("emailDeployService", data).success(function(response) {
      //  $http.post('/loginservice',params: {data}).success(function(data) {
       console.log('Reached here');
      $scope.response=response;


        

    });



        }

    });


    // $location.path('/successPage');
  };

  
  
});

genesisController.controller('successPageController', function($scope, $rootScope, $location, $http,$window,$route) {
  
 
  $rootScope.title = "Result: ";
  
  
  
  $scope.homePage= function(){
    // $state.transitionTo('source');
     $location.path('/source');
  };

  
  
});


