/* 
 * Description:
 * 
 * A class for showing fractal sets.
 * It contain julia set and mandelbrot set currently.
 * 
 * Written by jjling2011 at gmail dot com.
 * 
 * 
 * Change log:
 * 
 * 20151124 Rewrite Julia.calc() and Mandelbrot.calc() for seeding up calculation.
 *          But the effect is not obvious.
 * 
 * 20151123 Use closure for cutting down external variables.
 *          Use imageDate instead of fillRect for drawing.
 * 
 * 20151122 Add connect/disconnet methods in namespace_fractal.Fractal.
 *           Now you can switch between sets without creating a new object.
 *           
 * 20151121 First post in http://tieba.baidu.com/p/4171629950
 * 
 * 
 * Usage:
 * 
 *     Mandelbrot set is similar to Julia set, but do not have change_param method.
 *     
 *     1.create new julia set object
 *     
 *       Notice: html_element_debug_message_output_area is optional
 *     
 *         var julia = namespace_fractal.Julia.createNew(
 *              html_element_canvas, 
 *              canvas_width, 
 *              canvas_height, 
 *              html_element_debug_message_output_area);
 *                       
 *              
 *     2.release canvas
 *     
 *         julia.disconnect(); 
 *          
 *     3.gain control and display
 *     
 *         julia.connect();
 *         julia.show(1);
 *          
 *     4.change parameters c in formula z=z*z+c
 *     
 *         julia.change_param(c_real_part, c_imagine_part);
 *         julia.show(1);
 *     
 * Switch between sets:
 * 
 *     1.create sets
 *      
 *         var julia = ... (see usage above)
 *         var mandelbrot = ...
 *      
 *     2.switch to mandelbrot
 *      
 *         // disconnect all sets
 *         mandelbrot.disconnect();
 *         julia.disconnect();
 *         
 *         // connect the one you need
 *         mandelbrot.connect();
 *         mandelbrot.show(1); 
 *     
 *     3.switch back to julia
 *      
 *         // disconnect all sets
 *         mandelbrot.disconnect();
 *         julia.disconnect();
 *         
 *         // connect the one you need
 *         julia.connect();
 *         julia.show(1); 
 *      
 */

var namespace_fractal = {};

namespace_fractal.Fractal = {
    /**
     * Create basic fractal object.
     * 
     * @param canvas {element} Document element for drawing graphic.
     * @param width {int} Width of canvas.
     * @param height {int} Height of canvas.
     * @param debug {element} (optional) Document element for display debug messages
     * @returns {object} basic fractal object.
     * 
     */
    createNew: function (canvas, width, height, debug) {

        var fractal = {}, cv, cx, cy, ox, oy, scale;

        canvas.style.background_color = "#fff";

        cv = canvas.getContext("2d");

        cx = width / 2;
        cy = height / 2;
        scale = 1;
        ox = oy = 0;

        fractal.set_param = function (usr_px, usr_py, usr_scale) {
            ox = usr_px;
            oy = usr_py;
            scale = usr_scale;
        };

        fractal.dbg = function (msg) {
            if (debug !== undefined)
                debug.innerHTML = msg;
        };


        fractal.test = function () {
            cv.beginPath();
            cv.arc(cx + 50, cy - 50, 50, 0, 2 * Math.PI);
            cv.fillStyle = "#fff";
            cv.fill();
            dbg("hello");
        };

        /*
         * Remove mouse events from draw area
         * 
         * @returns {undefined}
         */
        fractal.disconnect = function () {

            var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            if (canvas.attachEvent) {
                canvas.detachEvent("on" + mousewheelevt, mouse_wheel);
            } else if (canvas.addEventListener) {
                canvas.removeEventListener(mousewheelevt, mouse_wheel);
            }

            canvas.onmousedown = null;
            canvas.onmouseup = null;
            canvas.onmousemove = null;

        };


        /*
         * Attach mouse events to draw area 
         * 
         * @returns {undefined}
         */
        fractal.connect = function () {

            var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            if (canvas.attachEvent) {
                canvas.attachEvent("on" + mousewheelevt, mouse_wheel);
            } else if (canvas.addEventListener) {
                canvas.addEventListener(mousewheelevt, mouse_wheel, false);
            }

            canvas.onmouseup = null;
            canvas.onmousemove = null;
            canvas.onmousedown = mouse_down;

        };


        fractal.show = (function () {

            var lock, timer;
            lock = false;
            timer = null;

            /*
             * Calculate and draw the set.
             * 
             * @param skip {int} Draw a rect(skip) instead of points inorder to speed up calating and drawing.
             * @returns {undefined}
             */
            var show = function (skip) {

                if (lock)
                    return;
                lock = true;

                if (timer)
                    clearTimeout(timer);
                timer = null;

                skip = (skip && skip > 1) ? skip : 1;
                cv.clearRect(0, 0, width, height);
                fractal.calc(scale, ox, oy, skip);

                if (skip > 1)
                    timer = setTimeout(
                            function () {
                                console.log('center(', ox, ',', oy, ") scale:", scale);
                                fractal.show(1);
                            },
                            1200);

                lock = false;
            };
            return show;
        }());

        /* 
         * Every children-objects have to redefine this function.
         * scale  : zoom level
         * (ox,oy): new coordinate of (0,0) after mouse drag
         * skip   : use rect(skip) instead of pixel for quick preview
         */
        fractal.calc = function (scale, ox, oy, skip) {
            console.log("Function calc() need to be redefine!", scale, ox, oy, skip);
        };

        var mouse_wheel = function (e) {
            var evt = window.event || e;
            var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;

            if (delta <= -120)
                scale *= 0.85;
            else
                scale *= 1.15;

            fractal.show(4);

            if (evt.preventDefault)
                evt.preventDefault();
            else
                return false;
        };

        var mouse_down = function () {

            var ms_x, ms_y, px, py, slice;

            var ms_down = function (e) {
                slice = 0.5 / cx / scale;
                ms_x = e.pageX;
                ms_y = e.pageY;
                px = ox;
                py = oy;

                canvas.onmousemove = function (e) {
                    ox = px + slice * (ms_x - e.pageX);
                    oy = py + slice * (e.pageY - ms_y);
                    fractal.show(4);
                };

                canvas.onmouseup = function () {
                    canvas.onmouseup = null;
                    canvas.onmousemove = null;
                };

                e.preventDefault();
            };

            return ms_down;
        }();

        return fractal;
    }
};


