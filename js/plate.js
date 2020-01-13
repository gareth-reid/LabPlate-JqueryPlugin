(function($){
    var Plate = function(element, options){
        var elem = $(element);
        var obj = this;
        var settings = $.extend({
            wellActiveCss: 'active-well',
            wellCss: 'well',
            toolTipCss: 'plate-tooltip',
            toolTipTextCss: 'tooltiptext',
            plateErrorCss: 'alert alert-danger',
            sampleCountExceedErrorMsg: 'Sample count exceeds 96 well plate'

        }, options || {});

        this.draw = function(data){
            var sampleStore = $('#samples-storage');
            localStorage.setItem("samples", "");
            console.log('Draw method, data:' + data);
            elem.html("");

            if ($(data).size() > 96){
                elem.append("<div class='"+ settings.plateErrorCss +"'><h1>"+ settings.sampleCountExceedErrorMsg +" ("+ $(data).size() +")</h1></div>")
            } else {
                $(data).each(function (i, sample) {
                    var sampleId = sample[0];
                    var sampleName = sample[1];
                    var well = sample[2];
                    var wellClass = getStyle(sampleId);

                    elem.append("<div class='span1'><div class='"+ wellClass +" "+ settings.toolTipCss +"' >" + sampleName + "<span class='"+ settings.toolTipTextCss +"'>" + sampleName + " ("+ well +")</span></div></div>");
                    if (sampleId != "0") {
                        localStorage.setItem("samples", localStorage.getItem("samples") + ";" + sampleId + ":" + well);
                    }
                });
            }
        };

        var getStyle = function(sampleId){
            var wellClass = settings.wellActiveCss;
            if (sampleId == "0"){
                wellClass = settings.wellCss;
            }
            return wellClass;
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


