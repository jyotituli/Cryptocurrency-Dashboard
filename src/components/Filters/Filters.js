import React from 'react';
import axios from "axios";
import moment from "moment";
import Graph from '../Chart/Graph.js';

import './Filters.css';
import Modal from "react-modal";

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Filters extends React.Component {

    state = {
        crytocurrencyOptions: ['Ethereum', 'Bitcoin', 'Doge Coin', 'Binance Coin', 'XRP', 'Polkadot', 'Cardano', 'BUSD', 'Polygon', 'Litecoin'],
        crypto: "Ethereum",
        frequencyOptions: ['Day', 'Hour', 'Minute'],
        freq: "Day",
        isLoading: false,
        isOpen:false,
        data:{},
        showChart:false,
        ratio:0,
        downloadData:{},
        icon:false,
    }
    
 toggleModal = () => {
    this.setState({isOpen:!this.state.isOpen});
  }

    getCrytoOptions = () => {
        return this.state.crytocurrencyOptions.map((curr, index) => {
            return (
                <option key={index} value={curr}>
                    {curr}
                </option>
            );
        });
    };

    getFreqOptions = () => {
        return this.state.frequencyOptions.map((curr, index) => {
            return (
                <option key={index} value={curr}>
                    {curr}
                </option>
            );
        });
    };


    search = async () => {
        this.toggleModal()
        //    let crytocurrencyOptions= ['Ethereum','Bitcoin','Doge Coin','Binance Coin','XRP','Polkadot','Cardano','BUSD','Polygon','Litecoin']
        this.setState({ isLoading: true })
        let currencies = { "Ethereum": 1, "Bitcoin": 2, 'Doge Coin': 3, 'Binance Coin': 4, 'XRP': 5, 'Polkadot': 6, 'Cardano': 7, "BUSD": 8, 'Polygon': 9, 'Litecoin': 10 }
        let freq = { "Day": 1, "Hour": 2, "Minute": 3 }
        const cryptocurrency = currencies[this.state.crypto]
        const frequency = freq[this.state.freq]
        let data = {
            "cryptocurrency": cryptocurrency,
            "frequency": frequency
        }
        const url = "http://127.0.0.1:5000/getprediction";
        try {
            const response = await axios.post(url, data);
            console.log(response)
            if (response.data) {
                this.setState({data: response.data.ans, ratio:response.data.ratio},()=>{
                    console.log(this.state.ratio)
                    this.setState({showChart:true})
                    // data.forEach((d, index) => {
                    //     // console.log(this.props.data.time[index])
                    //     // chartData.push([moment(this.props.data[index][0]).format("MM-DD-YYYY"), this.props.data[index][1], this.props.data[index][2]])
                    //         tableData.push([moment(data[index][0]).format('YYYY/MM/DD, h:mm:ss a'), data[index][1], data[index][2]])
                
                    // })
                })
                let download_data = []
                console.log(response.data.ans)
                response.data.ans.forEach((d,index)=>{
                    // console.log({"Time":moment(response.data.ans[index][0]).format('YYYY/MM/DD, h:mm:ss a'),"Close":response.data.ans[index][1],"Predicted":response.data.ans[index][2]})
                    download_data.push({"Time":moment(response.data.ans[index][0]).format('YYYY/MM/DD, h:mm:ss a'),"Close":response.data.ans[index][1],"Predicted":response.data.ans[index][2]})
                })
                console.log(download_data)
                this.setState({"downloadData":download_data}, ()=>{
                    this.setState({icon:true})
                })
            }
            this.setState({ isLoading: false })
        } catch (err) {
            console.log(err);
            this.setState({ isLoading: false });
        }
        if(this.state.isOpen){
            this.toggleModal()
        }
    }

    render() {
        return (
            <div className="dropdowns">
                <div class="container" id="filters">
                    <div class="row">
                        <div class="col-sm-1">
                        </div>
                        <div class="col-sm-4">
                            <form>
                                <div class="form-group">
                                    <h3><label for="exampleFormControlSelect1">Crytocurrency</label></h3>
                                    <select class="form-control custom-select-lg mb-3 custom-select dropdownfilter"
                                        id="exampleFormControlSelect1"
                                        value={this.state.crypto}
                                        onChange={(e) => {
                                            this.setState({ crypto: e.target.value })
                                        }}
                                    >
                                        {this.getCrytoOptions()}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-2">
                        </div>
                        <div class="col-sm-3">
                            <form>
                                <div class="form-group">
                                    <h3><label for="exampleFormControlSelect1">Frequency</label></h3>
                                    <select class="form-control custom-select-lg mb-3 custom-select dropdownfilter" id="exampleFormControlSelect1"
                                        value={this.state.freq}
                                        onChange={(e) => {
                                            this.setState({ freq: e.target.value })
                                        }}>
                                        {this.getFreqOptions()}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="search"><button type="button" class="btn btn-primary btn-lg" onClick={this.search} disabled={this.state.isLoading}>Predict</button>
                        {" "}
                        {(this.state.icon)?(                
                            <ExcelFile
                            element={
                                <span className="download"><i class="fa fa-download" style = {{fontSize: "35px",padding:"10px 10px 10px 10px", cursor:"pointer"}} aria-hidden="true"></i></span>
                            }
                            filename={`Cryptocurrency_Data_${moment().format(
                              "YYYY-MM-DD H-mm-ss"
                            )}`}
                          >
                            {/* Columns of ExcelSheet  */}
                            <ExcelSheet data={this.state.downloadData} name="Data">
                              <ExcelColumn label="Time" value="Time" />
                              <ExcelColumn label="Close" value="Close" />
                              <ExcelColumn label="Predicted" value="Predicted" />
                            </ExcelSheet>
                          </ExcelFile>
                         ):(<div></div>)}</div>

                        <Modal
                        isOpen={this.state.isOpen}
                        onRequestClose={this.toggleModal}
                        contentLabel="My dialog"
                      >
                        <div>The model is predicting. Kindly wait!</div>
                      </Modal>
                        
                    </div>

                    <br />
                </div>
               <br/>
                {(this.state.showChart && this.state.ratio)?(   
                <Graph data={this.state.data} ratio={this.state.ratio}/>):(<div></div>)
                })
                </div>

        )
    }
}

export default Filters;