namespace_fractal.Julia = {
    createNew: function (canvas, width, height, debug) {

        var julia = namespace_fractal.Fractal.createNew(canvas, width, height, debug);
        var cre, cimg;

        julia.set_param(0.05212288207160459, 0.4632711456301897, 3.7237587940534236);

        // formula: z = z*z+c  with  c = cre + (cimg * i)
        cre = -0.7;
        cimg = 0.27015;

        julia.s = [80, 1, 1, 1];

        /*
         * Change c_real_part and c_imagine_part function for calling from web page.
         */
        julia.change_param = function (c_real, c_imagine) {
            cre = c_real;
            cimg = c_imagine;
        };

        julia.calc = (function () {

            var loop, switch_value, id, d, i, cv;

            loop = 255;
            switch_value = 4;
            cv = canvas.getContext("2d");
            id = cv.createImageData(width, height);
            d = id.data;

            for (i = width * height - 1; i >= 0; i -= 1) {
                //d[i * 4 + 0] = d[i * 4 + 2] = 0;
                d[i * 4 + 3] = 256;
            }

            // redefine namespace_fractal.Fractal.calc()
            var calc = function (scale, ox, oy, skip) {
                var ix, iy, j, l, x, y, tx, txy, ty, slice, cx, cy;

                slice = 1 / width / scale;

                cx = (-1 * width / 2) * slice + ox;
                cy = (1 * height / 2) * slice + oy;

                for (ix = 0; ix < width; ix += skip) {
                    for (iy = 0; iy < height; iy += skip) {

                        x = cx + ix * slice;
                        y = cy - iy * slice;

                        tx = x * x;
                        ty = y * y;
                        txy = 2 * x * y;

                        for (l = 0; l < loop; l += 1) {
                            tx = tx - ty + cre;
                            ty = txy + cimg;
                            txy = tx * ty * 2;
                            tx = tx * tx;
                            ty = ty * ty;
                            if (tx + ty > switch_value)
                                break;
                        }

                        for (j = skip - 1; j >= 0; j -= 1) {
                            for (k = skip - 1; k >= 0; k -= 1) {
                                var idx = ((ix + j) + (iy + k) * width) * 4,
                                        color = Math.max(255 - l, 0);
                                d[idx] = color * julia.s[1] + julia.s[0];
                                d[idx + 1] = color * julia.s[2] + julia.s[0];
                                d[idx + 2] = color * julia.s[3] + julia.s[0];
                            }
                        }
                    }
                }
                cv.putImageData(id, 0, 0);
            };
            return calc;
        })();

        julia.test = function (s) {
            julia.s = [];
            s.forEach(function (e) {
                julia.s.push(e)
            });
        };

        return julia;
    }
};

namespace_fractal.Mandelbrot = {
    createNew: function (canvas, width, height, debug) {

        var mandelbrot = namespace_fractal.Fractal.createNew(canvas, width, height, debug);

        // place the image in the middle
        mandelbrot.set_param(-0.73675, 0, 0.387075);

        mandelbrot.calc = function () {

            var loop, switch_value, id, d, i, cv;

            loop = 255;
            switch_value = 4;
            cv = canvas.getContext("2d");
            id = cv.createImageData(width, height);
            d = id.data;

            for (i = width * height - 1; i >= 0; i -= 1) {
                d[i * 4 + 0] = d[i * 4 + 2] = 0;
                d[i * 4 + 3] = 256;
            }

            // see namespace_fractal.Fractal.calc()
            var calc = function (scale, ox, oy, skip) {
                var ix, iy, j, k, l, x, y, tx, txy, ty, slice, cx, cy;

                slice = 1 / width / scale;
                cx = (-1 * width / 2) * slice + ox;
                cy = (1 * height / 2) * slice + oy;

                for (ix = 0; ix < width; ix += skip) {
                    for (iy = 0; iy < height; iy += skip) {

                        x = cx + ix * slice;
                        y = cy - iy * slice;
                        tx = ty = txy = 0;

                        for (l = 0; l < loop; l++) {
                            tx = tx - ty + x;
                            ty = txy + y;
                            txy = 2 * tx * ty;
                            tx = tx * tx;
                            ty = ty * ty;
                            if (tx + ty > switch_value)
                                break;
                        }

                        for (j = skip - 1; j >= 0; j -= 1) {
                            for (k = skip - 1; k >= 0; k -= 1) {
                                d[((ix + j) + (iy + k) * width) * 4 + 1] = l;
                            }
                        }
                    }
                }
                cv.putImageData(id, 0, 0);
            };
            return calc;
        }();

        return mandelbrot;
    }
};