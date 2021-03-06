import * as d3 from 'd3';
import * as dc from 'dc';
import crossfilter from 'crossfilter';
import {units, geoChoroplethChart, bubbleChart, renderAll, redrawAll, filterAll, pieChart, barChart, dataCount, dataTable, pluck, round} from 'dc';
import * as colorbrewer from "colorbrewer";
import reductio from "reductio";
//we can call export at the top of the class declaration
export default class ReductDash {

  constructor(el, props = {}) {
    this.myCharts = ReductDash.initCharts();
    //we initiate charts in constructor
  }

  render() {
    //de-structure myCharts object
    const {heightChart} = this.myCharts;
    d3.csv('data/jan_wv_dec_cc.csv', (error, data) => {
      //format the data
      const buoyData = this.formatData(data);
      const numberFormat = d3.format(".2f");

      const wavesx = crossfilter(buoyData);


      console.log('boo');
      // build the x dimensions
      const xDims = this.buildXDimensions(wavesx);
      //destructure the xDims object
      const {heightDim} = xDims;
      //build the Y groups
      const yGroups = this.buildYGroups(wavesx, xDims);
      //de-structure they yGroups object
      let {heightGroup} = yGroups;
      console.log(heightGroup.all());
      let reducer = reductio().count(true).min('wvdp').max(true).median(true);
      reducer(heightGroup);
      console.log(heightGroup.all());

     //call number format

      //dc.js Charts chained configuration
      //const reducer = reductio().count(true);
      //reducer(heightGroup);


        console.log("foo");

      /* dc.barChart("#height-chart") */
      heightChart
        .width(300)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(heightDim)
        .group(heightGroup)
        .valueAccessor((d) =>{return d.value.count})
        .elasticY(true)
      // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
      // (optional) set gap between bars manually in px, :default=2
        .gap(65)
      // (optional) set filter brush rounding
        .round(round.floor)
        .x(d3.scale.linear().domain([0, 7]))
        .renderHorizontalGridLines(true)
      // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
          var filter = filters[0], s = "";
          s += numberFormat(filter[0]) + "met -> " + numberFormat(filter[1]) + "met";
          return s;
        });

      // Customize axis
      heightChart.xAxis().tickFormat(
        function (v) { return v + "met"; });
      heightChart.yAxis().ticks(5);


      //draw the viz!
      renderAll();




      //draw the viz!
      renderAll();

    });
  }


  static initCharts() {
    const heightChart = barChart('#chart-height');

    const myCharts = {heightChart}


    return myCharts;
  }


  resetChart(chartName) {

    let {heightChart} = this.myCharts;

    switch (chartName) {
      case "height-chart":
        heightChart.filterAll();
        break;
      default:
        //Statements executed when none of the values match the value of the expression
        break;
    }

    redrawAll();
  }



  formatData(data){

    const buoyData = data;

    const dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");


    buoyData.forEach(d=>{
        d.dd = dateFormat.parse(d.origintime);
        d.day = d3.time.day(d.dd); // pre-calculate day for better performance
        d.month = d3.time.month(d.dd);
        d.year = d3.time.year(d.dd);
        d.wvdp   = d3.round(+d.wvdp,1);
        d.wvht = d3.round(+d.wvht,1);
        d.wndir = +d.wndir;
    });

    return buoyData;
  }


  buildXDimensions(xwaves){
    // create dimensions (x-axis values)

    const heightDim  = xwaves.dimension(pluck("wvht"));
    const xDims = { heightDim };
    return xDims;

  }


  buildYGroups(wavesx, xDims){

    const {heightDim} = xDims;

    // create groups (y-axis values)
    //map reduce functions
    const heightGroup = heightDim.group();

    const yGroups = {heightGroup};

    return yGroups;

  }

  //end of class
}
