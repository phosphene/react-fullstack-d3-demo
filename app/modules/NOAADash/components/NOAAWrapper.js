import NOAADashDC from './NOAADashDC';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';

class NOAAWrapper extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);

    }

    render() {

        const pStyle = { marginRight: "15px"};
        {/*const cursorStyle = { display: 'none', cursor: 'pointer'};*/}
        const cursorStyle = { visibility: 'hidden', cursor: 'pointer'};
        const borderStyle = { borderStyle: 'dotted', marginTop: '30px' };

        const clickReset = (x) => {
          //console.log(x);
          this.dashboard.resetChart(x);
        }

        return (
           <div>
             <ThemeChooser style={{display: 'inline'}}/> <span style={{fontSize: '1.0em'}}> This is the ThemeChooser Component</span>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-xs-8">
                        <div id="chart-stacked-line-height">
                            <a className="reset" onClick={()=>clickReset("chart-stacked-line-height")} style={cursorStyle}> reset</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <div id="chart-stacked-line-period">
                            <a className="reset" onClick={()=>clickReset("chart-stacked-line-period")} style={cursorStyle}> reset</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div id="chart-pie-wind">
                            <a className="reset" onClick={()=>clickReset("chart-pie-wind")} style={cursorStyle}> reset</a>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div id="chart-bar-period">
                            <a className="reset" onClick={()=>clickReset("chart-bar-period")} style={cursorStyle}> reset</a>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div id="chart-bar-height">
                            <a className="reset" onClick={()=>clickReset("chart-bar-height")} style={cursorStyle}> reset</a>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        );

    }


    componentDidMount() {
        this.dashboard = new NOAADashDC();
        this.dashboard.render();

    }

    componentDidUpdate() {
        //   this.chart.update();
    }


    componentWillUnmount() {
        // this.dashboard.destroy();
    }

}

export default NOAAWrapper;
