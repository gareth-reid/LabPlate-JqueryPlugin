(function($){
    var Plate = function(element, options){
        var elem = $(element);
        var obj = this;
        var settings = $.extend({
            param: 'defaultValue'
        }, options || {});

        this.draw = function(data){
            console.log('Draw method, data:' + data);
            elem.html("");
            if ($(data).size() > 96){
                elem.append("<div class='alert alert-danger'><h1>Sample count exceeds 96 well plate ("+ $(data).size() +")</h1></div>")
            } else {
                $(data).each(function (i, sample) {
                    var wellClass = 'active';
                    if (sample == "" || sample == "EMPTY"){
                        wellClass = 'well';
                    }
                    elem.append("<div class='span1'><div class='"+ wellClass +" plate-tooltip' >" + sample + "<span class='tooltiptext'>" + sample + "</span></div></div>");
                });
            }
        };

        var privateMethod = function(){
            console.log('private method called!');
        };
    };

    $.fn.plate = function(options){
        return this.each(function(){
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('myPlate')) return;

            // pass options to plugin constructor
            var myPlate = new Plate(this, options);

            // Store plugin object in this element's data
            element.data('myPlate', myPlate);
        });
    };
})(jQuery);


