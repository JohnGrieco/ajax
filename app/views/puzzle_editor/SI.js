function SI() {
    var obj = null;
    var fsize = 20;
    var typing = false;
    var cursorPos = 0;
    var contain = null;
    var cutInterval, addInterval;
    var binding;

    function my() {

    }

    my.container = function(c) {
        if (!arguments.length) return contain;

        contain = c;
        obj = c
            .append("text")
            .attr("class", "SI")
            .attr("x", 0)
            .attr("y", fsize)
            .style("font-size", fsize)
            .text("SVG Input");

        startInputable();

        return my;
    };

    my.bind = function(b) {
        if (!arguments.length) return binding;

        binding = b;

        return my;
    }

    my.text = function(t) {
        if (!arguments.length) return obj.text();

        obj.text(t);

        return my;
    };

    my.x = function(x) {
        if (!arguments.length) return obj.attr("x");

        obj.attr("x", x);

        return my;
    };

    my.y = function(y) {
        if (!arguments.length) return obj.attr("y");

        obj.attr("y", y);

        return my;
    };

    my.color = function(c) {
        if (!arguments.length) return obj.style("fill");

        obj.style("fill", c);

        return my;
    }

    function startInputable() {
        obj.on("click", function(e) {
            if (!typing) {
                /*var x = d3.mouse(contain[0][0])[0];														// Find approximate position of click on
                 var percentage = x / parseFloat($(this).width());										//  text object to place cursor.
                 cursorPos = Math.round(obj.html().length * percentage);
                 obj.text(obj.html().substring(0, cursorPos) + "|" + obj.html().substring(cursorPos));
                 console.log(percentage * 100 + "%")*/

                obj.text(obj.html() + "|");
                cursorPos = obj.html().indexOf("|");
                typing = true;

                cutInterval = setInterval(function() {
                    cutCursor();
                }, 1000);

                setTimeout(function() {
                    addInterval = setInterval(function() {
                        addCursor();
                    }, 1000);
                }, 500);
            }
        });

        $(this).keydown(function(e) {
            e.preventDefault();

            if (typing) {
                var code = e.which || e.keyCode;

                if (code === 8) { // Backspace
                    cutCursor();
                    obj.text(obj.html().substring(0, cursorPos-1) + "|" + obj.html().substring(cursorPos));
                    cursorPos = obj.html().indexOf("|");
                }
                else if (code === 46) { // Delete
                    cutCursor();
                    obj.text(obj.html().substring(0, cursorPos) + "|" + obj.html().substring(cursorPos+1));
                    cursorPos = obj.html().indexOf("|");
                }
                else if (code === 13) { // Enter
                    cutCursor();
                    typing = false;

                    if (obj.html() === "") {
                        obj.text("SVG Input");
                    }

                    clearInterval(cutInterval);
                    clearInterval(addInterval);

                    onEnter();
                }
                else if (code === 37) { // Left arrow key
                    cutCursor();
                    obj.text(obj.html().substring(0, cursorPos-1) + "|" + obj.html().substring(cursorPos-1));
                    cursorPos = obj.html().indexOf("|");
                }
                else if (code === 39) { // Right arrow key
                    cutCursor();
                    obj.text(obj.html().substring(0, cursorPos+1) + "|" + obj.html().substring(cursorPos+1));
                    cursorPos = obj.html().indexOf("|");
                }

                var chr = String.fromCharCode(code);

                if ((code >= 65 && code <= 90) || (code >= 40 && code <= 57) || (code === 188) || (code === 190)) { // Letter and numbers above keyboard
                    if (e.shiftKey) { 														// If shift key is being held down.
                        if (code === 57) {
                            chr = "(";
                        }
                        else if (code === 48) {
                            chr = ")";
                        }
                        else if (code === 51) {
                            chr = "#";
                        }

                        cutCursor();
                        obj.text(obj.html().substring(0, cursorPos) + chr + "|" + obj.html().substring(cursorPos));
                        cursorPos = obj.html().indexOf("|");
                    }
                    else {
                        if (code === 188) {
                            chr = ",";
                        }
                        else if (code === 190) {
                            chr = ".";
                        }

                        cutCursor();
                        obj.text(obj.html().substring(0, cursorPos) + chr.toLowerCase() + "|" + obj.html().substring(cursorPos));
                        cursorPos = obj.html().indexOf("|");
                    }
                }
            }
        });
    }

    function cutCursor() {
        if (typing && obj.html().indexOf("|") >= 0) {
            obj.text(obj.html().substring(0, cursorPos) + obj.html().substring(cursorPos+1));
        }
    }

    function addCursor() {
        if (typing && obj.html().indexOf("|") < 0) {
            obj.text(obj.html().substring(0, cursorPos) + "|" + obj.html().substring(cursorPos));
        }
    }

    function onEnter() {
        if (currPiece.tag[binding]) {
            currPiece.tag[binding] = obj.html();
        }
        else {
            currPiece.css[binding] = obj.html();
        }

        redrawPuzzle();
    }

    return my;
}