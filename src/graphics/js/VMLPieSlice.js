/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
VMLPieSlice = function()
{
	VMLPieSlice.superclass.constructor.apply(this, arguments);
};
VMLPieSlice.NAME = "vmlPieSlice";
Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
     */
    _type: "shape",

	/**
	 * Change event listener
	 *
	 * @private
	 * @method _updateHandler
	 */
	_draw: function(e)
	{
        var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        this.clear();
        this.drawWedge(x, y, startAngle, arc, radius);
		this.end();
	}
 }, Y.VMLDrawing.prototype));
VMLPieSlice.ATTRS = Y.mix({
    cx: {
        value: 0
    },

    cy: {
        value: 0
    },
    /**
     * Starting angle in relation to a circle in which to begin the pie slice drawing.
     *
     * @config startAngle
     * @type Number
     */
    startAngle: {
        value: 0
    },

    /**
     * Arc of the slice.
     *
     * @config arc
     * @type Number
     */
    arc: {
        value: 0
    },

    /**
     * Radius of the circle in which the pie slice is drawn
     *
     * @config radius
     * @type Number
     */
    radius: {
        value: 0
    }
}, Y.VMLShape.ATTRS);
Y.VMLPieSlice = VMLPieSlice;
