/**
 *
 * Can show a tooltip over an element
 * Content of tooltip is the title attribute value of the element
 * Tested with Firefox, IE6, IE5.5, IE7, Konqueror
 *
 * To use it :
 * 1.include this script on your page
 * 2.insert this element somewhere in your page
 *       <div id="tooltip"></div>
 * 3. style it in your CSS stylesheet (set color, background etc..). You must set
 *     this two style too :
 *     div#tooltip { position:absolute; visibility:hidden; ... }
 * 4.the end. test it ! :-)
 *
 * @version 1.1
 * @copyright 2004-2007 Laurent Jouanneau.
 * @link http://ljouanneau.com/soft/javascript
 * @licence release under LGPL Licence
 */

// Last modified: Mon Feb  8 15:29:42 CET 2010
// by Philippe Ivaldi http://www.piprime.fr/

// the tooltip object
var tooltip = {
    // setup properties of tooltip object
    id:"tooltip",
    offsetx : 10,
    offsety : 10,
    _x : 0,
    _y : 0,
    _tooltipElement:null,
    _saveonmouseover:null
}

tooltip.enabled = true;

tooltip.toggle = function() {
    tooltip.enabled = !tooltip.enabled;
    tooltip.hide();
}

/**
 * Open ToolTip. The title attribute of the htmlelement is the text of the tooltip
 * Call this method on the mouseover event on your htmlelement
 * ex :  <div id="myHtmlElement" onmouseover="tooltip.show(this)"...></div>
 */
tooltip.show = function (text,followMouse) {
    if(tooltip.enabled) {
        if(document.getElementById){
            this._tooltipElement = document.getElementById(this.id);
        }else if ( document.all ) {
            this._tooltipElement = document.all[this.id].style;
        }

        this._saveonmouseover = document.onmousemove;
        this._saveonclick = document.onclick;
        if(followMouse==null || followMouse) {
            document.onmousemove = this.mouseMove;
        } else {
            document.onclick = function() {
                tooltip.hide();
            };
        }
        this._tooltipElement.innerHTML = text;

        this.moveTo(this._x + this.offsetx , this._y + this.offsety);

        if(this._tooltipElement.style){
            this._tooltipElement.style.visibility ="visible";
        }else{
            this._tooltipElement.visibility = "visible";
        }
    }
        return false;
}

/**
 * hide tooltip
 * call this method on the mouseout event of the html element
 * ex : <div id="myHtmlElement" ... onmouseout="tooltip.hide(this)"></div>
 */
tooltip.hide = function () {
    if(tooltip.enabled) {
        if(this._tooltipElement.style){
            this._tooltipElement.style.visibility ="hidden";
        }else{
            this._tooltipElement.visibility = "hidden";
        }
        document.onmousemove=this._saveonmouseover;
        document.onclick=this._saveonclick;
    }
}



// Moves the tooltip element
tooltip.mouseMove = function (e) {
    // we don't use "this" because this method is assign to an event of document
    // and so is dereferenced
    if(e == undefined)
        e = event;

    if( e.pageX != undefined){ // gecko, konqueror,
        tooltip._x = e.pageX;
        tooltip._y = e.pageY;
    }else if(event != undefined && event.x != undefined && event.clientX == undefined){ // ie4 ?
        tooltip._x = event.x;
        tooltip._y = event.y;
    }else if(e.clientX != undefined ){ // IE6,  IE7, IE5.5
        if(document.documentElement){
            tooltip._x = e.clientX + ( document.documentElement.scrollLeft || document.body.scrollLeft);
            tooltip._y = e.clientY + ( document.documentElement.scrollTop || document.body.scrollTop);
        }else{
            tooltip._x = e.clientX + document.body.scrollLeft;
            tooltip._y = e.clientY + document.body.scrollTop;
        }
        /*}else if(event != undefined && event.x != undefined){ // IE6,  IE7, IE5.5
          tooltip.x = event.x + ( document.documentElement.scrollLeft || document.body.scrollLeft);
          tooltip.y = event.y + ( document.documentElement.scrollTop || document.body.scrollTop);
        */
    }else{
        tooltip._x = 0;
        tooltip._y = 0;
    }
    tooltip.moveTo( tooltip._x +tooltip.offsetx , tooltip._y + tooltip.offsety);

}

// Move the tooltip element
tooltip.moveTo = function (xL,yL) {
    if(this._tooltipElement.style){
        this._tooltipElement.style.left = xL +"px";
        this._tooltipElement.style.top = yL +"px";
    }else{
        this._tooltipElement.left = xL;
        this._tooltipElement.top = yL;
    }
}