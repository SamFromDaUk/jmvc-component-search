steal("funcunit", function(){
	module("search test", { 
		setup: function(){
			S.open("//search/search.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})
