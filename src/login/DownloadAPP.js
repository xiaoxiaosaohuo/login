import  React,{PureComponent} from 'react';
import IOSCode from './DownLoadIOS';
import AndroidCode from './DownloadAndroid';
import {fetchDataGet} from "./func";
import IOSonline from '../static/iosonline.png' ;
import Androidonline from '../static/androidonline.png' ;
import Androidtest from '../static/androidtest.png' ;
import IOStest from '../static/iostest.png' ;
class DownLoadAPP extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			test:false
		}
	}
	getTest = ()=>{
		const url = "/environment/getCurrentEnvironment";
		fetchDataGet(url,{})
		.then(json=>{
			   if(json.success==true){
				   if(json.data.environment=="test"){
					  this.setState({
						  test:true
					  })
				   }
				}
			})
	}
	componentWillMount(){
		this.getTest()
	}
	render(){
		const {title} = this.props;
		const {test} = this.state;
		const IOSsrc = test?IOStest:IOSonline;
		const Androidsrc = test?Androidtest:Androidonline;
		return(
			<div className="mobile">
				<AndroidCode
				imgSrc={Androidsrc}
				></AndroidCode>

				<IOSCode
				imgSrc={IOSsrc}
				></IOSCode>
			</div>
		)
	}
}

export default DownLoadAPP;
