function Loader() {
	var self = this;
    var url= "http://menes.dyndns.org:8905/";

    var loaded = false;
    var waiting = false;
    
	var images = [];
	var index = 0;

	var load = function() {
		$.get(url, function(data) {
			console.info("images loaded");
            
			images = JSON.parse(data).arr;
            loaded = true;
			self.ready();
		});
	};

	this.go = function(step) {
        // not ready yet
        if(!loaded && !waiting) {
            waiting = true;
            
            (function() {
                console.info("not ready yet, will go() as soon as possible");
                
                var iv;
                var check = function() {
                    if(loaded) {
                        clearInterval(iv);
                        self.go(step);
                    }
                };
                
                iv = setInterval(check, 500);
            })();
        
            return;
        }
        
		index += step;

		if(index < 0 || index >= images.length) {
			index = 0;
			return;
		}

        var img = images[index];
		self.imgUrl = img.url;
		self.imgTitle = img.title;
		console.info("go "+step+" image: "+self.imgUrl);
	};
    
    this.ready = function() {
        console.error("loader.ready not defined");
    };

	load();
}