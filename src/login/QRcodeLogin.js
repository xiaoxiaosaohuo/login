import  React,{PureComponent} from 'react';
import QRCode from 'qrcode.react';
import {fetchData,fetchDataGet,fetchDataWithToken,getQueryString} from "./func";
class QRcodeLogin extends PureComponent{
	constructor(props){
		super(props)
		this.state={
			codeValue : "",
			test:false
		}

		this.test = false;
		this.timer=null;
		this.redirectURL =getQueryString();

	}
	getTest = (callback)=>{
		const testurl =  "/environment/getCurrentEnvironment";
		fetchDataGet(testurl,{})
		.then(json=>{
			   if(json.success==true){
				   if(json.data.environment=="test"){
					 this.test = true
				   }
				   //获取环境成功之后
				   callback&&callback()
				}
			})
	}
	getCode = ()=>{
		const url = "/getQRCode";
		fetchData(url,{})
		.then(json=>{
			if(json.success==true){
				this.setState({
					codeValue:json.data.content
				})
				const content = JSON.parse(json.data.content).qrCode;
				const timeurl =`/getToken?content=${content}&redirectURL=${this.redirectURL}`

				this.timer=setInterval(()=>{
					fetchDataWithToken(timeurl)
					.then(json=>{
						if(json.code=="000"||json.success==true){
							debugger;
							 window.location.replace(json.data.redirectUrl);
							clearInterval(this.timer);
						}
					})
				},2000)
			}
		})
	}
	componentWillMount(){
		this.getCode()


	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	render(){
		const {codeValue} = this.state;
		return(
			<div id="login-section" >
					<div className="QRcodwrapper">
					<div className="QRcodeflex">
							<QRCode
							value={codeValue}
							size={180}
							 />
							 <div className='tips'>
								 <p>请打开跳房子客户端"扫一扫"</p>
							 </div>
					</div>
				</div>
			</div>
		)
	}
}

export default QRcodeLogin;
